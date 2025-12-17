import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import { Modal } from 'components/shared/Modal';
import { useModal } from 'common/hooks';
import {
  Wrapper,
  Btn,
  Text,
  BtnWrapper,
  ModalContainer,
  ModalContent,
  VerifierInfoContainer,
  TexInfo,
  IconWrapper,
} from './Verifier.styled';
import { fetchHistoryVerifierId } from 'features/verification/verificationOperation';
import {
  getHistoryByVerifierId,
  getHistoryByVerifierIdError,
  getHistoryByVerifierIdLoading,
} from 'features/verification/verificationSelectors';
import verifierHistoryModalIcon from '../../../../../../assets/icons/verifierHistoryModalIcon.svg';

// const VerifierModalContent = () => (

// )

export const Verifier = () => {
  const { showModal, openModal, closeModal } = useModal();
  const dispatch = useAppDispatch();

  const history = useAppSelector(getHistoryByVerifierId);
  const isHistoryLoading = useAppSelector(getHistoryByVerifierIdLoading);
  const historyError = useAppSelector(getHistoryByVerifierIdError);
  const email = useAppSelector(state => state.auth.email);

  useEffect(() => {
    if (!showModal) return;
    dispatch(fetchHistoryVerifierId());
  }, [dispatch, showModal]);

  const isModalOpen = showModal && (
    <Modal closeModal={closeModal}>
      <ModalContainer>
        <VerifierInfoContainer>
          <TexInfo>
            <p>Verifier ID {history?.[0]?.verifierId}</p>
            <p>{email}</p>
          </TexInfo>
          <IconWrapper>
            <img src={verifierHistoryModalIcon} alt="Verifier avatar" />
          </IconWrapper>
        </VerifierInfoContainer>
        <h1>Verified / Not Verified objects</h1>
        <ModalContent>
          {isHistoryLoading && <p>Loading...</p>}
          {!isHistoryLoading && !!historyError && <p>Failed to load history</p>}
          <table>
            {!isHistoryLoading &&
              Array.isArray(history) &&
              history.map(item => (
                <tr key={item._id}>
                  <td>ID {item.hotels}</td>
                  <td>{item.objectName}</td>
                  <td className="date">{new Date(item.getToVerify).toLocaleDateString()}</td>
                  <td className={item.decision === 'verified' ? 'active' : undefined}>
                    {item.decision}
                  </td>
                </tr>
              ))}
          </table>
          {!isHistoryLoading && Array.isArray(history) && history.length === 0 && <p>No history</p>}
        </ModalContent>
      </ModalContainer>
    </Modal>
  );



  return (
    <>
      <Wrapper>
        <Text>
          <p>Verifier ID {history?.[0]?.verifierId}</p>
          <p>{email}</p>
        </Text>
        <BtnWrapper>
          <Btn type="button" onClick={openModal}>
            Verified / Not Verified objects
          </Btn>
          <Btn type="button">Agreement with the Verifier</Btn>
        </BtnWrapper>
      </Wrapper>
      {isModalOpen}
    </>
  );
};
