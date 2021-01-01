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
    <ButtonGreen
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
    </ButtonGreen>
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

const ButtonGreen = styled(StyledButton)`
  color: ${colors.$green10};
  background-color: ${colors.$green40};
  border-color: ${colors.$green50};
  box-shadow: 0px 2px 0px ${colors.$green50};
  &:hover&:not(:disabled) {
    color: ${colors.$white};
    border-color: ${colors.$green50};
  }
  &:active {
    box-shadow: 0px 0px 0px ${colors.$secondary10};
  }
`;

const ButtonSecondary = styled(StyledButton)`
  color: ${({ theme }) =>
    theme === 'light' ? colors.$dark : colors.$secondary10};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$white : colors.$dark};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$secondary10 : colors.$black};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0px 2px 0px ${colors.$secondary10}`
      : `0px 2px 0px ${colors.$black}`};
  &:hover&:not(:disabled) {
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$secondary10 : colors.$dark};
    color: ${({ theme }) => (theme === 'light' ? colors.$dark : colors.$white)};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$secondary20 : colors.$black};
  }
  &:active {
    box-shadow: ${({ theme }) =>
      theme === 'light'
        ? `0px 0px 0px ${colors.$secondary10}`
        : `0px 0px 0px ${colors.$black}`};
  }
`;
