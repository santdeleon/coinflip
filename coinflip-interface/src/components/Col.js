import React from 'react';
import { oneOfType, string, object, array, func } from 'prop-types';
import styled from 'styled-components';

const StyledCol = styled.div`
  padding: 1rem;
`;

const propTypes = {
  children: oneOfType([string, object, array, func]),
};

const Col = ({ children, ...props }) => (
  <StyledCol {...props}>{children}</StyledCol>
);

Col.propTypes = propTypes;
export default Col;
