import React from 'react';
import { oneOfType, string, object, array } from 'prop-types';
import styled from 'styled-components';
import { colors } from '../utils';

const StyledCol = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const Col = ({ children, ...props }) => (
  <StyledCol {...props}>{children}</StyledCol>
);

Col.propTypes = { children: oneOfType([string, object, array]) };
export default Col;
