import React from 'react';
import { oneOfType, string, func, object, array, bool } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { colors } from '../utils';
import { useTheme } from '../hooks';

/*******************************************
      COMPONENT STYLINGS START HERE
********************************************/
const StyledModalFooter = styled.div`
  border-radius: 0 0 6px 6px;
`;

const StyledModalBody = styled.div``;

export const ModalDivider = styled.span`
  border-width: 1px;
  border-style: solid;
`;

const StyledModalCloseButton = styled.span`
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.25s;
  &:hover {
    transition: color 0.08s ease-in-out;
  }
`;

const StyledModalTitle = styled.h3`
  margin: 0;
  font-weight: 600;
`;

const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 6px 6px 0 0;
`;

const StyledModalScreenReaderText = styled.div`
  display: none;
`;

const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-style: solid;
  border-width: 2px 2px 5px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.39);
  animation-name: animatetop;
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(0.4, 1, 0.5, 1);
  width: 500px;
  min-height: 100%;
  transform: perspective(200px) translateY(0);
  @media only screen and (max-width: 568px) {
    width: 400px;
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
  }
  &:after {
    content: ' ';
    position: absolute;
    top: 100%;
    left: 90%;
    margin-left: -1rem;
    border-width: 10px;
    border-style: solid;
  }
`;

const StyledModal = styled.div`
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
    theme === 'light' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(150, 150, 150, 0.1)'};

  /**
    * Style all Modal children based on theme prop provided to Modal. This
    * allows us to only have to pass one theme prop to the base Modal instead of
    * to every component within the modal
    */
  ${StyledModalContent} {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$gray50 : colors.$gray20};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$white : colors.$gray60};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$gray50 : colors.$black};
    &:before {
      border-top-color: ${({ theme }) =>
        theme === 'light' ? colors.$gray50 : colors.$black};
    }
    &:after {
      border-color: ${({ theme }) =>
        theme === 'light'
          ? `${colors.$white}  transparent transparent transparent`
          : `${colors.$gray60} transparent transparent transparent`};
    }
  }

  ${StyledModalTitle} {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$gray60 : colors.$gray10};
  }

  ${StyledModalCloseButton} {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$gray40 : colors.$dark};
    &:hover {
      color: ${({ theme }) =>
        theme === 'light' ? colors.$gray50 : colors.$black};
    }
  }

  ${ModalDivider} {
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$gray10 : colors.$gray70};
  }
`;

/*******************************************
      COMPONENT EXPORTS START HERE
********************************************/
// ModalFooter
export const ModalFooter = ({ children, ...props }) => (
  <StyledModalFooter {...props}>{children}</StyledModalFooter>
);
ModalFooter.propTypes = { children: oneOfType([string, object, array, func]) };

// ModalBody
export const ModalBody = ({ children, ...props }) => (
  <StyledModalBody {...props}>{children}</StyledModalBody>
);
ModalBody.propTypes = { children: oneOfType([string, object, array, func]) };

// ModalCloseButton
export const ModalCloseButton = ({ onClick }) => (
  <StyledModalCloseButton
    role="button"
    type="button"
    as={FontAwesomeIcon}
    icon={faTimes}
    aria-label="Close"
    onClick={onClick}
  />
);
ModalCloseButton.propTypes = { onClick: func.isRequired };

// ModalTitle
export const ModalTitle = ({ children, ...props }) => (
  <StyledModalTitle {...props}>{children}</StyledModalTitle>
);
ModalTitle.propTypes = { children: oneOfType([string, object, array, func]) };

// ModalHeader
export const ModalHeader = ({ title, children, ...props }) => (
  <StyledModalHeader>
    <ModalScreenReaderText title={title} />
    {children}
  </StyledModalHeader>
);
ModalHeader.propTypes = {
  title: string.isRequired,
  children: oneOfType([string, object, array, func]),
};

// ModalScreenReaderText
const ModalScreenReaderText = ({ title }) => (
  <StyledModalScreenReaderText>
    This is a dialog window which overlays the main content of the page. The
    modal begins with a heading 3 called &quot;{title}&quot;. Pressing the Modal
    Close Button at the top right hand side of the modal will close the modal
    and bring you back to where you were on the page.
  </StyledModalScreenReaderText>
);
ModalScreenReaderText.propTypes = { title: string.isRequired };

// ModalContent
export const ModalContent = ({ children, ...props }) => (
  <StyledModalContent {...props}>{children}</StyledModalContent>
);
ModalContent.propTypes = { children: oneOfType([string, object, array, func]) };

// ModalDialog
export const ModalDialog = ({ children, ...props }) => (
  <div role="document" {...props}>
    {children}
  </div>
);
ModalDialog.propTypes = { children: oneOfType([string, object, array, func]) };

// Modal
export const Modal = ({
  id,
  show,
  ariaDescribedBy,
  ariaLabel,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  if (!show) return null;

  return (
    <StyledModal
      role="dialog"
      tabindex={show ? '0' : '-1'}
      id={id}
      theme={theme}
      show={show}
      aria-hidden={!show}
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel || null}
      {...props}
    >
      {children}
    </StyledModal>
  );
};

Modal.propTypes = {
  id: string.isRequired,
  show: bool.isRequired,
  ariaDescribedBy: string,
  ariaLabel: string,
  children: oneOfType([string, object, array, func]),
};
Modal.defaultProps = { show: false };
