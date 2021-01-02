import React from 'react';
import { oneOfType, string, func, object, array } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useLayout } from '../hooks';
import { colors } from '../utils';

const ModalOverlay = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex
  align-items: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${colors.$white};
  border: 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 0.8s;
  animation-timing-function: cubic-bezier(0.4, 1, 0.5, 1);
  width: 100%;
  max-width: 500px;
  @media only screen and (max-width: 568px) {
    max-width: 25rem;
  }
  @keyframes animatetop {
    from {
      top: -10vh;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const ModalHeaderTitle = styled.h3`
  margin: 0;
  font-weight: 600;
`;

const ModalCloseButton = styled.div`
  color: black;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding: 1rem;
`;

const ModalFooter = styled.div`
  padding: 1rem;
`;

const ModalDivider = styled.span`
  border: 1px solid ${colors.$gray20};
`;

const Modal = () => {
  const { layout, setLayout } = useLayout();

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalHeaderTitle>Modal Title</ModalHeaderTitle>
          <ModalCloseButton>
            <FontAwesomeIcon icon={faTimes} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalDivider />
        <ModalBody>
          Hello, this is some example content for the Modal Body Hello, this is
          some example content for the Modal Body Hello, this is some example
          content for the Modal Body Hello, this is some example content for the
          Modal Body Hello, this is some example content for the Modal Body
        </ModalBody>
        <ModalDivider />

        <ModalFooter>
          Hello, this is some example content for the Modal Body Hello, this is
          some example content for the Modal Body Hello, this is some example
          content for the Modal Body
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
