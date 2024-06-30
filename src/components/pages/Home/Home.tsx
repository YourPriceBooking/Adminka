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
import { fetchObjectTypes, fetchVerification } from 'features/verification/verificationOperation';
import { useAppSelector } from 'App';
import { getCountVerification } from 'features/verification/verificationSelectors';
import { getVerifyObjects } from 'features/verifyObjects/verifyObjectsSelectors';
import { fetchVerifyObjects } from 'features/verifyObjects/verifyObjectsOperation';
import { getBookingOptions } from 'features/bookingOptions/bookingOptionsSelectors';
import { fetchBookingOptions } from 'features/bookingOptions/bookingOptionsOperations';
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
  bookingOptions: number;
};

type StatItem = {
  text: {
    en: string;
    ua: string;
    ru: string;
  };
  data: string | number | null;
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
          <TextMediumAccent as="span">{data === null ? 'None' : data}</TextMediumAccent>
        </TextMedium>
      </StatsListItem>
    ))}
  </StatsListStyled>
);

const StatsListMemoized = memo(StatsList);

const HomeNavList = ({
  users,
  hoteliers,
  agents,
  objects,
  bookingOptions,
}: HomeNavListInterface) => {
  type DispatchAction = Dispatch<any>;
  const dispatch: DispatchAction = useDispatch();

  const isHaveAccess = useSelector(haveAccess);
  const countVerification = useAppSelector(getCountVerification);

  useEffect(() => {
    dispatch(fetchStatistic());
    dispatch(fetchVerification());
    dispatch(fetchObjectTypes());
    dispatch(fetchBookingOptions());
  }, [dispatch]);

  const statItems = useMemo(
    () => [
      { text: { en: 'Users: ', ua: 'Користувачі: ', ru: 'Юзеры: ' }, data: users },
      { text: { en: 'Hoteliers: ', ua: 'Готельєри ', ru: 'Отельеры: ' }, data: hoteliers },
      { text: { en: 'Agents: ', ua: 'Агенти ', ru: 'Агенты: ' }, data: agents },
      { text: { en: 'Objects: ', ua: "Об'єкти ", ru: 'Объекты: ' }, data: objects },
      {
        text: { en: 'Booking Options:', ua: 'Варіанти бронювання', ru: 'Варианты бронирования:' },
        data: bookingOptions,
      },
    ],
    [agents, hoteliers, objects, users, bookingOptions]
  );

  return (
    <>
      <HomeNavListStyled>
        {!!isHaveAccess.includes('Objects Verification') || !!isHaveAccess.includes('all') ? (
          <LoaderMiddleware path={routes.verification.path.verification}>
            <p>{verification.name}</p>
            <TextSmall>
              Objects added <span>{countVerification.amountOfAdded}</span>
            </TextSmall>
            <TextSmall>
              Objects on verif <span>{countVerification.amountOnVerification}</span>
            </TextSmall>
          </LoaderMiddleware>
        ) : null}

        {!!isHaveAccess.includes('Finance') || !!isHaveAccess.includes('all') ? (
          <LoaderMiddleware path={finance.path}>
            <p>{finance.name}</p>
          </LoaderMiddleware>
        ) : null}

        {!!isHaveAccess.includes('Adding a languages Adding a country`s Location registers') ||
        !!isHaveAccess.includes('all') ? (
          <LoaderMiddleware path={country.path}>
            <p>Adding a languages</p>
            <p>Adding a country&apos;s</p>
            <p>Location registers: 1, 2, 3</p>
          </LoaderMiddleware>
        ) : null}

        {!!isHaveAccess.includes('Statistics and access to cabinets') ||
        !!isHaveAccess.includes('all') ? (
          <LoaderMiddleware path={statistics.path}>
            <p>{statistics.name}</p>
            <StatsListMemoized items={statItems} />
          </LoaderMiddleware>
        ) : null}

        {!!isHaveAccess.includes('Access to the administrative directory') ||
        !!isHaveAccess.includes('all') ? (
          <LoaderMiddleware path={routes.adminPageAccess.path}>
            {routes.adminPageAccess.name}
          </LoaderMiddleware>
        ) : null}

        {!!isHaveAccess.includes('Blog') || !!isHaveAccess.includes('all') ? (
          <LoaderMiddleware path={routes.blog.path}>{routes.blog.name}</LoaderMiddleware>
        ) : null}

        {!!isHaveAccess.includes('Mowgli Booking') || !!isHaveAccess.includes('all') ? (
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
  const bookingOptions = useSelector(getBookingOptions);
  const verifyObjects = useSelector(getVerifyObjects);
  const bookingOptionsAmount = bookingOptions.result || 0;
  const verifyObjectsAmount = verifyObjects.amountObject || 0;

  const { result } = statistic;

  const { amount } = result;
  const { users, hoteliers, agents } = amount;

  type DispatchAction = Dispatch<any>;
  const dispatch: DispatchAction = useDispatch();

  useEffect(() => {
    dispatch(fetchVerifyObjects());
  }, []);

  return (
    <HomeStyled>
      <Container>
        <HomeNavList
          users={users}
          hoteliers={hoteliers}
          agents={agents}
          objects={verifyObjectsAmount}
          bookingOptions={bookingOptionsAmount}
        />
      </Container>
    </HomeStyled>
  );
};
