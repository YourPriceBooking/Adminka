import { Container } from 'components/shared/Container';
import { useTypedLocation } from 'hooks/navigation';
import { routes } from 'routes/AppRouter';
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
  const location = useTypedLocation();
  const newLocation = { from: location };

  return (
    <HomeNavListStyled>
      <HomeNavItem>
        <Link to={routes.verification.path} state={newLocation}>
          <p>{routes.verification.name}</p>

          <TextSmall>10781 в очереди</TextSmall>
        </Link>
      </HomeNavItem>

      <HomeNavItem>
        <Link to={routes.translators.path} state={newLocation}>
          <p>{routes.translators.name}</p>

          <TextNormal>7741 перевод в очереди</TextNormal>
        </Link>
      </HomeNavItem>

      <HomeNavItem>
        <Link to={routes.country.path} state={newLocation}>
          <p>Языки</p> {/* Languages Мови */}
          <p>{routes.country.name}</p> {/* Countries Країни */}
          <p>Списки локаций</p> {/* Locations */}
          <TextAccent>1 2 3</TextAccent>
        </Link>
      </HomeNavItem>

      <HomeNavItem>
        <Link to={routes.statistics.path} state={newLocation}>
          <p>{routes.statistics.name}</p>

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
        <Link to={routes.adminPageAccess.path} state={newLocation}>
          {routes.adminPageAccess.name}
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
