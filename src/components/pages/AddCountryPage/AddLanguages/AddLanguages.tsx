import { Modal } from 'components/shared/Modal/Modal';
import { useGetLanguagesQuery, useSelectLanguages } from 'redux/apis';
import { useModal } from 'hooks/ui/modal';
import { useSelectLanguage } from 'hooks/ui/language';
import type { LanguageWithoutCountries } from 'types/apis';
import { logRender } from 'common/utils';
import slang from './AddLanguages.module.scss';
import { AddLanguageForm } from './AddLanguageForm/AddLanguageForm';
import { SelectLangList } from './SelectLangList/SelectLangList';
import { ActiveLangButtonContainer } from './AdditionalItems';

type AddLanguageModalContentType = {
  closeModal: () => void;
  languages: LanguageWithoutCountries;
};

const AddLanguageModalContent = ({ closeModal, languages }: AddLanguageModalContentType) => {
  const selectLang = useSelectLanguage(closeModal);
  logRender('AddLanguageModalContent');
  return (
    <div className={slang.container_add_lang}>
      <div className={slang.block_lang}>
        <SelectLangList languages={languages} selectLang={selectLang} />
      </div>

      <AddLanguageForm selectLang={selectLang} closeModal={closeModal} />
    </div>
  );
};

type AddLanguagesProps = {
  languages: LanguageWithoutCountries;
};

const AddLanguages = ({ languages }: AddLanguagesProps) => {
  const { showModal, openModal, closeModal } = useModal();

  logRender('AddLanguages');
  return (
    <>
      <ActiveLangButtonContainer openModal={openModal} />

      {showModal && (
        <Modal closeModal={closeModal}>
          <AddLanguageModalContent closeModal={closeModal} languages={languages} />
        </Modal>
      )}
    </>
  );
};

export const LanguagesWithoutCountries = () => {
  useGetLanguagesQuery();
  const languages = useSelectLanguages();

  return <AddLanguages languages={languages} />;
};
