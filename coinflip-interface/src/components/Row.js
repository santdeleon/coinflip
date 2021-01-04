import React from 'react';
import { oneOfType, string, object, array, func } from 'prop-types';
import styled from 'styled-components';

const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const propTypes = {
  children: oneOfType([string, object, array, func]),
};

const Row = ({ children, ...props }) => (
  <StyledRow {...props}>{children}</StyledRow>
);

Row.propTypes = propTypes;
export default Row;
