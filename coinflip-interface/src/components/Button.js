import React from 'react';
import { string, func, bool, object, oneOfType } from 'prop-types';
import styled from 'styled-components';
import { colors } from '../utils';
import { useTheme } from '../hooks';

const ButtonBase = styled.button`
  cursor: pointer;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  color: ${colors.$white};
  background-color: transparent;
  padding: ${({ padding }) => (padding ? padding : '0.375rem 0.75rem')};
  border-style: solid;
  border-radius: 0.45rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.3px;
  line-height: 1.5;
  white-space: nowrap;
  border-width: 2px 2px 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out,
    border-color 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
  transform: perspective(200px) translateY(0);
  &:hover {
    transition: all 0.04s ease-in;
  }
  &:focus {
    outline: 0;
  }
  &:disabled {
    opacity: 50%;
    pointer-events: none;
  }
  &:active {
    border-width: 2px 2px 2px;
    transform: perspective(200px) translateY(0.14rem);
  }
`;

export const ButtonRed = styled(ButtonBase)`
  background-color: ${colors.$red50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$red70 : colors.$black};
  &:hover {
    background-color: ${colors.$red60};
  }
`;

export const ButtonOrange = styled(ButtonBase)`
  background-color: ${colors.$orange50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$orange70 : colors.$black};
  &:hover {
    background-color: ${colors.$orange60};
  }
`;

export const ButtonYellow = styled(ButtonBase)`
  background-color: ${colors.$yellow50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$yellow70 : colors.$black};
  &:hover {
    background-color: ${colors.$yellow60};
  }
`;

export const ButtonGreen = styled(ButtonBase)`
  background-color: ${colors.$green50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$green70 : colors.$black};
  &:hover {
    background-color: ${colors.$green60};
  }
`;

export const ButtonBlue = styled(ButtonBase)`
  background-color: ${colors.$blue50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$blue70 : colors.$black};
  &:hover {
    background-color: ${colors.$blue60};
  }
`;

export const ButtonPurple = styled(ButtonBase)`
  background-color: ${colors.$purple50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$purple70 : colors.$black};
  &:hover {
    background-color: ${colors.$purple60};
  }
`;

export const ButtonPink = styled(ButtonBase)`
  background-color: ${colors.$pink50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$pink70 : colors.$black};
  &:hover {
    background-color: ${colors.$pink60};
  }
`;

export const ButtonLight = styled(ButtonBase)`
  color: ${({ theme }) => (theme === 'light' ? colors.$gray60 : colors.$dark)};
  background-color: ${colors.$white};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$gray20 : colors.$black};
  &:hover {
    color: ${colors.$dark};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$gray10 : colors.$gray10};
  }
`;

export const ButtonDark = styled(ButtonBase)`
  background-color: ${colors.$gray50};
  border-color: ${colors.$black};
  &:hover {
    background-color: ${colors.$gray60};
  }
`;

export const ButtonTransparent = styled(ButtonBase)`
  color: ${({ theme }) =>
    theme === 'light' ? colors.$gray70 : colors.$gray20};
  border: 0;
  &:hover {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$black : colors.$white};
  }
  &:active {
    transform: perspective(200px) translateY(0);
  }
`;

export const ButtonLink = styled(ButtonBase)`
  color: ${colors.$link};
  border: 0;
  &:hover {
    color: ${colors.$linkHover};
  }
  &:active {
    transform: perspective(200px) translateY(0);
  }
`;

const propTypes = {
  variant: oneOfType([string, object, bool]).isRequired,
  id: string.isRequired,
  type: string.isRequired,
  className: string,
  padding: string,
  disabled: bool,
  onClick: func,
  children: oneOfType([object, string, func]),
};

const defaultProps = {
  variant: 'primary',
  type: 'button',
  disabled: false,
};

const Button = ({
  variant,
  id,
  type,
  className,
  padding,
  disabled,
  onClick,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  switch (variant) {
    case 'red':
      return (
        <ButtonRed theme={theme} {...props}>
          {children}
        </ButtonRed>
      );
    case 'orange':
      return (
        <ButtonOrange theme={theme} {...props}>
          {children}
        </ButtonOrange>
      );
    case 'yellow':
      return (
        <ButtonYellow theme={theme} {...props}>
          {children}
        </ButtonYellow>
      );
    case 'green':
      return (
        <ButtonGreen theme={theme} {...props}>
          {children}
        </ButtonGreen>
      );
    case 'blue':
      return (
        <ButtonBlue theme={theme} {...props}>
          {children}
        </ButtonBlue>
      );
    case 'purple':
      return (
        <ButtonPurple theme={theme} {...props}>
          {children}
        </ButtonPurple>
      );
    case 'pink':
      return (
        <ButtonPink theme={theme} {...props}>
          {children}
        </ButtonPink>
      );
    case 'light':
      return (
        <ButtonLight theme={theme} {...props}>
          {children}
        </ButtonLight>
      );
    case 'dark':
      return (
        <ButtonDark theme={theme} {...props}>
          {children}
        </ButtonDark>
      );
    case 'transparent':
      return (
        <ButtonTransparent theme={theme} {...props}>
          {children}
        </ButtonTransparent>
      );
    case 'link':
      return (
        <ButtonLink theme={theme} {...props}>
          {children}
        </ButtonLink>
      );
    default:
      return (
        <ButtonLight theme={theme} {...props}>
          {children}
        </ButtonLight>
      );
  }
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
