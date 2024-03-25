/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import backArrow from 'assets/icons/backarrow.svg';
import { useAppSelector } from 'App';
import { getPost } from 'features/blog/blogSelector';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { blogBaseUrl } from 'features/api';
import { BlogContainer, Header } from '../BlogPage/Blog.styled';
import { PostContent } from './PostPage.styled';

// type AddEditPostProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (post: Post) => void;
//   post?: Post;
// };

// const validationSchema = yup.object().shape({
//   title: yup.string().required('Title is required'),
//   author: yup.string().required('Author is required'),
//   imageUrl: yup.string().required('Image URL is required'),
//   description: yup.string().required('Description is required'),
// });
const CustomButton = () => <span className="octicon octicon-star" />;

const ButtonsHeader = [
  {
    title: 'H1',
  },
  {
    title: 'H2',
  },
  {
    title: 'H3',
  },
  {
    title: 'H4',
  },
  {
    title: 'Add video',
  },
  {
    title: 'Add picture',
  },
  {
    title: '"text text"',
  },
  {
    title: 'paragraph',
  },
  {
    title: 'Link',
  },
];

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue="" onChange={e => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option selected />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option selected />
    </select>
    <button className="ql-insertStar">
      <CustomButton />
    </button>
  </div>
);

const PostPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      description: '',
      text: '',
    },
    onSubmit: async ({ title, author, description, text }) => {
      try {
        await axios.post(`${blogBaseUrl}/post/add-post`, {
          title,
          author,
          imageUrl: [
            'http://res.cloudinary.com/your-price-booking/image/upload/v1699187091/Blog-YPB/zifnqqnk6ci2fxvb6szh.png',
          ],
          description,
          articleUrl: `https://www.thewandered.com/${title.toLowerCase().replace(' ', '-')}`,
          markup: text,
        });

        toast.success('Post Created');
      } catch (err: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        toast.error(err.response.data.message);
      }
    },
  });

  const { title, author, description, text } = formik.values;

  const [disableSubmit, SetDisabledSubmit] = useState(true);

  if (!id) return <Navigate to="/blog" replace />;

  const post = useAppSelector(state => getPost(state, id));

  if (!post) return <Navigate to="/blog" replace />;

  const handleClickToBackArrow = () => {
    navigate('/blog');
  };

  useEffect(() => {
    if (author && description && text && title) {
      SetDisabledSubmit(false);
    }
  }, [title, author, description, text]);

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
            Submit
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
            <input type="file" accept="image/png, image/jpeg" />
          </div>

          <div className="text">
            <ReactQuill
              id="text"
              className="textarea"
              placeholder="Enter your text here..."
              onChange={e => {
                formik.setFieldValue('text', e);
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
