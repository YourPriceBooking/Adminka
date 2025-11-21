import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useRef } from 'react';
import { Buttons, Header } from '../BlogPage/Blog.styled';
// import { BlogContainer, Buttons, Header } from '../BlogPage/Blog.styled';
import { Button } from '../BlogPage/components/Button/Button';
import classes from '../AuthorsPage/AuthorsPage.module.css';
import { UploadContainer } from './ImageUploadPage.styled';

const allCategories = ['Home', 'Canada', 'Ukraine', 'USA', 'Poland'];

const UploadImagePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [descriptionImage, setDescription] = useState('');
  const [alt, setAlt] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const returnTo: string =
    typeof location.state?.returnTo === 'string' ? location.state.returnTo : '/blog/post/new';
  const mode = location.state?.mode ?? "editor";

  const handleUploadClick = () => {
    if (!descriptionImage.trim() || !alt.trim()) {
      toast.error('Please fill all fields first');
      return;
    }
    fileInputRef.current?.click();
  };

  const getPersistedState = () => ({
    formValues: location.state?.formValues,
    newImages: location.state?.newImages || [],
    newAlts: location.state?.newAlts || [],
    newCaptions: location.state?.newCaptions || [],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 512000) {
      toast.error('Image size must be under 500KB');
      return;
    }

    const prevState = getPersistedState();
    const newImages = [...prevState.newImages];
   const newAlts = [...prevState.newAlts];
    const newCaptions = [...prevState.newCaptions];

    if (mode === "main") {
      newImages[0] = file;
      newAlts[0] = alt.trim();
      newCaptions[0] = descriptionImage.trim();

    } else {
      newImages.push(file);
      newAlts.push(alt.trim());
      newCaptions.push(descriptionImage.trim());
    }

    toast.success('✅ Image added!');
    setAlt('');
    setDescription('');

    if (fileInputRef.current) fileInputRef.current.value = '';

    setTimeout(() => {
      navigate(returnTo, {
        state: {
          formValues: prevState.formValues,
          newImages,
          newAlts,
          newCaptions,
          cursorRange: location.state?.cursorRange,
          mode,
        },
      });
    }, 1000);
  };


  const handleSaveAndExit = () => {
    setLoading(true);
    toast.success('✅ Image saved! Returning to post editor...');
    setTimeout(() => {
      const prevState = getPersistedState();
      navigate(returnTo, {
        state: {
          formValues: prevState.formValues,
          newImages: prevState.newImages,
          newAlts: prevState.newAlts,
          newCaptions: prevState.newCaptions,
          cursorRange: location.state?.cursorRange,
          mode,
        },
      });
    }, 1200);
  };

  return (
    // <BlogContainer>
    <>
      <Header className={classes.headerBlog}>
        <div>
          <Button type="navigate" onClick={() => navigate(`/blog/post/new`)}>
            ADD NEW PUBLICATIONS
          </Button>
        </div>
        <div>
          <Button type="navigate" onClick={() => navigate(`/blog/post/authors`)}>
            Authors
          </Button>
        </div>
        <div>
          <Button type="navigate" onClick={() => navigate(`/blog/video-blog`)}>
            Video blogers
          </Button>
        </div>
      </Header>

      <Buttons>
        {allCategories.map(cat => (
          <button key={cat} type="button">
            {cat}
          </button>
        ))}
      </Buttons>

      <UploadContainer>
        <form onSubmit={e => e.preventDefault()} className="formUpload">
          <input
            type="text"
            placeholder="Add description to the photo"
            value={descriptionImage}
            onChange={e => setDescription(e.target.value)}
            className="smallInput"
          />

          <input
            type="text"
            placeholder="Add ALT text to the photo"
            value={alt}
            onChange={e => setAlt(e.target.value)}
            className="smallInput"
          />

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/*"
          />

          <button type="button" className="submit" onClick={handleUploadClick} disabled={loading}>
            {loading ? 'Saving...' : 'Select Image for Article'}
          </button>
          <button type="button" className="close" onClick={handleSaveAndExit} disabled={loading}>
            X
          </button>
        </form>
      </UploadContainer>
    </>

    // </BlogContainer>
  );
};

export default UploadImagePage;
