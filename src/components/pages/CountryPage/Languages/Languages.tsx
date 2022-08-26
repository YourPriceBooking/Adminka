import { Modal } from 'components/shared/Modal/Modal';
import { useModal, useSetActiveLanguage } from 'common/hooks';
import { chooseLanguage, selectEnglishLanguageId, useGetLanguagesQuery } from 'features/languages';
import { ReactNode, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import { ActiveLangButtonContainer } from './AdditionalItems';
import { LanguagesList } from './LanguagesList';
import { AddLanguageForm } from './AddLanguageForm';
import slang from './Languages.module.scss';

type ModalContentProps = {
  closeModal: () => void;
};

const LanguageModalContent = ({ closeModal }: ModalContentProps) => {
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

  const isModalOpen = showModal && (
    <Modal closeModal={closeModal}>
      <LanguageModalContent closeModal={closeModal} />
    </Modal>
  );

  return (
    <div>
      <ActiveLangButtonContainer openModal={openModal} />

      {isModalOpen}
    </div>
  );
};

export const Languages = ({ children }: { children?: ReactNode }) => {
  useGetLanguagesQuery();

  const appDispatch = useAppDispatch();
  const englishId = useAppSelector(selectEnglishLanguageId);
  const isDefaultSelected = useRef(false);

  useEffect(() => {
    if (isDefaultSelected.current || !englishId) return;
    appDispatch(chooseLanguage(englishId));

    isDefaultSelected.current = true;
  }, [appDispatch, englishId]);

  return <div>{children}</div>;
};
