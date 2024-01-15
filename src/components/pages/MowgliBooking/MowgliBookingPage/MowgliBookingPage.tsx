import { routes } from 'routes/routesConfig';
import { Link } from 'react-router-dom';
// import { LoaderMiddleware } from 'components/shared/Loader/HomeLoader/LoaderMiddleware';
import { useAppSelector } from 'App';
import { getCountVerification } from 'features/verification/verificationSelectors';
import {
  MowgliList,
  MowgListBlock,
  MowgliBookingMainPage,
  StaticBlock,
  StaticLine,
  VerificationList,
} from './MowgliBookingPage.styled';

// console.log(routes)

export const MowgliBookingPage = () => {
  const countVerification = useAppSelector(getCountVerification);

  return (
    <MowgliBookingMainPage>
      <MowgliList>
        <MowgListBlock>
          <Link to={routes.mowgliBookingVerif.path} style={{ color: 'inherit' }}>
            {/* <div>
          <CustomLoaderMiddleware path={routes.verification.path.verificationId}> */}
            <h1>Objects Verification</h1>
            <VerificationList>
              <span>{countVerification.amountOnVerification}</span> <p> objects are waiting </p>
            </VerificationList>
            {/* </CustomLoaderMiddleware>
        </div> */}
          </Link>
        </MowgListBlock>
        <Link to={routes.mowgliBookingFinance.path} style={{ color: 'inherit' }}>
          <MowgListBlock>
            <h1>Finance</h1>
          </MowgListBlock>
        </Link>
      </MowgliList>
      <MowgliList>
        <MowgListBlock>
          <Link to={routes.mowgliBookingStatistics.path} style={{ color: 'inherit' }}>
            <h1>Statistics and access to cabinets</h1>
            <StaticBlock>
              <StaticLine>
                <p>Users:</p>
                <span>0</span>
              </StaticLine>
              <StaticLine>
                <p>Hoteliers:</p>
                <span>0</span>
              </StaticLine>
              <StaticLine>
                <p>Objects:</p>
                <span>0</span>
              </StaticLine>
              <StaticLine>
                <p>Booking Options:</p>
                <span>0</span>
              </StaticLine>
            </StaticBlock>
          </Link>
        </MowgListBlock>
        <MowgListBlock>
          <h1>Blog</h1>
        </MowgListBlock>
      </MowgliList>
    </MowgliBookingMainPage>
  );
};
