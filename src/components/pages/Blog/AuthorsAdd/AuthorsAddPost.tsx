import { useNavigate } from 'react-router-dom';
import type { ChangeEvent } from 'react';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import backArrow from 'assets/icons/ArrowBack.svg';
import tiktokLogo from 'assets/icons/tiktok-logo.svg';
import instagramLogo from 'assets/icons/instagram-logo.svg';
import youtubeLogo from 'assets/icons/youtube-logo.svg';
import xLogo from 'assets/icons/x-logo.svg';
import linkedinLogo from 'assets/icons/linkedin-logo.svg';
import pinterestLogo from 'assets/icons/pinterest-logo.svg';
import facebookLogo from 'assets/icons/facebook-logo.svg';
import classes from '../AuthorsPage/AuthorsPage.module.css';
import { Button } from '../AuthorsPage/Button/Button';

const AuthorsAddPost: React.FC = () => {
  type Data = {
    name: string;
    description: string;
    tiktok: string;
    instagram: string;
    youtube: string;
    xsolid: string;
    linkedin: string;
    pinterest: string;
    facebook: string;
    file: File[] | string[];
  };
  const ref = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [data, setData] = useState<Data>({
    name: '',
    description: '',
    tiktok: '',
    instagram: '',
    youtube: '',
    xsolid: '',
    linkedin: '',
    pinterest: '',
    facebook: '',
    file: [],
  });

  type Event1 = {
    target: {
      id: string;
      value: string;
    };
  };

  const handleChange = (event: Event1): void => {
    const a = event.target.value;
    setData({
      ...data,
      [event.target.id]: a,
    });
  };

  type FileState = Record<string, any>

  const [selectFile, seterSelectFile] = useState<FileState>({});

  const handleChange1 = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      seterSelectFile(event.target.files[0]);
    }
  };

  const handleClickToBackArrow = () => {
    navigate('/blog/post/authors');
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let formData: any = {};
    console.log(selectFile);
    formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('tiktok', data.tiktok);
    formData.append('instagram', data.instagram);
    formData.append('youtube', data.youtube);
    formData.append('xsolid', data.xsolid);
    formData.append('linkedin', data.linkedin);
    formData.append('pinterest', data.pinterest);
    formData.append('facebook', data.facebook);
    formData.append('file', selectFile);
    await axios.post('http://localhost:8080/author/add', formData).then(response => {
      if (response.status === 200) {
        navigate('/blog/post/authors');
      }
      console.log(response.status, response.data);
    });
  };
  const photoInput = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <div className={classes.authorsContainer}>
      <div className={classes.authorsHeader}>
        <div className={classes.handleClickToBack}>
          <img src={backArrow} alt="arrow" onClick={handleClickToBackArrow} aria-hidden="true" />
        </div>
        <div className={classes.headerAuthors}>
          <div className={classes.headerTableOfContents}>Authors</div>
          <Button type="navigate" onClick={() => navigate(`/blog/author/add`)}>
            ADD NEW author
          </Button>
        </div>
      </div>
      <div>
        <form className={classes.formAuthors} onSubmit={handleSubmit}>
          <div className={classes.formContent}>
            <button type="button" className={classes.photoAuthors} onClick={photoInput}>
              <input
                className={classes.hidden}
                id="image"
                ref={ref}
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleChange1}
              />
              <span>ADD PHOTO</span>
            </button>

            <div>
              <div className={classes.inputAuthorsDiv}>
                <span className="input-group-addon">Name</span>
                <input
                  id="name"
                  className={classes.inputAuthors}
                  onChange={handleChange}
                  value={data.name}
                />
              </div>
              <div className={classes.inputAuthorsDiv}>
                <span className="input-group-addon">BIO</span>
                <textarea
                  id="description"
                  className={classes.textareaAuthors}
                  onChange={handleChange}
                  value={data.description}
                />
              </div>
              <div className={classes.inputAuthorsDiv}>
                <span className={classes.spanAuthors}>
                  <img src={tiktokLogo} alt="arrow" aria-hidden="true" />
                </span>
                <input
                  id="tiktok"
                  className={classes.inputAuthors}
                  onChange={handleChange}
                  value={data.tiktok}
                />
              </div>
              <div className={classes.inputAuthorsDiv}>
                <span className={classes.spanAuthors}>
                  <img src={instagramLogo} alt="arrow" aria-hidden="true" />
                </span>
                <input
                  id="instagram"
                  className={classes.inputAuthors}
                  onChange={handleChange}
                  value={data.instagram}
                />
              </div>
              <div className={classes.inputAuthorsDiv}>
                <span className={classes.spanAuthors}>
                  <img src={youtubeLogo} alt="arrow" aria-hidden="true" />
                </span>
                <input
                  id="youtube"
                  className={classes.inputAuthors}
                  onChange={handleChange}
                  value={data.youtube}
                />
              </div>
              <div className={classes.inputAuthorsDiv}>
                <span className={classes.spanAuthors}>
                  <img src={xLogo} alt="arrow" aria-hidden="true" />
                </span>
                <input
                  id="xsolid"
                  className={classes.inputAuthors}
                  onChange={handleChange}
                  value={data.xsolid}
                />
              </div>
              <div className={classes.inputAuthorsDiv}>
                <span className={classes.spanAuthors}>
                  <img src={linkedinLogo} alt="arrow" aria-hidden="true" />
                </span>
                <input
                  id="linkedin"
                  className={classes.inputAuthors}
                  onChange={handleChange}
                  value={data.linkedin}
                />
              </div>
              <div className={classes.inputAuthorsDiv}>
                <span className={classes.spanAuthors}>
                  <img src={pinterestLogo} alt="arrow" aria-hidden="true" />
                </span>
                <input
                  id="pinterest"
                  className={classes.inputAuthors}
                  onChange={handleChange}
                  value={data.pinterest}
                />
              </div>
              <div className={classes.inputAuthorsDiv}>
                <span className={classes.spanAuthors}>
                  <img src={facebookLogo} alt="arrow" aria-hidden="true" />
                </span>
                <input
                  id="facebook"
                  className={classes.inputAuthors}
                  onChange={handleChange}
                  value={data.facebook}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthorsAddPost;
