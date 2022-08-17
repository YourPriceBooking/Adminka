import { Modal } from 'components/shared/Modal/Modal';
import { useModal, useSetActiveLanguage } from 'common/hooks';
import { logRender } from 'common/utils';
import { useGetLanguagesQuery } from 'features/languages';
import slang from './AddLanguages.module.scss';
import { AddLanguageForm } from './AddLanguageForm/AddLanguageForm';
import { SelectLangList } from './SelectLangList/SelectLangList';
import { ActiveLangButtonContainer } from './AdditionalItems';

type ModalContentProps = {
  closeModal: () => void;
};

const AddLanguageModalContent = ({ closeModal }: ModalContentProps) => {
  const setActiveLanguage = useSetActiveLanguage(closeModal);

  logRender('AddLanguageModalContent');
  return (
    <div className={slang.container_add_lang}>
      <div className={slang.block_lang}>
        <SelectLangList setActiveLanguage={setActiveLanguage} />
      </div>

      <AddLanguageForm setActiveLanguage={setActiveLanguage} closeModal={closeModal} />
    </div>
  );
};

const SelectLanguages = () => {
  const { showModal, openModal, closeModal } = useModal();

  logRender('SelectLanguages');
  return (
    <>
      <ActiveLangButtonContainer openModal={openModal} />

      {showModal && (
        <Modal closeModal={closeModal}>
          <AddLanguageModalContent closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export const AddLanguages = () => {
  useGetLanguagesQuery();
  return <SelectLanguages />;
};
