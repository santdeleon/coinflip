import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const StyledEmoji = styled.span`
  margin: ${({ margin }) => (margin ? margin : '0 0.3rem')};
  padding: ${({ padding }) => padding};
`;

const propTypes = {
  ariaLabel: string.isRequired,
  unicode: string.isRequired,
  margin: string,
  padding: string,
  className: string,
};

export const Emoji = ({ ariaLabel, unicode, margin, padding, className }) => (
  <StyledEmoji
    role="img"
    alt={ariaLabel}
    aria-label={ariaLabel}
    margin={margin}
    padding={padding}
    className={className}
  >
    {unicode}
  </StyledEmoji>
);

Emoji.propTypes = propTypes;
export default Emoji;
