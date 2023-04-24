import useCopyToClipboard from 'common/hooks/ui/forms/useCopyToClipboard';
import { UrlDirButton } from 'components/shared/Buttons';
import { Dispatch, FC, SetStateAction } from 'react';
import s from './index.module.scss'

type TModalProps = {
  setActive: Dispatch<SetStateAction<boolean>>
  name: string
}

const Modal: FC<TModalProps> = (props: TModalProps): JSX.Element => {
  const { setActive, name } = props
  const [value, copy] = useCopyToClipboard()
  const url = '123456789123456789123456789123456789123456'
  const array = [1, 2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 1]

  return (
      <div className={s.modal}>
          <svg
            className={s.imageClose}
            onClick={() => setActive(false)} width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.0898 0L17.0898 34.1797M34.1797 17.0898L0 17.0898" stroke="#FFFFFF" strokeWidth="2"/>
          </svg>
          <div className={s.modal__window}>
            <div className={s.infoButton}>
              <UrlDirButton variable='purple'>
                  Add Dir <br />
                  Hotelier
              </UrlDirButton>
            </div>
            <span className={s.name}>{name}</span>
              {
                array.map((_, index: number) => (
                  <div key={index} className={s.url__item}>
                      <button
                        type='button'
                        className={value.copiedValue === url + index ? value.isCopied ? 
                          `${s.copy__btn_true} ${s.copy__btn}` :
                          `${s.copy__btn} ${s.copy__btn_false}` :
                          `${s.copy__btn}`
                        }
                        onClick={() => copy(url + index)}
                      >
                          {value.copiedValue === url + index ? value.isCopied ? 'True' : 'False' : 'Copy'}
                        </button>
                      <p className={s.url}>
                        {`${url.substring(0, 38)}...`}
                      </p>
                  </div>
                ))
              }
            <button type='button' className={s.copy__all_btn}>Copy all 12 links</button>
          </div>
      </div>
  );
}

export default Modal