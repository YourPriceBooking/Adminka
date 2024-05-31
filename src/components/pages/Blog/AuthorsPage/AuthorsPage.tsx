import { useNavigate } from 'react-router-dom';
import backArrow from 'assets/icons/ArrowBack.svg';
import Rectangle from 'components/pages/Blog/AuthorsPage/Rectangle 5.png';
import 'react-quill/dist/quill.snow.css';
import classes from './AuthorsPage.module.css';
import { Button } from './Button/Button';

const AuthorsPage: React.FC = () => {
  const navigate = useNavigate();

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
          <Button type="navigate" onClick={() => navigate(`/#`)}>
            ADD NEW author
          </Button>
        </div>
      </div>
      <div className={classes.contentAuthors}>
        <div>
          <img
            className={classes.imgAuthors}
            src={Rectangle}
            alt="arrow"
            onClick={handleClickToBackArrow}
            aria-hidden="true"
          />
        </div>
        <div className={classes.authorsDescription}>
          <div>Author Bio for The Wandered Blog</div>
          <div>Name: SLAVA NIKITENKO</div>
          <div>BIO: Entrepreneur, Investor, and Biohacker</div>
          <div>
            Educational Background:
            <ul className={classes.ulAuthors}>
              <li>
                School Years: During his school years, he developed a profound interest in
                psychology and marketing. The works of Philip Kotler significantly influenced his
                growth as a marketer. Even before completing high school, he graduated with honors
                from business school.
              </li>
              <li>
                University Education: At 17, he moved to the capital of Ukraine to study economics
                and marketing. He excelled in university-level and national marketing competitions,
                securing first place among hundreds of participants.
              </li>
            </ul>
          </div>
          <div>
            Professional Journey:
            <ul className={classes.ulAuthors}>
              <li>
                Early Career: At 20, he began working with a leading developer in Ukraine within a
                holding company focused on residential and commercial real estate in Kyiv. A year
                later, he founded his first investment and construction company, expanding into the
                real estate markets of Kyiv, Rivne, and Poltava regions. This venture grew into a
                successful holding company that operated actively for 12 years.
              </li>
              <li>
                Your Price Booking: In 2018, he developed an innovative online hotel reservation and
                daily housing rental service, Your Price Booking. He founded the company in 2023,
                overseeing its growth with a team of 15 programmers. The service &apos;s creation
                involved over 100 developers working for six years.
              </li>
            </ul>
          </div>
          <div>
            Biohacking and Health:
            <ul className={classes.ulAuthors}>
              <li>
                Research: Since 2022, he has delved into the works of Dr. Eric Berg and Japanese
                researchers Yoshinori Ohsumi and Toshiyuki Omura. Their research on autophagy and
                cellular self-regulation has been pivotal in his understanding of biological
                processes that allow cells to recycle and reuse their components.
              </li>
              <li>
                Health Transformation: By mid-2023, he achieved significant health improvements and
                weight loss, shedding 43 kilograms. He documented his journey and shared his guide,
                &quot;An Easy Way to Restore Health and Lose Weight,&quot; freely with the public.
              </li>
            </ul>
          </div>
          <div>
            Current Projects:
            <ul className={classes.ulAuthors}>
              <li>
                Book Writing: He is currently writing a book based on his health restoration guide.
              </li>
              <li>
                Blockchain Elections: Since 2018, he has been working on creating a decentralized
                application for collecting and counting voter votes using blockchain technology.
              </li>
            </ul>
          </div>
          <div>
            Achievements and Impact:
            <ul className={classes.ulAuthors}>
              <li>
                His entrepreneurial spirit and innovative approach have led to the successful
                development of multiple companies and ground-breaking projects in real estate and
                technology.
              </li>
              <li>
                His commitment to health and biohacking has inspired many, with his personal
                transformation and free guide serving as a testament to his dedication.
              </li>
            </ul>
          </div>
          <div>
            SLAVA NIKITENKO continues to explore new frontiers in business, technology, and health,
            sharing his insights and experiences through The Wandered Blog.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorsPage;
