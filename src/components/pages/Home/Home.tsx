import { memo, useMemo} from 'react';
import { Container } from 'components/shared/Container';
import { routes } from 'routes/routesConfig';
import { LoaderMiddleware } from 'components/shared/Loader/HomeLoader/LoaderMiddleware';
import { Link } from 'react-router-dom';
import {
  HomeStyled,
  HomeNavListStyled,
  TextSmall,
  StatsListStyled,
  StatsListItem,
  TextMedium,
  TextMediumAccent,
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
    <>
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
        <LoaderMiddleware path={routes.blog.path}>{routes.blog.name}</LoaderMiddleware>
        <LoaderMiddleware path={routes.mowgliBooking.path} type='mowgli'>
          {routes.mowgliBooking.name}
        </LoaderMiddleware>
      </HomeNavListStyled>
      <Link to={routes.registerModal.path}>Тимчасовий лінк для Location Register Modal</Link>
    </>
  );
};

export const Home = () => (
  <HomeStyled>
    <Container>
      <HomeNavList users={103} hoteliers={75} agents={75} objects={75} />

    </Container>
  </HomeStyled>
);
