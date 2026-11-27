import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import backArrow from 'assets/icons/backarrow.svg';
import { useAppSelector } from 'App';
import { selectEmailSlice } from 'features/access/tokenSlice';
import { getPost } from 'features/blog/blogSelector';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import type QuillEditor from 'quill';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { blogBaseUrl } from 'features/api';
import { BlogContainer, Header } from '../BlogPage/Blog.styled';
import { PostContent } from './PostPage.styled';
import ModalAddLater from './ModalAddLater/ModalAddLater';
import {
  existingCover, hydrateArticleMedia, prepareArticleMedia, supportsExistingArticleMedia, type ExistingMedia,
} from './existingArticleMedia';
import ImageUploadModal from './ImageUploadModal/ImageUploadModal';
import { appendPostImages, getInlineImageInsertion, type PostImage } from './postImages';

import { ARTICLE_SLUG_MAX_LENGTH, appendArticleSlug, articleSlugError, customArticleUrl, supportsCustomArticleSlug } from './articleSlug';

const Image = Quill.import('formats/image');
const sanitizeImage = Image.sanitize.bind(Image);
// Keep Quill's normal validation except for object URLs used by local previews.
Image.sanitize = (url: string) => url.startsWith('blob:') ? url : sanitizeImage(url);
type EditorDelta = ReturnType<QuillEditor['getContents']>;
const Delta = Quill.import('delta') as new (ops: EditorDelta['ops']) => EditorDelta;

type Author = {
  _id: number;
  email: string;
  name: string;
  image: string;
  description: string;
  skills: string;
  links: string[];
};

type AuthorResponse = {
  result: Author[];
};

type FormikType = {
  title: string;
  slug: string;
  author: string;
  description: string;
  heading: string;
  country: string;
  text: string;
  // Main article image (separate from editor images)
  mainImage: File | null;
  mainImageAlt: string;
  mainImageCaption: string;
};

type Country = {
  international: string;
  country: string;
  langCode: string;
};

type EditablePost = {
  title: string;
  author: string;
  description: string;
  heading: string;
  country?: string;
  markup: string;
  imageUrl?: unknown;
  updatedAt?: unknown;
};

type CountryResponse = {
  code: number;
  status: string;
  country: Country[];
};

const PostPage: React.FC = () => {
  const [canUseCustomSlug, setCanUseCustomSlug] = useState(false);
  const [savedMedia, setSavedMedia] = useState<ExistingMedia | null>(null);
  const [coverPreview, setCoverPreview] = useState<ReturnType<typeof existingCover>>(null);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isOpenAddLaterModal, setIsOpenAddLaterModal] = useState(false);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [imageModalMode, setImageModalMode] = useState<'main' | 'editor'>('main');
  const [langCode] = useState<string>('EN');
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const adminToken = useAppSelector(selectEmailSlice);
  const canEditMedia = Boolean(adminToken && savedMedia);
  const canInsertImage = id === 'new' || canEditMedia;

  const ref = useRef<ReactQuill & { editor: QuillEditor }>(null);
  const lastEditorCaret = useRef<number | null>(null);
  const inlineByUrl = useRef(new Map<string, PostImage>());

  const formik = useFormik<FormikType>({
    initialValues: {
      title: '',
      slug: '',
      author: '',
      description: '',
      heading: '',
      country: '',
      text: '',
      mainImage: null,
      mainImageAlt: '',
      mainImageCaption: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (id === 'new') {
          const data = new FormData();
          const supported = values.slug
            ? canUseCustomSlug && await supportsCustomArticleSlug(blogBaseUrl)
            : false;
          const expectedUrl = appendArticleSlug(data, values.slug, values.country, supported);
          data.append('title', values.title);
          data.append('description', values.description);
          data.append('heading', values.heading);
          const markup = ref.current?.editor.root.innerHTML ?? values.text;
          data.append('markup', markup);
          data.append('author', values.author);
          data.append(
            'articleUrl',
            `https://www.thewandered.com/${values.title.toLowerCase().replace(/ /g, '-')}`
          );

          const cover = values.mainImage
            ? { file: values.mainImage, alt: values.mainImageAlt, caption: values.mainImageCaption }
            : null;
          appendPostImages(data, markup, cover, inlineByUrl.current);

          if (values.country !== 'home') {
            data.append('country', values.country);
          } else {
            data.append('country', '');
          }

          const response = await axios.post(`${blogBaseUrl}/post/add-post`, data);
          if (expectedUrl && response.data?.data?.articleUrl !== expectedUrl) {
            throw new Error('The server did not confirm the requested link. Check the article list before retrying; your draft was kept.');
          }
          toast.success('Post Created');
        } else {
          const data = {
            title: values.title,
            author: values.author,
            description: values.description,
            heading: values.heading,
            markup: values.text,
          };
          if (isLoadingPost) return;
          const prepared = savedMedia
            ? prepareArticleMedia(
              values.text,
              savedMedia,
              { alt: values.mainImageAlt, caption: values.mainImageCaption },
              inlineByUrl.current,
            )
            : { markup: values.text };
          if (prepared.data) {
            if (!adminToken) throw new Error('Sign in again before saving article photos. Your draft is still here.');
            prepared.data.append('title', data.title);
            prepared.data.append('author', data.author);
            prepared.data.append('description', data.description);
            await axios.patch(`${blogBaseUrl}/post/update-post-media/${id}`, prepared.data, {
              headers: { Authorization: `Bearer ${adminToken}` },
            });
          } else {
            await axios.patch(`${blogBaseUrl}/post/update-post/${id}`, { ...data, markup: prepared.markup });
          }
          toast.success('Post Updated');
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && id === 'new' && values.slug) {
          const code = err.response?.data?.code;
          const status = err.response?.status;
          if (status === 409 || code === 'ARTICLE_SLUG_TAKEN') {
            toast.error('This article link is already in use. Try a different link.');
          } else if (status === 400 || status === 422) {
            toast.error('The article was not published. Check the link, category and required fields.');
          } else {
            toast.error('The server did not confirm publication. Check the article list before retrying.');
          }
        } else if (axios.isAxiosError(err)) {
          console.error('Response:', err.response?.data);
          if (id !== 'new' && savedMedia && err.response?.status === 409) {
            toast.error('This article changed on the server. Your draft is still here. Copy your changes before reloading.');
          } else {
            const message: unknown = err.response?.data?.message;
            toast.error(typeof message === 'string' ? message : 'The server could not confirm the save. Your draft is still here.');
          }
        } else if (err instanceof Error) {
          toast.error(`Error: ${err.message}`);
        } else {
          toast.error('An unknown error occurred');
        }
        return;
      }

      resetForm();
      navigate('/blog');
    },
  });

  const { title, slug, author, description, heading, country, text, mainImage } = formik.values;

  const slugError = articleSlugError(slug);
  const slugPreview = customArticleUrl(country, slug);

  useEffect(() => {
    setCanUseCustomSlug(false);
    if (id !== 'new') return undefined;
    const controller = new AbortController();
    supportsCustomArticleSlug(blogBaseUrl, controller.signal).then((supported) => {
      if (!controller.signal.aborted) setCanUseCustomSlug(supported);
    });
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const {
          data: { country: countryData },
        } = await axios.get<CountryResponse>(
          `${blogBaseUrl}/country/get-country`,
          {
            params: {
              langCode,
            },
          }
        );

        const counties = countryData.map(currentCountry => currentCountry.country);
        setAllCategories(counties);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
        setAllCategories([]);
      }
    };
    getCountries();
  }, [langCode]);

  if (!id) return <Navigate to="/blog" replace />;
  const post = useAppSelector(state => getPost(state, id));
  if (!post) return <Navigate to="/blog" replace />;

  useEffect(() => {
    const controller = new AbortController();
    const fetchBlog = async () => {
      setIsLoadingPost(true);
      try {
        const [{ data }, mediaAvailable] = await Promise.all([
          axios.get<{ result: EditablePost }>(`${blogBaseUrl}/post/get-by-url/?articleUrl=${post?.articleUrl}`, { signal: controller.signal }),
          adminToken ? supportsExistingArticleMedia(blogBaseUrl, controller.signal) : false,
        ]);
        if (controller.signal.aborted) return;
        const cover = existingCover(data.result.imageUrl);
        const media = mediaAvailable
          ? hydrateArticleMedia(data.result.markup, data.result.imageUrl, data.result.updatedAt)
          : null;
        setSavedMedia(media);
        setCoverPreview(cover);
        formik.setValues({
          title: data.result.title,
          slug: '',
          author: data.result.author,
          text: media?.markup ?? data.result.markup,
          description: data.result.description,
          heading: data.result.heading,
          country: data.result.country || '',
          mainImage: null,
          mainImageAlt: cover?.alt ?? '',
          mainImageCaption: cover?.caption ?? '',
        });
      } catch (error: unknown) {
        if (controller.signal.aborted) return;
        navigate('/blog');
        if (axios.isAxiosError(error)) {
          toast.error(String(error.response?.data?.message || 'Failed to fetch blog'));
        } else {
          toast.error('Failed to fetch blog');
        }
      } finally {
        if (!controller.signal.aborted) setIsLoadingPost(false);
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await axios.get<AuthorResponse>(
          `${blogBaseUrl}/author/get-all-authors`
        );

        setAuthors(response.data.result);
      } catch (error) {
        console.error('Failed to fetch authors:', error);
        toast.error('Failed to fetch authors');
      }
    };

    setSavedMedia(null);
    setCoverPreview(null);
    if (id !== 'new') {
      fetchBlog();
    } else {
      setIsLoadingPost(false);
    }
    fetchAuthors();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (id !== 'new' && authors.length > 0 && formik.values.author) {
      const defaultAuthor = authors.find(a => a.name === formik.values.author);
      if (defaultAuthor) {
        formik.setFieldValue('author', defaultAuthor.name);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, authors]);

  useEffect(() => {
    const assets = inlineByUrl.current;
    return () => {
      assets.forEach((_, url) => URL.revokeObjectURL(url));
      assets.clear();
      lastEditorCaret.current = null;
    };
  }, [id]);

  const handleClickToBackArrow = () => navigate('/blog');

  const openMainImageModal = () => {
    setImageModalMode('main');
    setIsOpenImageModal(true);
  };

  const openEditorImageModal = useCallback(() => {
    if (!canInsertImage) return;
    const editor = ref.current?.editor;
    if (!editor) return;
    const selection = editor.getSelection();
    if (selection) lastEditorCaret.current = selection.index;
    if (lastEditorCaret.current === null && editor.getLength() > 1) {
      toast.info('Place the cursor where you want to insert the image.');
      return;
    }
    setImageModalMode('editor');
    setIsOpenImageModal(true);
  }, [canInsertImage]);

  const handleImageAdd = (file: File, alt: string, caption: string) => {
    if (imageModalMode === 'main') {
      formik.setValues({
        ...formik.values, mainImage: file, mainImageAlt: alt, mainImageCaption: caption,
      });
      toast.success(mainImage ? 'Cover image replaced' : 'Cover image added');
      return;
    }

    const editor = ref.current?.editor;
    if (!editor || !canInsertImage) {
      toast.error('The article editor is not ready.');
      return;
    }

    const lastEditableIndex = Math.max(0, editor.getLength() - 1);
    const caret = Math.min(lastEditorCaret.current ?? lastEditableIndex, lastEditableIndex);
    const format = editor.getFormat(caret, 0);
    const formattedBlock = ['header', 'list', 'blockquote', 'indent', 'align', 'direction', 'code-block']
      .some(name => Boolean(format[name]));
    // A block format belongs to its terminating newline. Do not split a
    // heading or list item with an unformatted newline in its middle.
    let index = caret;
    if (formattedBlock) {
      const [, offset] = editor.getLine(caret);
      index -= offset;
      // Keep a list together so an inserted photo does not restart numbering.
      while (format.list && index > 0 && editor.getFormat(index - 1, 0).list) {
        const [, previousOffset] = editor.getLine(index - 1);
        index -= previousOffset + 1;
      }
    }
    const previousCharacter = index > 0 ? editor.getText(index - 1, 1) : '';
    const url = URL.createObjectURL(file);
    inlineByUrl.current.set(url, { file, alt, caption });
    const insertion = getInlineImageInsertion(url, index, previousCharacter);

    // Keep the insertion and both paragraph boundaries in a single undo step.
    const history = editor.getModule('history');
    history?.cutoff();
    editor.updateContents(new Delta(insertion.ops), 'user');
    history?.cutoff();
    editor.setSelection(insertion.caret, 0, 'silent');
    lastEditorCaret.current = insertion.caret;
    toast.success(formattedBlock ? 'Image inserted before the formatted block' : 'Image inserted into article');
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline'],
          ['blockquote'],
          id === 'new' ? ['link', 'video', 'image'] : ['link', 'video'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],
        handlers: id === 'new' ? { image: openEditorImageModal } : {},
      },
    }),
    [id, openEditorImageModal]
  );

  return (
    <BlogContainer>
      <Header>
        <div>
          <img src={backArrow} alt="arrow" onClick={handleClickToBackArrow} aria-hidden="true" />
        </div>
      </Header>
      <PostContent>
        <form onSubmit={formik.handleSubmit}>
          <button type="submit" className="submit" disabled={formik.isSubmitting || isLoadingPost}>
            {id === 'new' ? 'Submit' : 'Update Post'}
          </button>
          {id === 'new' && (
            <div className="add-later-wrapper">
              <button
                onClick={() => setIsOpenAddLaterModal(prev => !prev)}
                type="button"
                className="submit"
              >
                Add later
              </button>

              {isOpenAddLaterModal && <ModalAddLater />}
            </div>
          )}

          <div className="title">
            <div className="input-group prefix">
              <span className="input-group-addon">Title</span>
              <input id="title" type="text" onChange={formik.handleChange} value={title} />
            </div>
            <div className="input-group prefix">
              <span className="input-group-addon">Author</span>

              <select id="author" onChange={formik.handleChange} value={author}>
                {id === 'new' && <option value="">Select an author</option>}
                {authors.map((item: Author) => (
                  <option value={item.name} key={item._id} className="optionInput">
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group prefix">
              <span className="input-group-addon">Description</span>
              <input
                id="description"
                className="smallInput"
                type="text"
                placeholder="Description of the article, which is not displayed in the article, but is used as a meta tag"
                onChange={formik.handleChange}
                value={description}
              />
            </div>

            <div className="input-group prefix">
              <span className="input-group-addon">H1 heading</span>
              <input
                id="heading"
                className="smallInput"
                type="text"
                disabled={id !== 'new'}
                onChange={formik.handleChange}
                value={heading}
              />
            </div>

            <div className="input-group prefix">
              <span className="input-group-addon">Category</span>

              <select disabled={id !== 'new'} id="country" onChange={formik.handleChange} value={country}>
                {id === 'new' ? (
                  <option value="not selected">Select a post category</option>
                ) : (
                  <option>{country}</option>
                )}
                {allCategories.map((item: string) => (
                  <option value={item} key={item} className="optionInput">
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {id === 'new' && canUseCustomSlug && (
            <div className="title">
              <div className="input-group prefix">
                <label htmlFor="slug" className="input-group-addon">Custom article link</label>
                <input
                  id="slug"
                  type="text"
                  placeholder="kyiv-theatres-guide"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  maxLength={ARTICLE_SLUG_MAX_LENGTH}
                  aria-invalid={Boolean(slugError)}
                  aria-describedby="article-slug-help"
                  onChange={formik.handleChange}
                  value={slug}
                />
              </div>
              <p id="article-slug-help" aria-live="polite" style={{ overflowWrap: 'anywhere' }}>
                {slugError || slugPreview || (slug
                  ? 'Choose a category to preview your link.'
                  : 'Optional. Leave blank to generate the link from the article heading as usual.')}
              </p>
            </div>
          )}

          <div className="articleImage">
            {id !== 'new' ? (
              <div>
                {coverPreview && <img id="article-img" src={coverPreview.url} alt={formik.values.mainImageAlt} />}
                {canEditMedia && (
                  <div className="cover-image-details">
                    <label htmlFor="mainImageAlt">Cover image alt text</label>
                    <input id="mainImageAlt" name="mainImageAlt" value={formik.values.mainImageAlt} onChange={formik.handleChange} maxLength={300} />
                    <label htmlFor="mainImageCaption">Cover image caption</label>
                    <input id="mainImageCaption" name="mainImageCaption" value={formik.values.mainImageCaption} onChange={formik.handleChange} maxLength={1000} />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={openMainImageModal}
                  className="custom-file-upload"
                  style={{ cursor: 'pointer' }}
                >
                  {mainImage ? 'Change Cover Image' : 'Select Cover Image'}
                </button>

                {mainImage ? (
                  <div className="preview-item">
                    <p className="file-name">📸 {mainImage.name}</p>
                  </div>
                ) : (
                  <p className="warning">The photo size must be up to 500 KB</p>
                )}
              </div>
            )}
          </div>

          <div className="text">
            {canInsertImage && (
              <div className="inline-image-controls">
                <button type="button" className="inline-image-action" onClick={openEditorImageModal}>
                  Insert Image into Article
                </button>
                <small>Place the cursor in the text. Images go before any heading, list, or quote at the cursor.{' '}
                  {id === 'new' ? 'Inline images require a cover.' : 'New photos are saved when you update the article.'}
                </small>
              </div>
            )}
            <ReactQuill
              modules={modules}
              ref={ref}
              id="text"
              className="textarea"
              placeholder="Enter your text here..."
              onChange={(value) => formik.setFieldValue('text', value)}
              onChangeSelection={(range) => {
                if (range) lastEditorCaret.current = range.index;
              }}
              value={text}
            />
          </div>
        </form>
      </PostContent>

      <ImageUploadModal
        isOpen={isOpenImageModal}
        onClose={() => setIsOpenImageModal(false)}
        onImageAdd={handleImageAdd}
        mode={imageModalMode}
      />
    </BlogContainer>
  );
};

export default PostPage;