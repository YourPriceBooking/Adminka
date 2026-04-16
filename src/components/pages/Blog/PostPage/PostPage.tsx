import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import backArrow from 'assets/icons/backarrow.svg';
import { useAppSelector } from 'App';
import { getPost } from 'features/blog/blogSelector';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import type QuillEditor from 'quill';
import type { RangeStatic } from 'quill';
import Quill from "quill";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { blogBaseUrl } from 'features/api';
import { BlogContainer, Header } from '../BlogPage/Blog.styled';
import { PostContent } from './PostPage.styled';
import ModalAddLater from './ModalAddLater/ModalAddLater';
import ImageUploadModal from './ImageUploadModal/ImageUploadModal';

const Image = Quill.import("formats/image");
Image.sanitize = (url: string) => url;

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
  author: string;
  description: string;
  heading: string;
  country: string;
  text: string;
  // Main article image (separate from editor images)
  mainImage: File | null;
  mainImageAlt: string;
  mainImageCaption: string;
  // Editor images only
  editorImages: File[];
  editorAlts: string[];
  editorCaptions: string[];
};

type Country = {
  international: string;
  country: string;
  langCode: string;
};

type CountryResponse = {
  code: number;
  status: string;
  country: Country[];
};

const PostPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isOpenAddLaterModal, setIsOpenAddLaterModal] = useState(false);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [imageModalMode, setImageModalMode] = useState<'main' | 'editor'>('main');
  const [langCode] = useState<string>('EN');
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const ref = useRef<ReactQuill & { editor: QuillEditor }>(null);
  const editorCursorRef = useRef<RangeStatic | null>(null);

  // **
  // Blob URL tracking maps for editor image synchronization
  // WeakMap: File → blob URL (automatically garbage collected when File is removed)
  // Map: blob URL → File (manual cleanup required)
  // **
  const fileToBlobUrlMap = useRef<WeakMap<File, string>>(new WeakMap());
  const blobUrlToFileMap = useRef<Map<string, File>>(new Map());

  const formik = useFormik<FormikType>({
    initialValues: {
      title: '',
      author: '',
      description: '',
      heading: '',
      country: '',
      text: '',
      mainImage: null,
      mainImageAlt: '',
      mainImageCaption: '',
      editorImages: [],
      editorAlts: [],
      editorCaptions: [],
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        let data: any;

        if (id === 'new') {
          data = new FormData();
          data.append('title', values.title);
          data.append('description', values.description);
          data.append('heading', values.heading);
          data.append('markup', values.text);
          data.append('author', values.author);
          data.append(
            'articleUrl',
            `https://www.thewandered.com/${values.title.toLowerCase().replace(/ /g, '-')}`
          );

          // **
          // Merge main image with editor images for submission
          // Main image goes first, followed by editor images
          // **
          const allImages = values.mainImage
            ? [values.mainImage, ...values.editorImages]
            : values.editorImages;

          const allAlts = values.mainImage
            ? [values.mainImageAlt, ...values.editorAlts]
            : values.editorAlts;

          const allCaptions = values.mainImage
            ? [values.mainImageCaption, ...values.editorCaptions]
            : values.editorCaptions;

          allImages.forEach((file) => {
            data.append('image', file);
          });

          allAlts.forEach(a => data.append('alts', a));
          allCaptions.forEach(c => data.append('captions', c));

          if (values.country !== 'home') {
            data.append('country', values.country);
          } else {
            data.append('country', '');
          }

          await axios.post(`${blogBaseUrl}/post/add-post`, data);
          toast.success('Post Created');
        } else {
          data = {
            title: values.title,
            author: values.author,
            description: values.description,
            heading: values.heading,
            markup: values.text,
          };
          await axios.patch(`${blogBaseUrl}/post/update-post/${id}`, data);
          toast.success('Post Updated');
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error('Response:', err.response?.data);
          toast.error(
            `Error ${err.response?.status} (${err.response?.statusText}): ${err.response?.data.message} `
          );
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

  const { title, author, description, heading, country, text, mainImage, editorImages } = formik.values;

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
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${blogBaseUrl}/post/get-by-url/?articleUrl=${post?.articleUrl}`
        );

        formik.setValues({
          title: data.result.title,
          author: data.result.author,
          text: data.result.markup,
          description: data.result.description,
          heading: data.result.heading,
          country: data.result.country || '',
          mainImage: null,
          mainImageAlt: '',
          mainImageCaption: '',
          editorImages: [],
          editorAlts: [],
          editorCaptions: [],
        });
      } catch (error: unknown) {
        navigate('/blog');
        if (axios.isAxiosError(error)) {
          toast.error(String(error.response?.data?.message || 'Failed to fetch blog'));
        } else {
          toast.error('Failed to fetch blog');
        }
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

    if (id !== 'new') {
      fetchBlog();
    }
    fetchAuthors();
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

  // **
  // Cleanup blob URLs on component unmount to prevent memory leaks
  // **
  useEffect(
    () => () => {
      blobUrlToFileMap.current.forEach((_, blobUrl) => {
        URL.revokeObjectURL(blobUrl);
      });
      blobUrlToFileMap.current.clear();
    },
    []
  );

  const handleClickToBackArrow = () => navigate('/blog');

  const openMainImageModal = () => {
    setImageModalMode('main');
    setIsOpenImageModal(true);
  };

  // **
  // Opens image modal for editor insertion and saves current cursor position
  // Cursor position is needed to insert image at the correct location
  // **
  const openEditorImageModal = useCallback(() => {
    const range = ref.current?.editor.getSelection();
    editorCursorRef.current = range ?? null;

    setImageModalMode('editor');
    setIsOpenImageModal(true);
  }, []);

  // **
  // Handles image addition for both main article image and editor images
  // Main mode: Sets/replaces the single main article image
  // Editor mode: Appends to editor images, creates blob URL, stores mapping, and inserts into Quill
  // **
  const handleImageAdd = (file: File, alt: string, caption: string) => {
    if (imageModalMode === 'main') {
      // Clean up old main image blob URL if exists
      const oldMainImage = formik.values.mainImage;
      if (oldMainImage) {
        const oldBlobUrl = fileToBlobUrlMap.current.get(oldMainImage);
        if (oldBlobUrl) {
          URL.revokeObjectURL(oldBlobUrl);
          blobUrlToFileMap.current.delete(oldBlobUrl);
        }
      }

      formik.setFieldValue('mainImage', file);
      formik.setFieldValue('mainImageAlt', alt);
      formik.setFieldValue('mainImageCaption', caption);

      toast.success(oldMainImage ? 'Article image replaced' : 'Article image added');
    } else {
      // Editor mode: append to editor images
      const newImages = [...formik.values.editorImages, file];
      const newAlts = [...formik.values.editorAlts, alt];
      const newCaptions = [...formik.values.editorCaptions, caption];

      formik.setFieldValue('editorImages', newImages);
      formik.setFieldValue('editorAlts', newAlts);
      formik.setFieldValue('editorCaptions', newCaptions);

      const imgUrl = URL.createObjectURL(file);

      // Store bidirectional mapping between File and blob URL
      fileToBlobUrlMap.current.set(file, imgUrl);
      blobUrlToFileMap.current.set(imgUrl, file);

      setTimeout(() => {
        const quill = ref.current?.editor;
        const cursor = editorCursorRef.current;

        if (quill) {
          if (cursor && typeof cursor.index === "number") {
            quill.insertEmbed(cursor.index, "image", imgUrl, "user");
            quill.setSelection(cursor.index + 1, 0);
          } else {
            const length = quill.getLength();
            quill.insertEmbed(length, "image", imgUrl, "user");
          }
        }
      }, 100);

      toast.success('Image inserted into editor');
    }
  };

  // **
  // Extracts all image blob URLs from Quill editor in document order
  // Returns array of blob URL strings
  // **
  const getImagesFromEditor = (editor: any): string[] => {
    const delta = editor.getContents();
    return delta.ops
      .filter((op: any) => op.insert?.image)
      .map((op: any) => op.insert.image);
  };

  // **
  // Handles Quill editor content changes and synchronizes editor image state
  // When images are deleted from editor:
  // 1. Detects deletion by comparing image counts
  // 2. Maps remaining blob URLs back to File objects
  // 3. Syncs editorImages, editorAlts, and editorCaptions arrays
  // 4. Cleans up revoked blob URLs
  // Note: Main article image is separate and not affected by editor changes
  // **
  const handleEditorChange = (value: string, delta: any, source: any, editor: any) => {
    if (source !== 'user') {
      formik.setFieldValue('text', value);
      return;
    }

    const currentEditorBlobUrls = getImagesFromEditor(editor);

    // Only process if editor images were removed
    if (currentEditorBlobUrls.length < editorImages.length) {
      // Map blob URLs back to File objects in editor order
      const remainingImages = currentEditorBlobUrls
        .map(blobUrl => blobUrlToFileMap.current.get(blobUrl))
        .filter((file): file is File => file !== undefined);

      // Find which files were removed
      const removedIndices: number[] = [];
      editorImages.forEach((file, index) => {
        const fileBlobUrl = fileToBlobUrlMap.current.get(file);
        if (!currentEditorBlobUrls.includes(fileBlobUrl || '')) {
          removedIndices.push(index);
        }
      });

      // Clean up blob URLs for removed files
      removedIndices.forEach(index => {
        const file = editorImages[index];
        const blobUrl = fileToBlobUrlMap.current.get(file);
        if (blobUrl) {
          URL.revokeObjectURL(blobUrl);
          blobUrlToFileMap.current.delete(blobUrl);
        }
      });

      // Sync all three editor arrays (images, alts, captions) to maintain consistency
      const remainingAlts = remainingImages.map(file => {
        const originalIndex = editorImages.indexOf(file);
        return formik.values.editorAlts[originalIndex];
      });

      const remainingCaptions = remainingImages.map(file => {
        const originalIndex = editorImages.indexOf(file);
        return formik.values.editorCaptions[originalIndex];
      });

      formik.setFieldValue('editorImages', remainingImages);
      formik.setFieldValue('editorAlts', remainingAlts);
      formik.setFieldValue('editorCaptions', remainingCaptions);
    }

    formik.setFieldValue('text', value);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline'],
          ['blockquote'],
          ['link', 'video', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],
        handlers: {
          image: openEditorImageModal,
        },
      },
    }),
    [openEditorImageModal]
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
          <button type="submit" className="submit">
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

          <div className="articleImage">
            {id !== 'new' ? (
              <img id="article-img" src={String(formik.values.mainImage)} alt="article" />
            ) : (
              <div>
                <button
                  type="button"
                  onClick={openMainImageModal}
                  className="custom-file-upload"
                  style={{ cursor: 'pointer' }}
                >
                  {mainImage ? 'Change Article Image' : 'Select Image for Article'}
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
            <ReactQuill
              modules={modules}
              ref={ref}
              id="text"
              className="textarea"
              placeholder="Enter your text here..."
              onChange={handleEditorChange}
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