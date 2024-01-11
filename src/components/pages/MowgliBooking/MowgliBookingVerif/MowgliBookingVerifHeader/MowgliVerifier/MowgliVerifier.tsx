
import { Modal } from 'components/shared/Modal';
import { useModal } from 'common/hooks';
import {
  Wrapper,
  Btn,
  Text,
  BtnWrapper,
  ModalContainer,
  ModalContent,
} from './MowgliVerifier.styled';

export const MowgliVerifier = () => {
    const { showModal, openModal, closeModal } = useModal();

    const isModalOpen = showModal && (
        <Modal closeModal={closeModal}>
            <ModalContainer>
                <h1>Verified / Not Verified objects</h1>
                <ModalContent>
                    <table>
                        <tr>
                            <td>ID 1123467LON</td>
                            <td>Hilton</td>
                            <td className="date">11/01/2024</td>
                            <td className="active">Verified</td>
                        </tr>
                        <tr>
                            <td>ID 7874567GHV</td>
                            <td>Hilton</td>
                            <td className="date">12/01/2024</td>
                            <td>Not Verified</td>
                        </tr>
                    </table>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );


    return (
        <>
            <Wrapper>
                <Text>
                    <p>Verifier ID 00001</p>
                    <p>examplemail@gmail.com</p>
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
