import React, { useState } from 'react';
import { oneOfType, string, func, object, array } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { colors } from '../utils';
import { useTheme } from '../hooks';

const ModalOverlay = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  justify-content: center;
  overflow: hidden;
  display: ${({ show }) => (show === true ? 'flex' : 'none')};
  background-color: ${({ theme }) =>
    theme === 'light' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(200, 200, 200, 0.05)'};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  color: ${({ theme }) =>
    theme === 'light' ? colors.$gray50 : colors.$gray20};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$white : colors.$gray60};
  line-height: 22px;
  border-style: solid;
  border-width: 2px 2px 5px;
  border-radius: 10px;
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$gray50 : colors.$black};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(0.4, 1, 0.5, 1);
  width: 100%;
  max-width: 33rem;
  @media only screen and (max-width: 568px) {
    max-width: 29rem;
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
  &:before {
    content: '';
    position: absolute;
    top: 100%;
    left: 90%;
    margin-left: -1.2rem;
    bottom: 100%;
    border: 13px solid transparent;
    border-top-color: ${({ theme }) =>
      theme === 'light' ? colors.$gray50 : colors.$black};
  }
  &:after {
    content: ' ';
    position: absolute;
    top: 100%;
    left: 90%;
    margin-left: -1rem;
    border-width: 10px;
    border-style: solid;
    border-color: ${({ theme }) =>
      theme === 'light'
        ? `${colors.$white}  transparent transparent transparent`
        : `${colors.$gray60} transparent transparent transparent`};
  }
`;

export const ModalDivider = styled.span`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$gray10 : colors.$gray70};
`;

const ModalHeaderTitle = styled.h3`
  margin: 0;
  font-weight: 600;
  color: ${({ theme }) =>
    theme === 'light' ? colors.$gray60 : colors.$gray10};
`;

const ModalCloseButton = styled.span`
  color: ${({ theme }) => (theme === 'light' ? colors.$gray40 : colors.$dark)};
  font-size: 1.3rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$gray50 : colors.$black};
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

export const ModalBody = styled.div`
  padding: 1rem;
`;

export const ModalFooter = styled.div`
  padding: 1rem;
`;

const Modal = () => {
  const [showModal, setShowModal] = useState(true);
  const { theme } = useTheme();

  return (
    <ModalOverlay show={showModal} theme={theme}>
      <ModalContent theme={theme}>
        <ModalHeader>
          <ModalHeaderTitle theme={theme}>Modal Title</ModalHeaderTitle>
          <ModalCloseButton theme={theme} onClick={() => setShowModal(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalDivider theme={theme} />
        <ModalBody>
          Hello, this is some example content for the Modal Body Hello, this is
          some example content for the Modal Body Hello, this is some example
          content for the Modal Body Hello, this is some example content for the
          Modal Body Hello, this is some example content for the Modal Body
        </ModalBody>
        <ModalDivider theme={theme} />

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
