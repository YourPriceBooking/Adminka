import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'components/shared/Container';
// import {
//   selectLanguageList,
//   generateLanguage,
//   selectLocationObj,
// } from '../../Location/LocationSlicer';
// import { selectLanguage, generate } from '../ListSlicer'
import slang from './SelectLang.module.scss';

export default function SelectLang() {
  const dispatch = useDispatch();
  // const mainObj = useSelector(selectLocationObj);
  // const allLanguage = useSelector(selectLanguageList);
  // const activeLang = useSelector(selectLanguage);

  // const initialLang = ['English', 'Polska', 'Українска', 'Руска'];
  const testActiveLang = [{ landTex: 'English', language: 'en' }];
  const initialArrLang = [
    {
      selected: false,
      landTex: '',
      language: '',
      id: '',
      countries: [],
    },
  ];
  const initiallang1 = [
    {
      selected: true,
      landTex: 'Enlish',
      language: 'En',
      id: '',
      countries: [],
    },
    {
      selected: false,
      landTex: 'Ukraine',
      language: 'ua',
      id: '',
      countries: [],
    },
  ];

  const [language1, setLanguage1] = useState(initiallang1);
  const [language2, setLanguage2] = useState(...testActiveLang);
  const [language3, setLanguage3] = useState(initialArrLang);
  const [touch, setTouch] = useState(false);

  // useEffect(() => {
  //   dispatch(generateLanguage());
  // }, [dispatch]);

  // language1.map((el, i) => {
  //   if (el.landTex == 'l') {
  //     el.landTex = initialLang[i];
  //   }
  // });
  // useEffect(() => {
  //   setLanguage1(
  //     allLanguage.map(item => {
  //       if (item.language === activeLang) {
  //         return {
  //           selected: true,
  //           landTex: 'l',
  //           ...item,
  //         };
  //       }

  //       return {
  //         selected: false,
  //         landTex: 'l',
  //         ...item,
  //       };
  //     })
  //   );
  // }, [allLanguage, activeLang]);

  // const choooseLang = lang => {
  //   const activeLang = mainObj.filter(item => item.language === lang);
  //   dispatch(generate({ ...activeLang[0], countryid: activeLang[0].countries[0].id }));
  // };

  const selectLang = (el, item) => {
    el.preventDefault();
    setLanguage2(item);
    setTouch(false);
  };

  const onChange2 = ev => {
    setLanguage3([
      {
        ...language3[0],
        [ev.target.name]: ev.target.value,
      },
    ]);
  };

  const codeTouch = () => {
    setTouch(true);
  };
  const codeClose = () => {
    setLanguage1([...language1, ...language3]);
    setTouch(false);
    setLanguage3(initialArrLang);
  };
  // console.log(language1, '11111111');
  // console.log(language2, 'lang22');

  return (
    <>
      <Container>
        <h1>Language Page</h1>
        <div className={slang.lang_container} onClick={codeTouch}>
          <p className={slang.block_lang_p}>{language2.landTex}</p>
          <p className={slang.block_lang_p2}>{language2.language}</p>
          {/* <input
          type="text"
          name="language"
          className={slang.lang_block_input1}
          value={language2.landTex}
        /> */}

          {/* <select1
          className={slang.lang_block_select}
          onChange={(e) => {
            e.preventDefault()
            choooseLang(e.target.value)
          }}
        >
          {language.map((item, index) => {
            return (
              <option
                key={index}
                value={item.language}
                selected={item.selected}
              >
                {item.language}
              </option>
            )
          })}
        </select> */}
        </div>

        {touch && (
          <div className={slang.modal__backdrop}>
            <div className={slang.container_add_lang}>
              <div className={slang.block_lang}>
                <ul className={slang.block_lang_ul}>
                  {language1.map((item, index) => (
                    <li
                      className={slang.block_lang_li}
                      value={item.language}
                      key={index}
                      onClick={e => selectLang(e, item)}
                    >
                      {item.landTex}
                      <p className={slang.block_lang_li_p}>{item.language}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={slang.block_add_lang_text}>
                <h5 className={slang.text_add_lang1}>
                  You can add a language, enter the name of the language in the original language
                  and its international designation
                </h5>
                <input
                  type="text"
                  name="landTex"
                  className={slang.lang_block_input2}
                  onChange={onChange2}
                  maxLength={20}
                  value={language3.landTex}
                />
                <h5 className={slang.text_add_lang2}>
                  name of the language in the original language
                </h5>
                <input
                  type="text"
                  name="language"
                  className={slang.lang_block_input3}
                  onChange={onChange2}
                  maxLength={5}
                  value={language3.language}
                />
                <h5 className={slang.text_add_lang3}>international designation</h5>
                <button
                  disabled={language3[0].landTex && language3[0].language !== '' ? false : true}
                  className={
                    language3[0].landTex && language3[0].language !== ''
                      ? slang.language_btn_style_open
                      : slang.language_btn_style_disable
                  }
                  onClick={codeClose}
                >
                  Add language
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
