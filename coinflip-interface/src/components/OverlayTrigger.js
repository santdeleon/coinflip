import React, { useState } from 'react';
import { string, array, object, oneOfType } from 'prop-types';
import { StyledTooltipContainer } from '../components/';

const propTypes = {
  overlay: oneOfType([array, object, string]).isRequired,
  delay: object,
  children: oneOfType([array, object, string]),
};

const defaultProps = {
  delay: { show: 250, hide: 400 },
};

const OverlayTrigger = ({ overlay, delay, children }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <div
        delay={delay}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
      >
        {children}
      </div>
      {showOverlay && (
        <StyledTooltipContainer
          onMouseEnter={() => setShowOverlay(true)}
          onMouseLeave={() => setShowOverlay(false)}
        >
          {overlay}
        </StyledTooltipContainer>
      )}
    </>
  );
};

OverlayTrigger.propTypes = propTypes;
OverlayTrigger.defaultProps = defaultProps;
export default OverlayTrigger;
