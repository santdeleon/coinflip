import React from 'react';
import { oneOfType, string, object, array } from 'prop-types';
import styled from 'styled-components';
import { colors } from '../utils';

const StyledRow = styled.div`
  display: flex;
  align-items: center;
`;

const Row = ({ children, ...props }) => (
  <StyledRow {...props}>{children}</StyledRow>
);

Row.propTypes = { children: oneOfType([string, object, array]) };
export default Row;
