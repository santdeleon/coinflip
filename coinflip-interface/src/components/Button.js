import React from 'react';
import { string, func, bool, object, oneOfType, array } from 'prop-types';
import styled from 'styled-components';

import { useTheme } from '../hooks';

import { colors } from '../utils';

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
  border-radius: 0.65rem;
  border-width: 1px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  line-height: 1.5;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  /* transition: color 0s ease-in-out, background-color 0s ease-in-out,
    border-color 0s ease-in-out, box-shadow 0s ease-in-out; */
  &:focus {
    outline: 0;
    box-shadow: 0 0 4pt transparent;
  }
  &:disabled {
    opacity: 50%;
    pointer-events: none;
  }
`;

export const ButtonRed = styled(ButtonBase)`
  background-color: ${colors.$red50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$red70 : colors.$black};
  &:hover {
    background-color: ${colors.$red60};
  }
  &:focus {
    box-shadow: 0 0 4pt ${colors.$red60};
  }
`;

export const ButtonOrange = styled(ButtonBase)`
  background-color: ${colors.$orange50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$orange70 : colors.$black};
  &:hover {
    background-color: ${colors.$orange60};
  }
  &:focus {
    box-shadow: 0 0 4pt ${colors.$orange60};
  }
`;

export const ButtonYellow = styled(ButtonBase)`
  background-color: ${colors.$yellow50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$yellow70 : colors.$black};
  &:hover {
    background-color: ${colors.$yellow60};
  }
  &:focus {
    box-shadow: 0 0 4pt ${colors.$yellow60};
  }
`;

export const ButtonGreen = styled(ButtonBase)`
  background-color: ${colors.$green50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$green70 : colors.$black};
  &:hover {
    background-color: ${colors.$green60};
  }
  &:focus {
    box-shadow: 0 0 4pt ${colors.$green60};
  }
`;

export const ButtonBlue = styled(ButtonBase)`
  background-color: ${colors.$blue50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$blue70 : colors.$black};
  &:hover {
    background-color: ${colors.$blue60};
  }
  &:focus {
    box-shadow: 0 0 4pt ${colors.$blue60};
  }
`;

export const ButtonPurple = styled(ButtonBase)`
  background-color: ${colors.$purple50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$purple70 : colors.$black};
  &:hover {
    background-color: ${colors.$purple60};
  }
  &:focus {
    box-shadow: 0 0 4pt ${colors.$purple60};
  }
`;

export const ButtonPink = styled(ButtonBase)`
  color: ${({ theme }) => (theme === 'light' ? '#ff007a' : '#f5d3e1')};
  background-color: ${({ theme }) =>
    theme === 'light' ? '#fdeaf1' : '#e6006e'};
  border-color: transparent;
  &:hover {
    color: ${({ theme }) => (theme === 'light' ? '#e6006e' : colors.$gray10)};
    /* background-color: #fcdce8; */
    border-color: ${({ theme }) => (theme === 'light' ? '#f5d3e1' : '#ff007a')};
  }
  &:focus {
    box-shadow: ${({ theme }) =>
      theme === 'light' ? '0 0 4pt #fcdce8' : '0 0 4pt #e6006e'};
  }
`;

// done
export const ButtonLight = styled(ButtonBase)`
  color: ${colors.$dark};
  background-color: ${colors.$white};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$gray20 : 'transparent'};
  &:hover {
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$gray10 : colors.$gray20};
  }
  &:focus {
    box-shadow: ${({ theme }) =>
      theme === 'light'
        ? `0 0 4pt ${colors.$gray20}`
        : `0 0 4pt ${colors.$gray40}`};
  }
`;

// done
export const ButtonDark = styled(ButtonBase)`
  color: ${({ theme }) => (theme === 'light' ? colors.$black : colors.$gray10)};
  background-color: ${({ theme }) =>
    theme === 'light' ? '#edeef2' : colors.$gray50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$gray20 : 'transparent'};
  &:hover {
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$gray20 : colors.$gray60};
  }
  &:focus {
    box-shadow: ${({ theme }) =>
      theme === 'light'
        ? `0 0 4pt ${colors.$gray20}`
        : `0 0 4pt ${colors.$gray70}`};
  }
`;

export const ButtonTransparent = styled(ButtonBase)`
  color: ${({ theme }) => (theme === 'light' ? colors.$dark : colors.$gray10)};
  border: 0;
  padding: 0;
  &:hover {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$black : colors.$white};
  }
`;

export const ButtonLink = styled(ButtonBase)`
  color: ${colors.$link};
  border: 0;
  &:hover {
    color: ${colors.$linkHover};
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
  children: oneOfType([object, string, func, array]),
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
        <ButtonRed
          theme={theme}
          id={id}
          type={type}
          className={className}
          padding={padding}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          {children}
        </ButtonRed>
      );
    case 'orange':
      return (
        <ButtonOrange
          theme={theme}
          id={id}
          type={type}
          className={className}
          padding={padding}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          {children}
        </ButtonOrange>
      );
    case 'yellow':
      return (
        <ButtonYellow
          theme={theme}
          id={id}
          type={type}
          className={className}
          padding={padding}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          {children}
        </ButtonYellow>
      );
    case 'green':
      return (
        <ButtonGreen
          theme={theme}
          id={id}
          type={type}
          className={className}
          padding={padding}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          {children}
        </ButtonGreen>
      );
    case 'blue':
      return (
        <ButtonBlue
          theme={theme}
          id={id}
          type={type}
          className={className}
          padding={padding}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          {children}
        </ButtonBlue>
      );
    case 'purple':
      return (
        <ButtonPurple
          theme={theme}
          id={id}
          type={type}
          className={className}
          padding={padding}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          {children}
        </ButtonPurple>
      );
    case 'pink':
      return (
        <ButtonPink
          theme={theme}
          id={id}
          type={type}
          className={className}
          padding={padding}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          {children}
        </ButtonPink>
      );
    case 'light':
      return (
        <ButtonLight
          theme={theme}
          id={id}
          type={type}
          className={className}
          padding={padding}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          {children}
        </ButtonLight>
      );
    case 'dark':
      return (
        <ButtonDark
          theme={theme}
          id={id}
          type={type}
          className={className}
          padding={padding}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          {children}
        </ButtonDark>
      );
    case 'transparent':
      return (
        <ButtonTransparent
          theme={theme}
          id={id}
          type={type}
          className={className}
          padding={padding}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          {children}
        </ButtonTransparent>
      );
    case 'link':
      return (
        <ButtonLink
          theme={theme}
          id={id}
          type={type}
          className={className}
          padding={padding}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          {children}
        </ButtonLink>
      );
    default:
      return (
        <ButtonLight
          theme={theme}
          id={id}
          type={type}
          className={className}
          padding={padding}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          {children}
        </ButtonLight>
      );
  }
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
