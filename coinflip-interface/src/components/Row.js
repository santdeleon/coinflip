import React from 'react';
import { oneOfType, string, object, array } from 'prop-types';
import styled from 'styled-components';

const StyledRow = styled.div`
  display: flex;
`;

const propTypes = {
  children: oneOfType([string, object, array]),
};

const Row = ({ children, ...props }) => (
  <StyledRow {...props}>{children}</StyledRow>
);

Row.propTypes = propTypes;
export default Row;
