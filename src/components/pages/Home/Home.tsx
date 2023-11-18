import { memo, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch } from 'react';
import { getStatistic } from 'features/statistic/statisticSelectors';
import { Container } from 'components/shared/Container';
import { routes } from 'routes/routesConfig';
import { LoaderMiddleware } from 'components/shared/Loader/HomeLoader/LoaderMiddleware';
import { Link } from 'react-router-dom';
import { fetchStatistic } from 'features/statistic/statisticOperation';
import { haveAccess } from 'features/common';
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
  bookingOption: number;
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

const HomeNavList = ({ users, hoteliers, agents, objects, bookingOption }: HomeNavListInterface) => {
  type DispatchAction = Dispatch<any>;
  const dispatch: DispatchAction = useDispatch();
  const isHaveAccess = useSelector(haveAccess);

  useEffect(() => {
    dispatch(fetchStatistic());
  }, [dispatch]);

  const statItems = useMemo(
    () => [
      { text: { en: 'Users: ', ua: 'Користувачі: ', ru: 'Юзеры: ' }, data: users },
      { text: { en: 'Hoteliers: ', ua: 'Готельєри ', ru: 'Отельеры: ' }, data: hoteliers },
      { text: { en: 'Agents: ', ua: 'Агенти ', ru: 'Агенты: ' }, data: agents },
      { text: { en: 'Objects: ', ua: "Об'єкти ", ru: 'Объекты: ' }, data: objects },
      {
        text: { en: 'Booking Options:', ua: 'Варіанти бронювання', ru: 'Варианты бронирования:' },
        data: bookingOption,
      },
    ],
    [agents, hoteliers, objects, users, bookingOption]
  );

  return (
    <>
      <HomeNavListStyled>
        {!!isHaveAccess.includes('Objects Verification') || isHaveAccess.includes('all') ? (
          <LoaderMiddleware path={routes.verification.path.verification}>
            <p>{verification.name}</p>
            <TextSmall>
              <span>105</span> objects are waiting
            </TextSmall>
          </LoaderMiddleware>
        ) : null}

        {!!isHaveAccess.includes('Finance') || isHaveAccess.includes('all') ? (
          <LoaderMiddleware path={finance.path}>
            <p>{finance.name}</p>
          </LoaderMiddleware>
        ) : null}

        {!!isHaveAccess.includes('Adding a languages Adding a country`s Location registers') ||
        isHaveAccess.includes('all') ? (
          <LoaderMiddleware path={country.path}>
            <p>Adding a languages</p>
            <p>Adding a country&apos;s</p>
            <p>Location registers: 1, 2, 3</p>
          </LoaderMiddleware>
        ) : null}

        {!!isHaveAccess.includes('Statistics and access to cabinets') ||
        isHaveAccess.includes('all') ? (
          <LoaderMiddleware path={statistics.path}>
            <p>{statistics.name}</p>
            <StatsListMemoized items={statItems} />
          </LoaderMiddleware>
        ) : null}

        {
        isHaveAccess.includes('all') ? (
          <LoaderMiddleware path={routes.adminPageAccess.path}>
            {routes.adminPageAccess.name}
          </LoaderMiddleware>
        ) : null}

        {!!isHaveAccess.includes('Blog') || isHaveAccess.includes('all') ? (
          <LoaderMiddleware path={routes.blog.path}>{routes.blog.name}</LoaderMiddleware>
        ) : null}

        {!!isHaveAccess.includes('Mowgli Booking') || isHaveAccess.includes('all') ? (
          <LoaderMiddleware path={routes.mowgliBooking.path} type="mowgli">
            {routes.mowgliBooking.name}
          </LoaderMiddleware>
        ) : null}
      </HomeNavListStyled>
      <Link to={routes.registerModal.path}>Temporary link for Location Register Modal</Link>
    </>
  );
};

export const Home: React.FC = () => {
  const statistic = useSelector(getStatistic);

  const { result } = statistic;

  const { amount, amountOfObject, amountOfBookingOption } = result;
  const { users, hoteliers, agents } = amount;

  console.log(result)

  return (
    <HomeStyled>
      <Container>
        <HomeNavList
          users={users}
          hoteliers={hoteliers}
          agents={agents}
          objects={amountOfObject}
          bookingOption={amountOfBookingOption}
        />
      </Container>
    </HomeStyled>
  );
};
