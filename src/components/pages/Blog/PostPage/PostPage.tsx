import { useParams } from 'react-router-dom';
import backArrow from 'assets/icons/backarrow.svg';
import { BlogContainer, Header } from '../BlogPage/Blog.styled';
import { Button } from '../BlogPage/components/Button/Button';

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
  console.log(id);

  return (
    <BlogContainer>
      <Header>
        <div>
          <img src={backArrow} alt="arrow" />
          <div>
            {ButtonsHeader.map(({ title }) => (
              <Button onClick={() => console.log(title)}>{title}</Button>
            ))}
          </div>
        </div>
      </Header>
    </BlogContainer>
  );
};

export default PostPage;
