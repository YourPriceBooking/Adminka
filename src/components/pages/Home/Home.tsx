import { Container } from 'components/shared/Container';
// import { useFromLocation } from 'common/hooks';
import { memo, useMemo, useState } from 'react';
import { routes } from 'routes/routesConfig';
import SuspenseLoader from 'components/shared/Loader/SuspenseLoader/SuspenseLoader';

import {
  HomeStyled,
  HomeNavListStyled,
  HomeNavItem,
  TextSmall,
  StatsListStyled,
  StatsListItem,
  TextMedium,
  TextMediumAccent,
  Wrapper,
} from './Home.styled';

const { verification, finance, statistics, country } = routes;

type HomeNavListInterface = {
  users: number;
  hoteliers: number;
  agents: number;
  objects: number;
};

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
    {items.map(({ text, data }) => (
      <StatsListItem key={text.en}>
        <TextMedium as="div">
          <p>{text.en}</p>
          <TextMediumAccent as="span">{data}</TextMediumAccent>
        </TextMedium>
      </StatsListItem>
    ))}
  </StatsListStyled>
);

const StatsListMemoized = memo(StatsList);

type IProps = {
  children: React.ReactNode;
  path: string;
};

const LoaderMiddleware: React.FC<IProps> = ({ children, path }) => {
    // const from = useFromLocation();
    // const newLocation = useMemo(() => ({ from }), [from]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.replace(path);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <HomeNavItem onClick={handleClick} >
      <Wrapper>{isLoading ? <SuspenseLoader /> : children}</Wrapper>
    </HomeNavItem>
  );
};




const HomeNavList = ({ users, hoteliers, agents, objects }: HomeNavListInterface) => {


  const statItems = useMemo(
    () => [
      { text: { en: 'Users: ', ua: 'Користувачі: ', ru: 'Юзеры: ' }, data: users },
      { text: { en: 'Hoteliers: ', ua: 'Готельєри ', ru: 'Отельеры: ' }, data: hoteliers },
      { text: { en: 'Agents: ', ua: 'Агенти ', ru: 'Агенты: ' }, data: agents },
      { text: { en: 'Objects: ', ua: "Об'єкти ", ru: 'Объекты: ' }, data: objects },
      {
        text: { en: 'Booking Options:', ua: 'Варіанти бронювання', ru: 'Варианты бронирования:' },
        data: objects,
      },
    ],
    [agents, hoteliers, objects, users]
  );


  return (
    <HomeNavListStyled>
      <LoaderMiddleware path={routes.verification.path.verification}>
        <p>{verification.name}</p>
        <TextSmall>
          <span>105</span>objects are waiting
        </TextSmall>
      </LoaderMiddleware>
      <LoaderMiddleware path={finance.path}>
        <p>{finance.name}</p>
      </LoaderMiddleware>
      <LoaderMiddleware path={country.path}>
        <p>Adding a languages</p> {/* Languages Мови */}
        <p>Adding a country&apos;s</p> {/* Countries Країни */}
        <p>Location registers: 1, 2, 3</p> {/* Locations */}
      </LoaderMiddleware>
      <LoaderMiddleware path={statistics.path}>
        <p>{statistics.name}</p>
        <StatsListMemoized items={statItems} />
      </LoaderMiddleware>
      <LoaderMiddleware path={routes.adminPageAccess.path}>
        {routes.adminPageAccess.name}
      </LoaderMiddleware>
    </HomeNavListStyled>
  );
};

export const Home = () => (
    <HomeStyled>
      <Container>
      <HomeNavList users={103} hoteliers={75} agents={75} objects={75} />
      </Container>
    </HomeStyled>
  );
