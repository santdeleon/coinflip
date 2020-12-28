import React from 'react';
import { string } from 'prop-types';

const propTypes = {
  ariaLabel: string.isRequired,
  unicode: string.isRequired,
  className: string,
};

const Emoji = ({ ariaLabel, unicode, className }) => (
  <span role="img" aria-label={ariaLabel} className={className}>
    {unicode}
  </span>
);

Emoji.propTypes = propTypes;
export default Emoji;
