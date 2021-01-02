import React, { useState } from 'react';
import {
  AccountModal,
  Modal,
  ModalDialog,
  ModalContent,
  ModalScreenReaderText,
  ModalDivider,
  ModalHeader,
  ModalCloseButton,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Header,
  WalletModal,
  Web3ReactManager,
} from './components';
import { useTheme } from './hooks';

const App = () => {
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="App">
      <Header />
      <WalletModal />
      <AccountModal />
      <Modal
        theme={theme}
        id="Modal"
        show={showModal}
        ariaDescribedBy="Modal__ModalTitle"
      >
        <ModalDialog>
          <ModalContent id="yo">
            <ModalScreenReaderText id="Modal__ModalScreenReaderText">
              This is some Screen Reader text
            </ModalScreenReaderText>
            <ModalHeader>
              <ModalTitle id="Modal__ModalTitle">Modal Title</ModalTitle>
              <ModalCloseButton onClick={() => setShowModal(false)} />
            </ModalHeader>
            <ModalDivider />
            <ModalBody>
              Hello, this is some example content for the Modal Body Hello, this
              is some example content for the Modal Body Hello, this is some
              example content for the Modal Body Hello, this is some example
              content for the Modal Body Hello, this is some example content for
              the Modal Body
            </ModalBody>
            <ModalFooter>
              Hello, this is some example content for the Modal Body for. <br />
              <small style={{ color: 'pink' }}>This is some small text</small>
            </ModalFooter>
          </ModalContent>
        </ModalDialog>
      </Modal>
      <Web3ReactManager>
        <small>connected</small>
      </Web3ReactManager>
    </div>
  );
};

export default App;
