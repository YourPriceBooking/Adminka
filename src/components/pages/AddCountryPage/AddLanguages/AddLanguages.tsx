import { Modal } from 'components/shared/Modal/Modal';
import { useModal, useSetActiveLanguage } from 'common/hooks';
import { useGetLanguagesQuery } from 'features/languages';
import { logRender } from 'common/utils';
import { ReactNode } from 'react';

import slang from './AddLanguages.module.scss';
import { AddLanguageForm } from './AddLanguageForm/AddLanguageForm';
import { SelectLangList } from './SelectLangList/SelectLangList';
import { ActiveLangButtonContainer } from './AdditionalItems';

type ModalContentProps = {
  closeModal: () => void;
};

const AddLanguageModalContent = ({ closeModal }: ModalContentProps) => {
  const setActiveLanguage = useSetActiveLanguage(closeModal);

  return (
    <div className={slang.container_add_lang}>
      <div className={slang.block_lang}>
        <SelectLangList setActiveLanguage={setActiveLanguage} />
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
