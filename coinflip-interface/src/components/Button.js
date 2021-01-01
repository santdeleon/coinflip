import React from 'react';
import { string, func, array, bool, object, oneOfType } from 'prop-types';
import styled from 'styled-components';

import * as colors from '../utils/colors';

import { useTheme } from '../hooks';

const propTypes = {
  id: string.isRequired,
  type: string.isRequired,
  className: string,
  padding: string,
  margin: string,
  disabled: bool,
  onClick: func,
  children: oneOfType([array, object]),
};

const defaultProps = {
  type: 'button',
  padding: '4px 16px',
  margin: '0 15px 0 15px',
  disabled: false,
};

const Button = ({
  id,
  type,
  className,
  padding,
  margin,
  disabled,
  onClick,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <ButtonBlue
      id={id}
      type={type}
      theme={theme}
      className={className}
      padding={padding}
      margin={margin}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </ButtonBlue>
  );
};
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;

const StyledButton = styled.button`
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  font-weight: 700;
  border-style: solid;
  border-radius: 14px;
  border-width: 2px 2px 4px;
  transform: perspective(200px) translateY(0);
  transition: all 0.25s;
  &:hover {
    outline: 0;
    transition: all 0.08s;
  }
  &:active {
    outline: 0;
    border-width: 2px 2px 2px;
    transform: perspective(200px) translateY(0.14rem);
  }
  &:focus {
    outline: 0;
  }
  &:disabled {
    opacity: 50%;
  }
`;

// const ButtonSecondary = styled(StyledButton)`
//   color: ${({ theme }) =>
//     theme === 'light' ? colors.$gray50 : colors.$gray20};
//   background-color: ${({ theme }) =>
//     theme === 'light' ? colors.$white : colors.$gray50};
//   border-color: ${({ theme }) =>
//     theme === 'light' ? colors.$gray20 : colors.$black};
//   box-shadow: ${({ theme }) =>
//     theme === 'light'
//       ? `0px 2px 0px ${colors.$gray20}`
//       : `0px 2px 0px ${colors.$black}`};
//   &:hover&:not(:disabled) {
//     color: ${({ theme }) =>
//       theme === 'light' ? colors.$gray60 : colors.$white};
//     background-color: ${({ theme }) =>
//       theme === 'light' ? colors.$gray10 : colors.$gray60};
//     border-color: ${({ theme }) =>
//       theme === 'light' ? colors.$gray20 : colors.$black};
//   }
//   &:active {
//     box-shadow: ${({ theme }) =>
//       theme === 'light'
//         ? `0px 0px 0px ${colors.$gray20}`
//         : `0px 0px 0px ${colors.$black}`};
//   }
// `;

// const ButtonPink = styled(StyledButton)`
//   color: ${({ theme }) => (theme === 'light' ? colors.$white : colors.$gray10)};
//   background-color: ${({ theme }) =>
//     theme === 'light' ? colors.$pink40 : colors.$pink40};
//   border-color: ${({ theme }) =>
//     theme === 'light' ? colors.$pink60 : colors.$pink70};
//   box-shadow: ${({ theme }) =>
//     theme === 'light'
//       ? `0px 2px 0px ${colors.$pink60}`
//       : `0px 2px 0px ${colors.$pink70}`};
//   &:hover&:not(:disabled) {
//     color: ${({ theme }) =>
//       theme === 'light' ? colors.$white : colors.$gray10};
//     background-color: ${({ theme }) =>
//       theme === 'light' ? colors.$pink50 : colors.$pink50};
//     border-color: ${({ theme }) =>
//       theme === 'light' ? colors.$pink60 : colors.$pink70};
//   }
//   &:active {
//     box-shadow: 0px 0px 0px ${colors.$pink10};
//   }
// `;

// const ButtonGreen = styled(StyledButton)`
//   color: ${({ theme }) => (theme === 'light' ? colors.$white : colors.$gray10)};
//   background-color: ${({ theme }) =>
//     theme === 'light' ? colors.$green40 : colors.$green50};
//   border-color: ${({ theme }) =>
//     theme === 'light' ? colors.$green60 : colors.$green70};
//   box-shadow: ${({ theme }) =>
//     theme === 'light'
//       ? `0px 2px 0px ${colors.$green60}`
//       : `0px 2px 0px ${colors.$green70}`};
//   &:hover&:not(:disabled) {
//     color: ${({ theme }) =>
//       theme === 'light' ? colors.$white : colors.$gray10};
//     background-color: ${({ theme }) =>
//       theme === 'light' ? colors.$green50 : colors.$green60};
//     border-color: ${({ theme }) =>
//       theme === 'light' ? colors.$green60 : colors.$green70};
//   }
//   &:active {
//     box-shadow: 0px 0px 0px ${colors.$gray10};
//   }
// `;

const ButtonBlue = styled(StyledButton)`
  color: ${({ theme }) => (theme === 'light' ? colors.$white : colors.$gray10)};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$blue40 : colors.$blue40};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$blue60 : colors.$blue70};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0px 2px 0px ${colors.$blue60}`
      : `0px 2px 0px ${colors.$blue70}`};
  &:hover&:not(:disabled) {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$white : colors.$gray10};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$blue50 : colors.$blue50};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$blue60 : colors.$blue70};
  }
  &:active {
    box-shadow: 0px 0px 0px ${colors.$blue10};
  }
`;
