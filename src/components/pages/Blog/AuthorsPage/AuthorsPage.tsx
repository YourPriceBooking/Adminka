import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backArrow from 'assets/icons/ArrowBack.svg';
import 'react-quill/dist/quill.snow.css';
import classes from './AuthorsPage.module.css';
import { Button } from './Button/Button';

const AuthorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [shou, setShou] = useState(false);
  type Data = {
    loading: boolean;
    repos: object[];
  };
  const [appState, setAppState] = useState<Data>({
    loading: false,
    repos: [],
  });

  useEffect(() => {
    setAppState({ loading: true, repos: [] });
    axios
      .get('https://sleepy-plateau-27607-ec90ed518680.herokuapp.com/author/posts/blog')
      .then(repos => {
        const allRepos = repos.data;
        if (!allRepos.length) {
          setShou(false);
          setAppState({ loading: false, repos: [{ id: 0, name: '' }] });
        }
        if (allRepos.length) {
          setShou(true);
          setAppState({ loading: false, repos: allRepos });
        }
      });
  }, [setAppState, setShou]);
  const handleClickToBackArrow = () => {
    navigate('/blog');
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
      {shou ? (
        <div className={classes.contentAuthors}>
          {appState.repos.map((repo: any) => (
            <div className={classes.postAuthor} key={repo.id}>
              <div>
                <img
                  className={classes.imgAuthors}
                  src={repo.image}
                  alt={repo.id}
                  aria-hidden="true"
                />
                <div className={classes.linksWeb}>
                  {repo.linkc.map((links: object) => (
                    <div key={String(Object.keys(links))}>
                      <a href={String(Object.values(links))} target="blank">
                        <img
                          className={classes.imgAuthors}
                          src={`https://sleepy-plateau-27607-ec90ed518680.herokuapp.com/author/posts/blog/links/img?id=${String(
                            Object.keys(links)
                          )}`}
                          alt={String(Object.keys(links))}
                          title={String(Object.keys(links))}
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className={classes.authorsDescription}>
                <div>Author Bio for The Wandered Blog</div>
                <div>Name: {repo.name}</div>
                <div>BIO: {repo.skills}</div>
                <div className={classes.ulAuthors}>{repo.description}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No posts</div>
      )}
    </div>
  );
};

export default AuthorsPage;
