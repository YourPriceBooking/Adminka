import { Modal } from 'components/shared/Modal/Modal';
import { useModal, useSetActiveLanguage } from 'common/hooks';
import { useGetLanguagesQuery } from 'features/languages';
import { logRender } from 'common/utils';
import { ReactNode } from 'react';
import { ActiveLangButtonContainer } from './AdditionalItems';
import { LanguagesList } from './LanguagesList';
import { AddLanguageForm } from './AddLanguageForm';
import slang from './AddLanguages.module.scss';

type ModalContentProps = {
  closeModal: () => void;
};

const AddLanguageModalContent = ({ closeModal }: ModalContentProps) => {
  const setActiveLanguage = useSetActiveLanguage(closeModal);

  return (
    <div className={slang.container_add_lang}>
      <div className={slang.block_lang}>
        <LanguagesList setActiveLanguage={setActiveLanguage} />
      </div>

      <AddLanguageForm setActiveLanguage={setActiveLanguage} closeModal={closeModal} />
    </div>
  );
};

export const SelectLanguages = () => {
  const { showModal, openModal, closeModal } = useModal();

  logRender('SelectLanguages', undefined, true);

  const isModalOpen = showModal && (
    <Modal closeModal={closeModal}>
      <AddLanguageModalContent closeModal={closeModal} />
    </Modal>
  );

  return (
    <div>
      <ActiveLangButtonContainer openModal={openModal} />

      {isModalOpen}
    </div>
  );
};

export const AddLanguages = ({ children }: { children?: ReactNode }) => {
  useGetLanguagesQuery();

  return <div>{children}</div>;
};
