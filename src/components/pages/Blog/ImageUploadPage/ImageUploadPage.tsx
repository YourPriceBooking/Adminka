import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useRef } from 'react';
import { BlogContainer, Buttons, Header } from '../BlogPage/Blog.styled';
import { Button } from '../BlogPage/components/Button/Button';
import classes from '../AuthorsPage/AuthorsPage.module.css';
import { UploadContainer } from './ImageUploadPage.styled';

const allCategories = ['Home', 'Canada', 'Ukraine', 'USA', 'Poland'];

const UploadImagePage: React.FC = () => {
  const navigate = useNavigate();

  const [descriptionImage, setDescription] = useState('');
  const [alt, setAlt] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (!descriptionImage.trim() || !alt.trim()) {
      toast.error('Please fill all fields first');
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 512000) {
      toast.error('Image size must be under 500KB');
      return;
    }
    const existingData = JSON.parse(localStorage.getItem('pendingImageData') || '{}');

    const updatedFiles = Array.isArray(existingData.files) ? [...existingData.files] : [];
    const updatedAlts = Array.isArray(existingData.alts) ? [...existingData.alts] : [];
    const updatedCaptions = Array.isArray(existingData.captions) ? [...existingData.captions] : [];

    updatedFiles.push(file.name);
    updatedAlts.push(alt.trim() || ' ');
    updatedCaptions.push(descriptionImage.trim() || ' ');
    const imageData = {
      ...existingData,
      fileName: updatedFiles,
      files: updatedFiles,
      alts: updatedAlts,
      captions: updatedCaptions,
    };

    localStorage.setItem('pendingImageData', JSON.stringify(imageData));

    toast.success('✅ Image added!');
    setAlt('');
    setDescription('');

    if (fileInputRef.current) fileInputRef.current.value = '';

    console.log(imageData);
  };

  const handleSaveAndExit = () => {
    setLoading(true);
    toast.success('✅ Image saved! Returning to post editor...');
    setTimeout(() => {
      navigate(-1);
    }, 1200);
  };

  return (
    <BlogContainer>
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
    </BlogContainer>
  );
};

export default UploadImagePage;
