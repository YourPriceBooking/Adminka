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

type FormikType = {
  title: string;
  author: string;
  description: string;
  text: string;
  image: File[] | string[];
};
const PostPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const ref = useRef<ReactQuill & { editor: QuillEditor }>(null);

  const formik = useFormik<FormikType>({
    initialValues: {
      title: '',
      author: '',
      description: '',
      text: '',
      image: [],
    },
    onSubmit: async ({ title, author, description, text, image }) => {
      try {
        const formData = new FormData();

        formData.append('title', title);

        formData.append('description', description);

        formData.append('markup', text);

        if (id === 'new') {
          formData.append('author', author);
          formData.append(
            'articleUrl',
            `https://www.thewandered.com/${title.toLowerCase().replace(' ', '-')}`
          );
          image.forEach(file => {
            formData.append('image', file);
          });

          await axios.post(`${blogBaseUrl}/post/add-post`, formData);
          toast.success('Post Created');
        } else {
          await axios.patch(`${blogBaseUrl}/post/update-post/${id}`, {title, description, markup});
          toast.success('Post Updated');
        }
      } catch (err: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        toast.error(err.data.message);
      }
    },
  });

  const { title, author, description, text, image } = formik.values;

  const [disableSubmit, SetDisabledSubmit] = useState(true);

  if (!id) return <Navigate to="/blog" replace />;

  const post = useAppSelector(state => getPost(state, id));

  if (!post) return <Navigate to="/blog" replace />;

  const handleClickToBackArrow = () => {
    navigate('/blog');
  };

  useEffect(() => {
    if (id === 'new') {
      if (author && description && text && title && image.length > 0) {
        SetDisabledSubmit(false);
      }
    } else if (id !== 'new' && (post.title !== title || post.description !== description)) {
      SetDisabledSubmit(false);
    }
  }, [title, author, description, text, image, id]);

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
          image: data.result.imageUrl,
        });

        SetDisabledSubmit(true);
      } catch (error: any) {
        navigate('/blog');
        toast.error(String(error.response.data.message));
      }
    }

    if (id !== 'new') {
      fetchBlog();
    }
  }, [id]);

  return (
    <BlogContainer>
      <Header>
        <div>
          <img src={backArrow} alt="arrow" onClick={handleClickToBackArrow} aria-hidden="true" />
        </div>
      </Header>
      <PostContent>
        <form onSubmit={formik.handleSubmit}>
          <button disabled={disableSubmit} type="submit" className="submit">
            {id === 'new' ? 'Submit' : 'Update Post'}
          </button>
          <div className="title">
            <div className="input-group prefix">
              <span className="input-group-addon">Title</span>
              <input id="title" type="text" onChange={formik.handleChange} value={title} />
            </div>
            <div className="input-group prefix">
              <span className="input-group-addon">Author</span>
              <input
                id="author"
                className="smallInput"
                type="text"
                disabled={id !== 'new'}
                onChange={formik.handleChange}
                value={author}
              />
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
          </div>

          <div className="articleImage">
            {id !== 'new' ? (
              <img src={String(formik.values.image[0])} alt="" />
            ) : (
              <div>
                <input
                  type="file"
                  className="input-file"
                  accept="image/png, image/jpeg"
                  id="fileInput"
                  onChange={e => {
                    if (e.target.files) {
                      formik.setFieldValue('image', [e.target.files[0]]);

                      const fileNameDisplay = document.getElementById('fileNameDisplay');

                      if (fileNameDisplay) {
                        if (e.target.files.length > 0) {
                          fileNameDisplay.textContent = e.target.files[0].name;
                        } else {
                          fileNameDisplay.textContent = '';
                        }
                      }
                    }
                  }}
                />

                <label htmlFor="fileInput" className="custom-file-upload">
                  <span>Select Image for Article</span>
                </label>
                <div id="fileNameDisplay" className="file-name" />
              </div>
            )}
          </div>

          <div className="text">
            <ReactQuill
              ref={ref}
              id="text"
              className="textarea"
              placeholder="Enter your text here..."
              onChange={value => {
                formik.setFieldValue('text', value);

                if (id !== 'new') {
                  if (value !== text) {
                    SetDisabledSubmit(false);
                  } else {
                    SetDisabledSubmit(true);
                  }
                }
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
