import useCopyToClipboard from 'common/hooks/ui/forms/useCopyToClipboard';
import { UrlDirButton } from 'components/shared/Buttons';
import { Dispatch, FC, SetStateAction } from 'react';
import { Location } from 'types/addLocation';
import s from './index.module.scss'

type TModalProps = {
  setActive: Dispatch<SetStateAction<boolean>>;
  name: string;
  urls: Location[];
};

const Modal: FC<TModalProps> = (props: TModalProps): JSX.Element => {
  const { setActive, name, urls } = props
  const [value, copy] = useCopyToClipboard()

  return (
    <div className={s.modal}>
      <svg
        className={s.imageClose}
        onClick={() => setActive(false)}
        width="25"
        height="25"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.0898 0L17.0898 34.1797M34.1797 17.0898L0 17.0898"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
      </svg>
      <div className={s.modal__window}>
        <div className={s.infoButton}>
          <UrlDirButton variable="purple">
            Add Dir <br />
            Hotelier
          </UrlDirButton>
        </div>
        <span className={s.name}>{name}</span>
        {urls?.map((obj: Location) => (
          <div key={obj._id} className={s.url__item}>
            <button
              type="button"
              className={
                value.copiedValue === obj?.url
                  ? value.isCopied
                    ? `${s.copy__btn_true} ${s.copy__btn}`
                    : `${s.copy__btn} ${s.copy__btn_false}`
                  : `${s.copy__btn}`
              }
              onClick={() => copy(obj?.url)}
            >
              {value.copiedValue === obj?.url ? (value.isCopied ? 'True' : 'False') : 'Copy'}
            </button>
            <p className={s.url}>{`${obj?.url.substring(0, 38)}...`}</p>
          </div>
        ))}
        <button type="button" className={s.copy__all_btn}>
          Copy all 12 links
        </button>
      </div>
    </div>
  );
}

export default Modal