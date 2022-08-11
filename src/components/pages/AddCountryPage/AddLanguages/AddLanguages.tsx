import type { SelectLanguageType } from 'types/apis';
import { useAppSelector } from 'hooks/redux';
import { Modal } from 'components/shared/Modal/Modal';
import { selectActiveLang } from 'redux/slices';
import { useGetLanguagesQuery } from 'redux/apis';
import { useModal } from 'hooks/ui/modal';
import { useSelectLanguage } from 'hooks/ui/language';
import slang from './AddLanguages.module.scss';
import { AddLanguageForm } from './AddLanguageForm/AddLanguageForm';
import { SelectLangList } from './SelectLangList/SelectLangList';
import { ShowLanguagesButton } from './AddLanguages.styled';

const ButtonLabel = ({ activeLanguage }: { activeLanguage: SelectLanguageType }) => (
  <>
    <p className={slang.block_lang_p}>{activeLanguage.lang}</p>
    <p className={slang.block_lang_p2}>{activeLanguage.code}</p>
  </>
);

type ButtonSelectLanguageType = {
  openModal: () => void;
  activeLanguage: SelectLanguageType;
};

const ButtonSelectLanguage = ({ openModal, activeLanguage }: ButtonSelectLanguageType) => (
  <ShowLanguagesButton onClick={openModal} type="button">
    {activeLanguage.code ? (
      <ButtonLabel activeLanguage={activeLanguage} />
    ) : (
      <p className={slang.block_lang_p}>Select language</p>
    )}
  </ShowLanguagesButton>
);

export const SelectLang = () => {
  const {
    data: languages,
    isLoading: isLoadingLanguagesFirstTime,
    isFetching,
    refetch,
  } = useGetLanguagesQuery();
  const isLoading = isLoadingLanguagesFirstTime || isFetching;
  const activeLanguage = useAppSelector(selectActiveLang);

  const { showModal, openModal, closeModal } = useModal();
  const selectLang = useSelectLanguage(refetch, closeModal);

  return (
    <>
      <div className={slang.lang_container}>
        <ButtonSelectLanguage activeLanguage={activeLanguage} openModal={openModal} />
      </div>

      {showModal && (
        <Modal closeModal={closeModal}>
          <div className={slang.container_add_lang}>
            <div className={slang.block_lang}>
              <SelectLangList languages={languages} selectLang={selectLang} />
            </div>

            <AddLanguageForm
              selectLang={selectLang}
              closeModal={closeModal}
              isLoading={isLoading}
            />
          </div>
        </Modal>
      )}
    </>
  );
};
