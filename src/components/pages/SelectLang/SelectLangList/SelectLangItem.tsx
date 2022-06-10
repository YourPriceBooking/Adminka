import slang from '../SelectLang.module.scss';
import { Language } from 'types/apis';

type LanguageItemProps = Language & { selectLang: (arg: Language) => void };

export const LanguageItem = ({
  _id,
  lang,
  code,
  createdAt,
  updatedAt,
  selectLang,
}: LanguageItemProps) => {
  return (
    <li
      className={slang.block_lang_li}
      value={code}
      key={code}
      onClick={e => selectLang({ _id, lang, code, createdAt, updatedAt })}
    >
      {lang}
      <p className={slang.block_lang_li_p}>{code}</p>
    </li>
  );
};
