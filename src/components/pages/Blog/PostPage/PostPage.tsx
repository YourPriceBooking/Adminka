import { useRef, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import backArrow from 'assets/icons/backarrow.svg';
import { useAppSelector } from 'App';
import { getPost } from 'features/blog/blogSelector';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import type QuillEditor from 'quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { blogBaseUrl } from 'features/api';
import { BlogContainer, Header } from '../BlogPage/Blog.styled';
import { PostContent } from './PostPage.styled';

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
  text: string;
  image: File[] | string[];
};
const PostPage: React.FC = () => {
  // const [disableSubmit, SetDisabledSubmit] = useState(true);
  const [authors, setAuthors] = useState<Author[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const ref = useRef<ReactQuill & { editor: QuillEditor }>(null);

  const formik = useFormik<FormikType>({
    initialValues: {
      title: '',
      author: '',
      description: '',
      heading: '',
      text: '',
      image: [],
    },
    onSubmit: async ({ title, author, description, heading, text, image }) => {
      try {
        let data: any = {};

        if (id === 'new') {
          data = new FormData();
          data.append('title', title);
          data.append('description', description);
          data.append('heading', heading);
          data.append('markup', text);
          data.append('author', author);
          data.append(
            'articleUrl',
            `https://www.thewandered.com/${title.toLowerCase().replace(' ', '-')}`
          );
          image.forEach(file => {
            data.append('image', file);
          });

          await axios.post(`${blogBaseUrl}/post/add-post`, data);
          toast.success('Post Created');
        } else {
          data = {
            title,
            author,
            description,
            heading,
            markup: text,
          };

          console.log('AUTHOR: ', data);

          await axios.patch(`${blogBaseUrl}/post/update-post/${id}`, data);
          toast.success('Post Updated');
        }
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          toast.error(
            `Error ${err.response?.status} (${err.response?.statusText}): ${err.response?.data.message} `
          );
        } else {
          toast.error(`Error: ${err.response?.data.message}`);
        }
      }
    },
  });

  const { title, author, description, heading, text, image } = formik.values;

  if (!id) return <Navigate to="/blog" replace />;
  const post = useAppSelector(state => getPost(state, id));
  if (!post) return <Navigate to="/blog" replace />;

  const handleClickToBackArrow = () => navigate('/blog');

  useEffect(() => {
    if (id === 'new') {
      if (author && description && text && title && heading && image.length > 0) {
        // SetDisabledSubmit(false);
      }
    } else if (id !== 'new' && (post.title !== title || post.description !== description)) {
      // SetDisabledSubmit(false);
    }
  }, [title, author, description, heading, text, image, id]);

  useEffect(() => {
    async function fetchBlog() {
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
          image: data.result.imageUrl,
        });

        // SetDisabledSubmit(true);
      } catch (error: any) {
        navigate('/blog');
        toast.error(String(error.response.data.message));
      }
    }

    if (id !== 'new') {
      fetchBlog();
    }

    const fetchAuthors = async () => {
      const response = await axios.get<AuthorResponse>(
        'https://ypbooking.chost.com.ua/blog/api/author/get-all-authors'
      );

      setAuthors(response.data.result);
    };
    fetchAuthors();
  }, [id]);

  const checkImageType = (imgType: any) => {
    const lowerCaseImgType = imgType.toLowerCase();

    if (
      lowerCaseImgType === 'image/jpeg' ||
      lowerCaseImgType === 'image/png' ||
      lowerCaseImgType === 'image/webp'
    ) {
      return true;
    }

    return false;
  };

  const addMainPhoto = (e: any) => {
    const mainImage = e.target.files[0];

    if (!mainImage) return;
    if (mainImage.size > 512000) {
      toast.error(
        'Error: You have uploaded a photo larger than 500KB. We cannot accept photos of this size. Please resize it and upload it again.'
      );
      return;
    }
    if (!checkImageType(mainImage.type)) {
      toast.error('Error: Photo must be PNG, WEBP or JPEG format.');
      return;
    }

    formik.setFieldValue('image', [e.target.files[0]]);

    const fileNameDisplay = document.getElementById('fileNameDisplay');

    if (fileNameDisplay) {
      if (e.target.files.length > 0) {
        fileNameDisplay.textContent = e.target.files[0].name;
      } else {
        fileNameDisplay.textContent = '';
      }
    }
  };

  const modules = {
    toolbar: [
      [{ header: [2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline'],
      ['link', 'video', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };

  useEffect(() => {
    if (id !== 'new' && authors.length > 0) {
      const defaultAuthor = authors.find(a => a.name === formik.values.author);
      if (defaultAuthor) {
        formik.setFieldValue('author', defaultAuthor.name);
      }
    }
  }, [id, authors]);

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
          <div className="title">
            <div className="input-group prefix">
              <span className="input-group-addon">Title</span>
              <input id="title" type="text" onChange={formik.handleChange} value={title} />
            </div>
            <div className="input-group prefix">
              <span className="input-group-addon">Author</span>

              <select id="author" onChange={formik.handleChange}>
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
          </div>

          <div className="articleImage">
            {id !== 'new' ? (
              <img id="article-img" src={String(formik.values.image[0])} alt="" />
            ) : (
              <div>
                <input
                  type="file"
                  className="input-file"
                  accept="image/png, image/jpeg"
                  id="fileInput"
                  onChange={addMainPhoto}
                />

                <label htmlFor="fileInput" className="custom-file-upload">
                  <span>Select Image for Article</span>
                </label>
                <div id="fileNameDisplay" className="file-name" />
                {String(formik.values.image[0]) === 'undefined' && (
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
              onChange={value => {
                formik.setFieldValue('text', value);

                // if (id !== 'new') {
                //   if (value !== text) {
                //     SetDisabledSubmit(false);
                //   } else {
                //     SetDisabledSubmit(true);
                //   }
                // }
              }}
              value={text}
            />
          </div>
        </form>
      </PostContent>
    </BlogContainer>
  );
};

export default PostPage;
