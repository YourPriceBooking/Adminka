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

interface HomeNavListInterface {
  users: number;
  hoteliers: number;
  agents: number;
  objects: number;
}

const HomeNavList = ({ users, hoteliers, agents, objects }: HomeNavListInterface) => {
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
          <p>Языки</p> {/* Languages Мови */}
          <p>Страны</p> {/* Countries Країни */}
          <p>Списки локаций</p> {/* Locations */}
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
                <TextMediumAccent as="span">{users}</TextMediumAccent>
              </TextMedium>
            </StatsListItem>

            <StatsListItem>
              <TextMedium>
                <span>Отельеры: </span>
                <TextMediumAccent as="span">{hoteliers}</TextMediumAccent>
              </TextMedium>
            </StatsListItem>

            <StatsListItem>
              <TextMedium>
                <span>Агенты: </span>
                <TextMediumAccent as="span">{agents}</TextMediumAccent>
              </TextMedium>
            </StatsListItem>

            <StatsListItem>
              <TextMedium>
                <span>Объекты: </span>
                <TextMediumAccent as="span">{objects}</TextMediumAccent>
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
        <HomeNavList users={10000} hoteliers={100} agents={2000} objects={3500} />
      </Container>
    </HomeStyled>
  );
}
