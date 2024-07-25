import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backArrow from 'assets/icons/ArrowBack.svg';
import tiktokLogo from 'assets/icons/tiktok-logo.svg';
import instagramLogo from 'assets/icons/instagram-logo.svg';
import youtubeLogo from 'assets/icons/youtube-logo.svg';
import xLogo from 'assets/icons/x-logo.svg';
import linkedinLogo from 'assets/icons/linkedin-logo.svg';
import pinterestLogo from 'assets/icons/pinterest-logo.svg';
import facebookLogo from 'assets/icons/facebook-logo.svg';
import 'react-quill/dist/quill.snow.css';
import classes from './AuthorsPage.module.css';
import { Button } from './Button/Button';

type Link = Record<string, string>;

type Repo = {
  _id: number;
  email: string;
  name: string;
  image: string;
  description: string;
  skills: string;
  links: string[];
};

type Data = {
  loading: boolean;
  repos: Repo[];
};

// type ImageMap = {
//   [key: number]: string;
// };

const AuthorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [shou, setShou] = useState(false);
  // const [imageMap, setImageMap] = useState<ImageMap>({});
  const [appState, setAppState] = useState<Data>({
    loading: false,
    repos: [],
  });

  const logoMap: Record<string, string> = {
    tiktok: tiktokLogo,
    instagram: instagramLogo,
    youtube: youtubeLogo,
    xsolid: xLogo,
    linkedin: linkedinLogo,
    pinterest: pinterestLogo,
    facebook: facebookLogo,
  };

  useEffect(() => {
    // const fetchImages = async (repos: Repo[]) => {
    //   const imagesMap: ImageMap = {};

    //   await Promise.all(repos.map(async (repo) => {
    //     const imageResponse = await axios.get(`https://ypbooking.chost.com.ua/blog/api/author/get-author-photo/${repo._id}`);
    //     imagesMap[repo._id] = imageResponse.data.image;

    //   }));
    //   console.log(imagesMap)
    //   setImageMap(imagesMap);
    // };

    const fetchAuthors = async () => {
      setAppState({ loading: true, repos: [] });
      const response = await axios.get(
        'https://ypbooking.chost.com.ua/blog/api/author/get-all-authors'
      );
      const allRepos: Repo[] = response.data.result;

      if (!allRepos.length) {
        setShou(false);
        setAppState({
          loading: false,
          repos: [
            { _id: 0, name: '', email: '', image: '', description: '', skills: '', links: [] },
          ],
        });
      } else {
        setShou(true);
        setAppState({ loading: false, repos: allRepos });

        console.log(allRepos);

        // await fetchImages(allRepos);
      }
    };

    fetchAuthors();
  }, [setAppState, setShou]);

  const handleClickToBackArrow = () => {
    navigate('/blog');
  };

  console.log(appState.repos[4]);

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
      {shou ? (
        <div className={classes.contentAuthors}>
          {appState.repos.map(repo => {
            let parsedLinks = [];

            if (repo.links[0]) {
              if (repo.links.length === 1) {
                parsedLinks = JSON.parse(repo.links[0]);
              }
            }

            return (
              <div className={classes.postAuthor} key={repo._id}>
                <div className={classes.sideInfo}>
                  <img
                    className={classes.imgAuthors}
                    src={repo.image}
                    alt={String(repo._id)}
                    aria-hidden="true"
                  />
                  <a className={classes.email} href={repo.email}>
                    {repo.email}
                  </a>
                  <div className={classes.linksWeb}>
                    {parsedLinks.map((link: Link) => {
                      const platform = Object.keys(link)[0];
                      const url = link[platform];
                      const logo = logoMap[platform];

                      return (
                        url && (
                          <div key={platform}>
                            <a href={url} target="blank" rel="noopener noreferrer">
                              <img
                                className={classes.imgAuthors}
                                src={logo}
                                alt={platform}
                                title={platform}
                                aria-hidden="true"
                              />
                            </a>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
                <div className={classes.authorsDescription}>
                  <div>Author Bio for The Wandered Blog</div>
                  <div>Name: {repo.name}</div>
                  <div>BIO: {repo.skills}</div>
                  <div className={classes.ulAuthors}>{repo.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No posts</div>
      )}
    </div>
  );
};

export default AuthorsPage;
