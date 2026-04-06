import { useState, useRef, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import styles from './ImageUploadModal.module.scss';

type ImageUploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onImageAdd: (file: File, alt: string, caption: string) => void;
  mode: 'main' | 'editor';
};

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onImageAdd,
  mode,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [alt, setAlt] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log('🖼️ ImageUploadModal rendered:', { isOpen, mode, hasFile: !!selectedFile });

  const checkImageType = (imgType: string): boolean => {
    const lowerCaseImgType = imgType.toLowerCase();
    return (
      lowerCaseImgType === 'image/jpeg' ||
      lowerCaseImgType === 'image/png' ||
      lowerCaseImgType === 'image/webp'
    );
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('📁 File input changed');

    if (!e.target.files || e.target.files.length === 0) {
      console.log('❌ No files selected');
      return;
    }

    const file = e.target.files[0];
    console.log('📸 File selected:', {
      name: file.name,
      size: file.size,
      type: file.type,
    });

    // Validate file size (500KB = 512000 bytes)
    if (file.size > 512000) {
      console.log('❌ File too large:', file.size);
      toast.error(
        'Error: You have uploaded a photo larger than 500KB. Please resize it and upload it again.'
      );
      return;
    }

    // Validate file type
    if (!checkImageType(file.type)) {
      console.log('❌ Invalid file type:', file.type);
      toast.error('Error: Photo must be PNG, WEBP or JPEG format.');
      return;
    }

    console.log('✅ File validation passed');
    setSelectedFile(file);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Set default alt text from filename
    if (!alt) {
      setAlt(file.name.replace(/\.[^/.]+$/, '')); // Remove extension
    }

    console.log('✅ Preview URL created:', url);
  };

  const handleClose = () => {
    console.log('🚪 Closing modal, cleaning up');

    // Clean up preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    // Reset state
    setSelectedFile(null);
    setPreviewUrl('');
    setAlt('');
    setCaption('');

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    console.log('✅ Modal state reset');
    onClose();
  };

  const handleSubmit = () => {
    console.log('💾 Submit clicked:', {
      hasFile: !!selectedFile,
      alt,
      caption,
      mode,
    });

    if (!selectedFile) {
      console.log('❌ No file selected');
      toast.error('Please select an image first');
      return;
    }

    if (!alt.trim()) {
      console.log('❌ No alt text provided');
      toast.error('Please provide alt text for accessibility');
      return;
    }

    console.log('✅ Calling onImageAdd callback');
    onImageAdd(selectedFile, alt, caption);
    handleClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close modal if clicking the overlay (not the content)
    if (e.target === e.currentTarget) {
      console.log('🖱️ Overlay clicked, closing modal');
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Escape') handleClose();
  }}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {mode === 'main' ? 'Upload Article Image' : 'Insert Image'}
          </h2>
          <button type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image-upload" className={styles.label}>Select Image</label>
          <div className={styles.fileInputWrapper}>
            <label htmlFor="image-upload" className={styles.fileInputLabel}>
              Choose File
            </label>
            <input
              ref={fileInputRef}
              id="image-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className={styles.hiddenFileInput}
            />
          </div>
          <p className={styles.warningText}>Maximum file size: 500 KB</p>
        </div>

        {selectedFile && (
          <div className={styles.previewSection}>
            <img src={previewUrl} alt="Preview" className={styles.previewImage} />
            <p className={styles.fileName}>📸 {selectedFile.name}</p>
            <p className={styles.fileInfo}>
              Size: {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="alt-input" className={styles.label}>Alt Text (Required) *</label>
          <input
            id="alt-input"
            type="text"
            placeholder="Describe the image for accessibility"
            value={alt}
            onChange={e => setAlt(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="caption-input" className={styles.label}>Caption (Optional)</label>
          <input
            id="caption-input"
            type="text"
            placeholder="Add a caption for the image"
            value={caption}
            onChange={e => setCaption(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" className={styles.buttonSecondary} onClick={handleClose}>
            Cancel
          </button>
          <button type="button"
            className={styles.buttonPrimary}
            onClick={handleSubmit}
            disabled={!selectedFile || !alt.trim()}
          >
            {mode === 'main' ? 'Set as Article Image' : 'Insert Image'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;