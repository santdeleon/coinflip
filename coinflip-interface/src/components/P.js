import React from 'react';
import { oneOfType, string, object, array } from 'prop-types';
import styled from 'styled-components';
import { useTheme } from '../hooks';
import { colors } from '../utils';

const StyledP = styled.p`
  margin: ${({ margin }) => (margin ? margin : 0)};
  padding: ${({ padding }) => (padding ? padding : 0)};
  line-height: 1rem;
  font-weight: 400;
  color: ${({ theme }) =>
    theme === 'light' ? colors.$gray50 : colors.$gray10};
`;

const P = ({ margin, padding, children, ...props }) => {
  const { theme } = useTheme();

  return (
    <StyledP theme={theme} margin={margin} padding={padding} {...props}>
      {children}
    </StyledP>
  );
};

P.propTypes = {
  margin: string,
  padding: string,
  children: oneOfType([string, object, array]),
};
export default P;
