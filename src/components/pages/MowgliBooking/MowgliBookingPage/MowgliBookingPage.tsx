
// import { routes } from 'routes/routesConfig';
import {
  MowgliList,
  MowgListBlock,
  MowgliBookingMainPage,
  StaticBlock,
  StaticLine,
  VerificationList,
} from './MowgliBookingPage.styled';


// console.log(routes)

export const MowgliBookingPage = () => (
  <MowgliBookingMainPage>
    <MowgliList>
      <MowgListBlock>
        <h1>Objects Verification</h1>
        <VerificationList>
          <span>105</span> <p> objects are waiting </p>
        </VerificationList>
      </MowgListBlock>
      <MowgListBlock>
        <h1>Finance</h1>
      </MowgListBlock>
    </MowgliList>
    <MowgliList>
      <MowgListBlock>
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
      </MowgListBlock>
      <MowgListBlock>
        <h1>Blog</h1>
      </MowgListBlock>
    </MowgliList>
  </MowgliBookingMainPage>
);
