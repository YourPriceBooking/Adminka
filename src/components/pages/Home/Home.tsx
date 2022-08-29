import { Container } from 'components/shared/Container';
import { useFromLocation } from 'common/hooks';
import { memo, useMemo } from 'react';
import { routes } from 'routes/routesConfig';

import {
  HomeStyled,
  HomeNavListStyled,
  HomeNavItem,
  Link,
  TextSmall,
  TextNormal,
  TextAccent,
  StatsListStyled,
  StatsListItem,
  TextMedium,
  TextMediumAccent,
} from './Home.styled';

const { verification, translators, statistics, country } = routes;

interface HomeNavListInterface {
  users: number;
  hoteliers: number;
  agents: number;
  objects: number;
}

type StatItem = {
  text: {
    en: string;
    ua: string;
    ru: string;
  };
  data: string | number;
};

type StatsListType = {
  items: StatItem[];
};

const StatsList = ({ items }: StatsListType) => (
  <StatsListStyled>
    {items?.map(({ text, data }) => (
      <StatsListItem key={text.en}>
        <TextMedium>
          <span>{text.ru}</span>
          <TextMediumAccent as="span">{data}</TextMediumAccent>
        </TextMedium>
      </StatsListItem>
    ))}
  </StatsListStyled>
);

const StatsListMemoized = memo(StatsList);

const HomeNavList = ({ users, hoteliers, agents, objects }: HomeNavListInterface) => {
  const from = useFromLocation();
  const newLocation = useMemo(() => ({ from }), [from]);
  const statItems = useMemo(
    () => [
      { text: { en: 'Users: ', ua: 'Користувачі: ', ru: 'Юзеры: ' }, data: users },
      { text: { en: 'Hoteliers: ', ua: 'Готельєри ', ru: 'Отельеры: ' }, data: hoteliers },
      { text: { en: 'Agents: ', ua: 'Агенти ', ru: 'Агенты: ' }, data: agents },
      { text: { en: 'Objects: ', ua: "Об'єкти ", ru: 'Объекты: ' }, data: objects },
    ],
    [agents, hoteliers, objects, users]
  );

  return (
    <HomeNavListStyled>
      <HomeNavItem>
        <Link to={verification.path} state={newLocation}>
          <p>{verification.name}</p>

          <TextSmall>10781 в очереди</TextSmall>
        </Link>
      </HomeNavItem>

      <HomeNavItem>
        <Link to={translators.path} state={newLocation}>
          <p>{translators.name}</p>

          <TextNormal>7741 перевод в очереди</TextNormal>
        </Link>
      </HomeNavItem>

      <HomeNavItem>
        <Link to={country.path} state={newLocation}>
          <p>Языки</p> {/* Languages Мови */}
          <p>{country.name}</p> {/* Countries Країни */}
          <p>Списки локаций</p> {/* Locations */}
          <TextAccent>1 2 3</TextAccent>
        </Link>
      </HomeNavItem>

      <HomeNavItem>
        <Link to={statistics.path} state={newLocation}>
          <p>{statistics.name}</p>

          <StatsListMemoized items={statItems} />
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

export const Home = () => (
  <HomeStyled>
    <Container>
      <HomeNavList users={10000} hoteliers={100} agents={2000} objects={3500} />
    </Container>
  </HomeStyled>
);
