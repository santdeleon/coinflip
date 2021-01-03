import React from 'react';
import { oneOfType, string, object, array, func, bool } from 'prop-types';
import styled from 'styled-components';

const StyledCol = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const Col = ({ children, ...props }) => (
  <StyledCol {...props}>{children}</StyledCol>
);

Col.propTypes = { children: oneOfType([string, object, array, func, bool]) };
export default Col;
