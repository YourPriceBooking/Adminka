// import { Main } from './MowgliBookingFinanceMain.styled';

// export const MowgliBookingFinanceMain = () => (
  
//   <Main>
//     <p>Hello!</p>
//   </Main>
// );




// import type { Dispatch } from 'react';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { fetchHoteliers } from 'features/hoteliers/hoteliersOperation';
// import { selectorHoteliers } from 'features/hoteliers/hoteliersSelectors';
// import { selectorFinanceStatistic } from 'features/financeStatistic/financeSelectors';
// import { Spinner } from 'components/shared/Loader';
// import { fetchFinanceStatistic } from 'features/financeStatistic/financeOperation';
import { MowgliBookingHoteliers } from '../../MowgliBookingStatistics/MowgliBookingHotelier/MowgliBookingHotelier';
import s from './MowgliBookingFinanceMain.module.css';

export const MowgliBookingFinanceMain: React.FC = () => {
  const g = "'";
  // const { hoteliers, isLoadingHoteliers } = useSelector(selectorHoteliers);
  // const { finances, isLoadingFinance } = useSelector(selectorFinanceStatistic);
  // const {
  //   bonusFundsOnHoteliersAccounts,
  //   fundsOnHotelierAccounts,
  //   grossHotelRevens,
  //   hoteliersHavePaid,
  //   hoteliersPaidWithBonuses,
  //   refundsOfUnspentMoneyToHoteliers,
  // } = finances;
  // eslint-disable-next-line
  // type DispatchAction = Dispatch<any>;
  // const dispatch: DispatchAction = useDispatch();

  // useEffect(() => {
  //   if (hoteliers.length === 0) {
  //     dispatch(fetchHoteliers());
  //   }
  //   dispatch(fetchFinanceStatistic());
  //   // eslint-disable-next-line
  // }, [dispatch]);

  return (
    <div className={s.wrapper}>
      <div style={{ marginTop: '60px' }} className={s.mainDiv}>
        <div className={s.greenDiv}>
          <p className={s.greenP}>All statistic</p>
        </div>

        {/* // <Spinner /> */}

        <div className={s.containerDiv}>
          <div>
            <p className={s.descP}>Funds added to hotelier accounts:</p>
            <p className={s.descP}>Bonus funds added to hoteliers{g} accounts:</p>
            <p className={s.descP}>Refunds of unspent money to hoteliers:</p>
            <p className={`${s.descP} ${s.descP3}`}>Gross hotel revens:</p>
            <p className={`${s.descP} ${s.descP2}`}>
              Hoteliers paid for our services with bonuses:
            </p>
            <p className={s.descP}>Hoteliers have paid for our services:</p>
          </div>
          <div className={s.containerDivBox2}>
            <span className={s.priseSpan}>0,00 USD</span>
            <span className={s.priseSpan}>0,00 USD</span>
            <span className={s.priseSpan}>0,00 USD</span>
            <span className={`${s.priseSpan} ${s.priseSpan3}`}>0,00 USD</span>
            <span className={`${s.priseSpan} ${s.priseSpan2}`}>0,00 USD</span>
            <span className={s.priseSpan}>0,00 USD</span>
          </div>
        </div>
      </div>
      {/* {isLoadingHoteliers ? (
        <Spinner />
      ) : (
        hoteliers.length > 0 && <MowgliBookingHoteliers page="Finance" />
      )} */}
      <MowgliBookingHoteliers page="Finance" />
    </div>
  );
};
