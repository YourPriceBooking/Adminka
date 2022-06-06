import { Container } from 'components/shared/Container';
import { useLocation } from 'react-router-dom';
import {
  HomeStyled,
  HomeNavListStyled,
  HomeNavItem,
  Link,
  TextSmall,
  TextNormal,
  TextAccent,
  StatsList,
  StatsListItem,
  TextMedium,
  TextMediumAccent,
} from './Home.styled';

const HomeNavList = () => {
  const location = useLocation();

  return (
    <HomeNavListStyled>
      <HomeNavItem>
        <Link to="/verification" state={location}>
          <p>Верификация</p>

          <TextSmall>10781 в очереди</TextSmall>
        </Link>
      </HomeNavItem>

      <HomeNavItem>
        <Link to="/translators" state={location}>
          <p>Переводчики</p>

          <TextNormal>7741 перевод в очереди</TextNormal>
        </Link>
      </HomeNavItem>

      <HomeNavItem>
        <Link to="/countries" state={location}>
          <p>Списки локаций</p>

          <TextAccent>1 2 3</TextAccent>
        </Link>
      </HomeNavItem>

      <HomeNavItem>
        <Link to="/statistics" state={location}>
          <p>Статистика</p>

          <StatsList>
            <StatsListItem>
              <TextMedium>
                <span>Юзеры: </span>
                <TextMediumAccent as="span">103</TextMediumAccent>
              </TextMedium>
            </StatsListItem>

            <StatsListItem>
              <TextMedium>
                <span>Отельеры: </span>
                <TextMediumAccent as="span">75</TextMediumAccent>
              </TextMedium>
            </StatsListItem>
          </StatsList>
        </Link>
      </HomeNavItem>

      <HomeNavItem>
        <Link to="/admin-page-access" state={location}>
          Доступы в админку
        </Link>
      </HomeNavItem>
    </HomeNavListStyled>
  );
};

export default function Home() {
  return (
    <HomeStyled>
      <Container>
        <HomeNavList />
      </Container>
    </HomeStyled>
  );
}
