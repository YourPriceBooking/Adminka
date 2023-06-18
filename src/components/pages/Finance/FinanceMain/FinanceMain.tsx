import { Hoteliers } from 'components/pages/StatisticsPage/Hoteliers/Hoteliers';
import type { Dispatch} from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHoteliers } from 'features/hoteliers/hoteliersOperation';
import { selectorHoteliers } from 'features/hoteliers/hoteliersSelectors';
import { Spinner } from 'components/shared/Loader';
import s from './Finance.module.css';

export const FinanceMain: React.FC = () => {
  const g = "'";
const { hoteliers, isLoadingHoteliers } = useSelector(selectorHoteliers);
  // eslint-disable-next-line
  type DispatchAction = Dispatch<any>;
  const dispatch: DispatchAction = useDispatch();

  useEffect(() => {
    if (hoteliers.length > 0) return;
    dispatch(fetchHoteliers());
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div className={s.wrapper}>
      <div style={{ marginTop: '60px' }} className={s.mainDiv}>
        <div className={s.greenDiv}>
          <p className={s.greenP}>All statistic</p>
        </div>
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
            <span className={s.priseSpan}>750 876 USD</span>
            <span className={s.priseSpan}>25 879 USD</span>
            <span className={s.priseSpan}>25 879 USD</span>
            <span className={`${s.priseSpan} ${s.priseSpan3}`}>1 234 579 USD</span>
            <span className={`${s.priseSpan} ${s.priseSpan2}`}>4 579 USD</span>
            <span className={s.priseSpan}>34 579 USD</span>
          </div>
        </div>
      </div>
      {isLoadingHoteliers ? <Spinner/> : (hoteliers.length > 0 && <Hoteliers page='Finance'/>)}
    </div>
  );
};
