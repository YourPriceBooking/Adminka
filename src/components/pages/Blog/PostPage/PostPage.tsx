// /* eslint-disable no-plusplus */
// import type { ChangeEvent, RefObject } from 'react';
// import { useRef, useEffect, useState, useMemo } from 'react';
// import { Navigate, useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import backArrow from 'assets/icons/backarrow.svg';
// import { useAppSelector } from 'App';
// import { getPost } from 'features/blog/blogSelector';
// import { useFormik } from 'formik';
// import ReactQuill from 'react-quill';
// import type QuillEditor from 'quill';
// import 'react-quill/dist/quill.snow.css';
// import axios from 'axios';
// import { blogBaseUrl } from 'features/api';

// import { BlogContainer, Header } from '../BlogPage/Blog.styled';
// import { PostContent } from './PostPage.styled';
// import ModalAddLater from './ModalAddLater/ModalAddLater';


// type Author = {
//   _id: number;
//   email: string;
//   name: string;
//   image: string;
//   description: string;
//   skills: string;
//   links: string[];
// };

// type AuthorResponse = {
//   result: Author[];
// };

// type FormikType = {
//   title: string;
//   author: string;
//   description: string;
//   heading: string;
//   country: string;
//   text: string;
//   image: File[];
//   imageName?: string;
// };

// type Country = {
//   international: string;
//   country: string;
//   langCode: string;
// };

// type CountryResponse = {
//   code: number;
//   status: string;
//   country: Country[];
// };



// const PostPage: React.FC = () => {
//   // const [disableSubmit, SetDisabledSubmit] = useState(true);
//   const [authors, setAuthors] = useState<Author[]>([]);
//   const [isOpenModel, setIsOpenModal] = useState(false);
//   const [langCode] = useState<string>("EN")
//   const [allCategories, setAllCategories] = useState<string[]>([])

//   const { id } = useParams();
//   const navigate = useNavigate();
//   const ref = useRef<ReactQuill & { editor: QuillEditor }>(null);
//   const inputImgRef = useRef() as RefObject<HTMLInputElement>;

//   const formik = useFormik<FormikType>({
//     initialValues: {
//       title: '',
//       author: '',
//       description: '',
//       heading: '',
//       country: '',
//       text: '',
//       image: [],
//       imageName: '',
//     },
//     onSubmit: async ({ title, author, description, heading, country, text, image }) => {
//       try {
//         let data: any = {};

//         if (id === 'new') {
//           data = new FormData();
//           data.append('title', title);
//           data.append('description', description);
//           data.append('heading', heading);
//           data.append('markup', text);
//           data.append('author', author);
//           data.append(
//             'articleUrl',
//             `https://www.thewandered.com/${title.toLowerCase().replace(' ', '-')}`
//           );
//           image.forEach(file => {
//             data.append('image', file);
//           });

//           if (country !== 'home') {
//             data.append('country', country);
//           } else {
//             data.append('country', '');
//           }

//           await axios.post(`${blogBaseUrl}/post/add-post`, data);
//           toast.success('Post Created');
//         } else {
//           data = {
//             title,
//             author,
//             description,
//             heading,
//             markup: text,
//           };

//           await axios.patch(`${blogBaseUrl}/post/update-post/${id}`, data);
//           toast.success('Post Updated');
//         }
//       } catch (err: any) {
//         if (axios.isAxiosError(err)) {
//           toast.error(
//             `Error ${err.response?.status} (${err.response?.statusText}): ${err.response?.data.message} `
//           );
//         } else {
//           toast.error(`Error: ${err.response?.data.message}`);
//         }
//       }
//     },
//   });

//   const { title, author, description, heading, country, text, image } = formik.values;

//   useEffect(() => {
//     const savedImage = localStorage.getItem('pendingImageData');
//     if (savedImage) {
//       const { fileName } = JSON.parse(savedImage);

//       formik.setFieldValue('image', [fileName]);
//       formik.setFieldValue('imageName', fileName);

//       toast.success('🖼️ Image data loaded from upload page!');
//       localStorage.removeItem('pendingImageData');
//     }


//   }, []);

//   useEffect(() => {
//     const getCountries = async () => {
//       try {
//         const { data: { country: countryData } } = await axios.get<CountryResponse>('https://ypbooking.chost.com.ua/blog/api/country/get-country', {
//           params: {
//             langCode
//           }
//         })


//         const counties = countryData.map(currentCountry => currentCountry.country)
//         setAllCategories(counties)


//       } catch (error) {
//         console.error('Failed to fetch countries:', error)
//         setAllCategories([])
//       }
//     }
//     getCountries()
//   }, [langCode])



//   if (!id) return <Navigate to="/blog" replace />;
//   const post = useAppSelector(state => getPost(state, id));
//   if (!post) return <Navigate to="/blog" replace />;

//   const handleClickToBackArrow = () => navigate('/blog');

//   useEffect(() => {
//     if (id === 'new') {
//       if (author && description && text && title && heading && image.length > 0) {
//         // SetDisabledSubmit(false);
//       }
//     } else if (id !== 'new' && (post.title !== title || post.description !== description)) {
//       // SetDisabledSubmit(false);
//     }
//   }, [title, author, description, heading, country, text, image, id]);

//   useEffect(() => {
//     async function fetchBlog() {
//       try {
//         const { data } = await axios.get(
//           `${blogBaseUrl}/post/get-by-url/?articleUrl=${post?.articleUrl}`
//         );

//         formik.setValues({
//           title: data.result.title,
//           author: data.result.author,
//           text: data.result.markup,
//           description: data.result.description,
//           heading: data.result.heading,
//           country: data.result.country,
//           image: data.result.imageUrl,
//         });

//         // SetDisabledSubmit(true);
//       } catch (error: any) {
//         navigate('/blog');
//         toast.error(String(error.response.data.message));
//       }
//     }

//     if (id !== 'new') {
//       fetchBlog();
//     }

//     const fetchAuthors = async () => {
//       const response = await axios.get<AuthorResponse>(
//         'https://ypbooking.chost.com.ua/blog/api/author/get-all-authors'
//       );

//       setAuthors(response.data.result);
//     };
//     fetchAuthors();
//   }, [id]);

//   const checkImageType = (imgType: any) => {
//     const lowerCaseImgType = imgType.toLowerCase();

//     if (
//       lowerCaseImgType === 'image/jpeg' ||
//       lowerCaseImgType === 'image/png' ||
//       lowerCaseImgType === 'image/webp'
//     ) {
//       return true;
//     }

//     return false;
//   };

//   // const addMainPhoto = (e: any) => {
//   //   const mainImage = e.target.files[0];

//   //   if (!mainImage) return;
//   //   if (mainImage.size > 512000) {
//   //     toast.error(
//   //       'Error: You have uploaded a photo larger than 500KB. We cannot accept photos of this size. Please resize it and upload it again.'
//   //     );
//   //     return;
//   //   }
//   //   if (!checkImageType(mainImage.type)) {
//   //     toast.error('Error: Photo must be PNG, WEBP or JPEG format.');
//   //     return;
//   //   }

//   //   formik.setFieldValue('image', [e.target.files[0], ...image]);

//   //   const fileNameDisplay = document.getElementById('fileNameDisplay');

//   //   if (fileNameDisplay) {
//   //     if (e.target.files.length > 0) {
//   //       fileNameDisplay.textContent = e.target.files[0].name;
//   //     } else {
//   //       fileNameDisplay.textContent = '';
//   //     }
//   //   }
//   // };

//   /* const modules = {
//     toolbar: [
//       [{ header: [2, 3, 4, 5, false] }],
//       ['bold', 'italic', 'underline'],
//       ['blockquote'],
//       ['link', 'video', 'image'],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['clean'],
//     ],
//   }; */

//   const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;

//     if (image.length === 0) {
//       toast.error('Error: Select Image for Article, please');
//       return;
//     }

//     const file = e.target.files[0];

//     if (!file) return;

//     if (file.size > 512000) {
//       toast.error(
//         'Error: You have uploaded a photo larger than 500KB. We cannot accept photos of this size. Please resize it and upload it again.'
//       );
//       return;
//     }
//     if (!checkImageType(file.type)) {
//       toast.error('Error: Photo must be PNG, WEBP or JPEG format.');
//       return;
//     }

//     formik.setFieldValue('image', [...image, file]);
//     formik.setFieldValue('text', `${text}<img src="imgUrlByIdx" alt="${file.name}" />`);
//   };

//   const modules = useMemo(
//     () => ({
//       toolbar: {
//         container: [
//           [{ header: [2, 3, 4, 5, false] }],
//           ['bold', 'italic', 'underline'],
//           ['blockquote'],
//           ['link', 'video', 'image'],
//           [{ list: 'ordered' }, { list: 'bullet' }],
//           ['clean'],
//         ],

//         handlers: {
//           image: () => {
//             navigate(`/blog/post/upload-image`);
//           },
//         },
//       },
//     }),
//     []
//   );

//   useEffect(() => {
//     if (id !== 'new' && authors.length > 0) {
//       const defaultAuthor = authors.find(a => a.name === formik.values.author);
//       if (defaultAuthor) {
//         formik.setFieldValue('author', defaultAuthor.name);
//       }
//     }

//     // if (id !== 'new') {
//     //   formik.setFieldValue('country', defaultAuthor.name);
//     // }
//   }, [id, authors]);

//   const keyDownHandler = (e: any) => {
//     if (e.code === 'Backspace' && image.length > 1) {
//       for (let i = 1; i < image.length; i++) {
//         if (!text.includes(`alt="${image[i].name}"`)) {
//           const updatedImage = image.slice(1).filter(picture => image[i].name !== picture.name);

//           formik.setFieldValue('image', [image[0], ...updatedImage]);

//           break;
//         }
//       }
//     }
//   };

//   return (
//     <BlogContainer>
//       <Header>
//         <div>
//           <img src={backArrow} alt="arrow" onClick={handleClickToBackArrow} aria-hidden="true" />
//         </div>
//       </Header>
//       <PostContent>
//         <form onSubmit={formik.handleSubmit}>
//           <button type="submit" className="submit">
//             {id === 'new' ? 'Submit' : 'Update Post'}
//           </button>
//           {id === 'new' && (
//             <div className="add-later-wrapper">
//               <button
//                 onClick={() => setIsOpenModal(prev => !prev)}
//                 type="button"
//                 className="submit"
//               >
//                 Add later
//               </button>

//               {isOpenModel && <ModalAddLater />}
//             </div>
//           )}

//           <div className="title">
//             <div className="input-group prefix">
//               <span className="input-group-addon">Title</span>
//               <input id="title" type="text" onChange={formik.handleChange} value={title} />
//             </div>
//             <div className="input-group prefix">
//               <span className="input-group-addon">Author</span>

//               <select id="author" onChange={formik.handleChange}>
//                 {id === 'new' && <option value="">Select an author</option>}
//                 {authors.map((item: Author) => (
//                   <option value={item.name} key={item._id} className="optionInput">
//                     {item.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="input-group prefix">
//               <span className="input-group-addon">Description</span>
//               <input
//                 id="description"
//                 className="smallInput"
//                 type="text"
//                 placeholder="Description of the article, which is not displayed in the article, but is used as a meta tag"
//                 onChange={formik.handleChange}
//                 value={description}
//               />
//             </div>

//             <div className="input-group prefix">
//               <span className="input-group-addon">H1 heading</span>
//               <input
//                 id="heading"
//                 className="smallInput"
//                 type="text"
//                 disabled={id !== 'new'}
//                 onChange={formik.handleChange}
//                 value={heading}
//               />
//             </div>

//             <div className="input-group prefix">
//               <span className="input-group-addon">Category</span>

//               <select disabled={id !== 'new'} id="country" onChange={formik.handleChange}>
//                 {id === 'new' ? (
//                   <option value="not selected">Select a post category</option>
//                 ) : (
//                   <option>{country}</option>
//                 )}
//                 {allCategories.map((item: string) => (
//                   <option value={item} key={item} className="optionInput">
//                     {item}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="articleImage">
//             {id !== 'new' ? (
//               <img id="article-img" src={String(formik.values.image[0])} alt="article" />
//             ) : (
//               <div>
//                 <button
//                   type="button"
//                   onClick={() => navigate(`/blog/post/upload-image`)}
//                   className="custom-file-upload"
//                   style={{ cursor: 'pointer' }}
//                 >
//                   Select Image for Article
//                 </button>

//                 {formik.values.imageName ? (
//                   <p className="file-name">📸 {formik.values.imageName}</p>
//                 ) : (
//                   <p className="warning">The photo size must be up to 500 KB</p>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="text">
//             <input
//               ref={inputImgRef}
//               style={{ display: 'none' }}
//               type="file"
//               onChange={imageHandler}
//             />
//             <ReactQuill
//               modules={modules}
//               ref={ref}
//               id="text"
//               className="textarea"
//               placeholder="Enter your text here..."
//               onChange={value => {
//                 formik.setFieldValue('text', value);
//               }}
//               value={text}
//               onKeyDown={keyDownHandler}
//             />
//           </div>
//         </form>
//       </PostContent>
//     </BlogContainer>
//   );
// };

// export default PostPage;

/* eslint-disable no-plusplus */
import type { ChangeEvent, RefObject } from 'react';
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
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
  image: File[];
  alts: string[];
  captions: string[];
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
  // const [disableSubmit, SetDisabledSubmit] = useState(true);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isOpenModel, setIsOpenModal] = useState(false);
  const [langCode] = useState<string>('EN');
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const uploadState = location.state as
    | {
      mode: string,
      newImages?: File[];
      newAlts?: string[];
      newCaptions?: string[];
      formValues?: FormikType;
      cursorRange?: RangeStatic | null;
    }
    | undefined;

  const ref = useRef<ReactQuill & { editor: QuillEditor }>(null);
  const inputImgRef = useRef() as RefObject<HTMLInputElement>;
  const imagesRef = useRef<File[]>([]);
  const formikValuesRef = useRef<FormikType>({
    title: '',
    author: '',
    description: '',
    heading: '',
    country: '',
    text: '',
    image: [],
    alts: [],
    captions: [],
  });
  const editorRangeRef = useRef<any>(null);
  const insertedRef = useRef<boolean>(false);

  const formik = useFormik<FormikType>({
    initialValues: {
      title: '',
      author: '',
      description: '',
      heading: '',
      country: '',
      text: '',
      image: [],
      alts: [],
      captions: [],
    },
    onSubmit: async (
      { title, author, description, heading, country, text, image, alts, captions },
      { resetForm }
    ) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

          alts.forEach(a => data.append('alts', a));
          captions.forEach(c => data.append('captions', c));

          if (country !== 'home') {
            data.append('country', country);
          } else {
            data.append('country', '');
          }

          await axios.post(`${blogBaseUrl}/post/add-post`, data);
          toast.success('Post Created');
          // eslint-disable-next-line no-console
          console.log('data', data);
        } else {
          data = {
            title,
            author,
            description,
            heading,
            markup: text,
          };

          await axios.patch(`${blogBaseUrl}/post/update-post/${id}`, data);
          toast.success('Post Updated');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          toast.error(
            `Error ${err.response?.status} (${err.response?.statusText}): ${err.response?.data.message} `
          );
        } else {
          toast.error(`Error: ${err.response?.data.message}`);
        }
        return;
      }

      resetForm();
    },
  });

  const { title, author, description, heading, country, text, image } = formik.values;

  useEffect(() => {
    imagesRef.current = formik.values.image;
    formikValuesRef.current = formik.values;
  }, [formik.values]);

  useEffect(() => {
    if (!uploadState) return;
    if (insertedRef.current) return;

    if (uploadState.formValues) {
      formik.setValues(uploadState.formValues);
    }

    if (uploadState.newImages) {
      formik.setFieldValue('image', uploadState.newImages);
    }
    if (uploadState.newAlts) {
      formik.setFieldValue('alts', uploadState.newAlts);
    }
    if (uploadState.newCaptions) {
      formik.setFieldValue('captions', uploadState.newCaptions);
    }

    if (uploadState.mode === "editor") {
      insertedRef.current = true;

      const files = uploadState.newImages ?? [];
      const lastFile = files[files.length - 1];
      const imgUrl = URL.createObjectURL(lastFile);

      setTimeout(() => {
        const quill = ref.current?.editor;
        const cursor = uploadState.cursorRange;

        if (quill) {
          if (cursor && typeof cursor.index === "number") {
            quill.insertEmbed(cursor.index, "image", imgUrl, "user");
          } else {
            quill.insertEmbed(quill.getLength(), "image", imgUrl, "user");
          }
        }
      }, 50);
    }

    navigate(location.pathname, { replace: true });
  }, [uploadState, formik, navigate, location.pathname]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const {
          data: { country: countryData },
        } = await axios.get<CountryResponse>(
          'https://ypbooking.chost.com.ua/blog/api/country/get-country',
          {
            params: {
              langCode,
            },
          }
        );

        const counties = countryData.map(currentCountry => currentCountry.country);
        setAllCategories(counties);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch countries:', error);
        setAllCategories([]);
      }
    };
    getCountries();
  }, [langCode]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, author, description, heading, country, text, image, id]);

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
          country: data.result.country,
          image: [],
          alts: [],
          captions: [],
        });

        // SetDisabledSubmit(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // const addMainPhoto = (e: any) => {
  //   const mainImage = e.target.files[0];

  //   if (!mainImage) return;
  //   if (mainImage.size > 512000) {
  //     toast.error(
  //       'Error: You have uploaded a photo larger than 500KB. We cannot accept photos of this size. Please resize it and upload it again.'
  //     );
  //     return;
  //   }
  //   if (!checkImageType(mainImage.type)) {
  //     toast.error('Error: Photo must be PNG, WEBP or JPEG format.');
  //     return;
  //   }

  //   formik.setFieldValue('image', [e.target.files[0], ...image]);

  //   const fileNameDisplay = document.getElementById('fileNameDisplay');

  //   if (fileNameDisplay) {
  //     if (e.target.files.length > 0) {
  //       fileNameDisplay.textContent = e.target.files[0].name;
  //     } else {
  //       fileNameDisplay.textContent = '';
  //     }
  //   }
  // };

  /* const modules = {
    toolbar: [
      [{ header: [2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline'],
      ['blockquote'],
      ['link', 'video', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  }; */

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    if (image.length === 0) {
      toast.error('Error: Select Image for Article, please');
      return;
    }

    const file = e.target.files[0];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!file) return;

    if (file.size > 512000) {
      toast.error(
        'Error: You have uploaded a photo larger than 500KB. We cannot accept photos of this size. Please resize it and upload it again.'
      );
      return;
    }
    if (!checkImageType(file.type)) {
      toast.error('Error: Photo must be PNG, WEBP or JPEG format.');
      return;
    }

    formik.setFieldValue('image', [...image, file]);
    formik.setFieldValue('text', `${text}<img src="imgUrlByIdx" alt="${file.name}" />`);
  };

  const openEditorImageUpload = useCallback(() => {
    // save cursor position
    const range = ref.current?.editor.getSelection();
    editorRangeRef.current = range;

    navigate(`/blog/post/upload-image`, {
      state: {
        mode: "editor",
        returnTo: location.pathname,
        formValues: formikValuesRef.current,
        newImages: imagesRef.current,
        newAlts: formikValuesRef.current.alts,
        newCaptions: formikValuesRef.current.captions,
        cursorRange: editorRangeRef.current,
      },
    });
  }, [navigate, location.pathname]);

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
          image: openEditorImageUpload,
        },
      },
    }),
    [openEditorImageUpload]
  );

  useEffect(() => {
    if (id !== 'new' && authors.length > 0) {
      const defaultAuthor = authors.find(a => a.name === formik.values.author);
      if (defaultAuthor) {
        formik.setFieldValue('author', defaultAuthor.name);
      }
    }

    // if (id !== 'new') {
    //   formik.setFieldValue('country', defaultAuthor.name);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, authors]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const keyDownHandler = (e: any) => {
    if (e.code === 'Backspace' && image.length > 1) {
      for (let i = 1; i < image.length; i++) {
        if (!text.includes(`alt="${image[i].name}"`)) {
          const updatedImage = image.slice(1).filter(picture => image[i].name !== picture.name);

          formik.setFieldValue('image', [image[0], ...updatedImage]);

          break;
        }
      }
    }
  };
  const openMainImageUpload = () => {
    navigate(`/blog/post/upload-image`, {
      state: {
        mode: "main",
        returnTo: location.pathname,
        formValues: formikValuesRef.current,
        newImages: imagesRef.current,
        newAlts: formikValuesRef.current.alts,
        newCaptions: formikValuesRef.current.captions,
      },
    });
  };

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
                onClick={() => setIsOpenModal(prev => !prev)}
                type="button"
                className="submit"
              >
                Add later
              </button>

              {isOpenModel && <ModalAddLater />}
            </div>
          )}

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

            <div className="input-group prefix">
              <span className="input-group-addon">Category</span>

              <select disabled={id !== 'new'} id="country" onChange={formik.handleChange}>
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
              <img id="article-img" src={String(formik.values.image[0])} alt="article" />
            ) : (
              <div>
                <button
                  type="button"
                  onClick={openMainImageUpload}
                  className="custom-file-upload"
                  style={{ cursor: 'pointer' }}
                >
                  Select Image for Article
                </button>

                {formik.values.image.length > 0 ? (

                  <div className="preview-item">
                    <p className="file-name">📸 {
                      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                      formik.values.image[0].name ?? ''}</p>
                  </div>
                )
                  : (
                    <p className="warning">The photo size must be up to 500 KB</p>
                  )}
              </div>
            )}
          </div>

          <div className="text">
            <input
              ref={inputImgRef}
              style={{ display: 'none' }}
              type="file"
              onChange={imageHandler}
            />
            <ReactQuill
              modules={modules}
              ref={ref}
              id="text"
              className="textarea"
              placeholder="Enter your text here..."
              onChange={value => {
                formik.setFieldValue('text', value);
              }}
              value={text}
              onKeyDown={keyDownHandler}
            />
          </div>
        </form>
      </PostContent>
    </BlogContainer>
  );
};

export default PostPage;

