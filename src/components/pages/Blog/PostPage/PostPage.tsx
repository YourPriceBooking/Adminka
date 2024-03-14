import { Navigate, useParams } from 'react-router-dom';
import backArrow from 'assets/icons/backarrow.svg';
import { useAppSelector } from 'App';
import { getPost } from 'features/blog/blogSelector';
import { useFormik } from 'formik';
import { BlogContainer, Header } from '../BlogPage/Blog.styled';
import { Button } from '../BlogPage/components/Button/Button';
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

const PostPage: React.FC = () => {
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      description: '',
      text: '',
    },
    onSubmit: values => {
      // http://ypbooking.chost.com.ua/blog/
      console.log('Blog data: ', JSON.stringify(values, null, 2));
    },
  });

  if (!id) return <Navigate to="/blog" replace />;

  const post = useAppSelector(state => getPost(state, id));

  if (!post) return <Navigate to="/blog" replace />;

  // function makeTextBold() {
  //   document.execCommand('bold');
  // }

  // function makeTextItalic() {
  //   document.execCommand('italic');
  // }

  const handleContentEditableChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.textContent;
    formik.setFieldValue('text', newValue);
  };

  return (
    <BlogContainer>
      <Header>
        <div>
          <img src={backArrow} alt="arrow" />
        </div>
        <div>
          {ButtonsHeader.map(({ title }) => (
            <Button onClick={() => {}}>{title}</Button>
          ))}
        </div>
      </Header>
      <PostContent>
        <form onSubmit={formik.handleSubmit}>
          <div className="title">
            <input
              id="title"
              type="text"
              placeholder="Title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <input
              id="author"
              className="smallInput"
              type="text"
              placeholder="Author"
              onChange={formik.handleChange}
              value={formik.values.author}
            />
            <input
              id="description"
              className="smallInput"
              type="text"
              placeholder="Description (description of the article, which is not displayed in the article, but is used as a meta tag)"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </div>

          <div className="text">
            {/* <img src="https://content1.rozetka.com.ua/goods/images/big/364873994.jpg" alt="a" /> */}
            <div
              id="text"
              className="textarea"
              contentEditable
              data-placeholder="Enter your text here..."
              onInput={handleContentEditableChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </PostContent>
    </BlogContainer>
  );
};

export default PostPage;
