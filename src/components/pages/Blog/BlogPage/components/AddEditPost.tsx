import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import type { Post } from '../types/Post';

type AddEditPostProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Post) => void;
  post?: Post;
};

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  imageUrl: yup.string().required('Image URL is required'),
  description: yup.string().required('Description is required'),
});

const AddEditPost: React.FC<AddEditPostProps> = ({ isOpen, onClose, onSubmit, post }) => {
  const formik = useFormik({
    initialValues: {
      id: post?.id ?? 0,
      title: post?.title ?? '',
      publicationDate: post?.publicationDate ?? new Date(),
      changeDate: post?.changeDate ?? new Date(),
      author: post?.author ?? '',
      imageUrl: post?.imageUrl ?? '',
      description: post?.description ?? '',
    },
    validationSchema,
    onSubmit: values => {
      onSubmit(values);
      onClose();
    },
  });

  const handleCancelClick = () => {
    formik.resetForm();
    onClose();
  };

useEffect(() => {
  const fetchData = async () => {
    if (post && isOpen) {
      await formik.setValues(post);
    }
  };

    fetchData().catch(error => {
      console.error(error)
  });
}, [post, isOpen]);

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div>Popup Content</div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <span>Title:</span>
          <input type="text" {...formik.getFieldProps('title')} />
          {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
        </div>
        <div>
          <span>Author:</span>
          <input type="text" {...formik.getFieldProps('author')} />
          {formik.touched.author && formik.errors.author && <div>{formik.errors.author}</div>}
        </div>
        <div>
          <span>Image URL:</span>
          <input type="text" {...formik.getFieldProps('imageUrl')} />
          {formik.touched.imageUrl && formik.errors.imageUrl && <div>{formik.errors.imageUrl}</div>}
        </div>
        <div>
          <span>Description:</span>
          <input type="text" {...formik.getFieldProps('description')} />
          {formik.touched.description && formik.errors.description && (
            <div>{formik.errors.description}</div>
          )}
        </div>
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditPost;
