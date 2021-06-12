import React, { useRef, useState } from 'react';
import { Overlay, Popover, Button } from 'react-bootstrap';

import { useUser } from '../context';

const BalancePopover = () => {
  const target = useRef(null);
  const { balance } = useUser();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <Button
        ref={target}
        variant="info"
        className="mx-2"
        onClick={() => setShowTooltip(!showTooltip)}
      >
        {balance || 0} ETH
      </Button>
      <Overlay target={target.current} show={showTooltip} placement="bottom">
        <Popover className="p-3">
          <h3>Balance</h3>
          <p className="mb-0 text-secondary">
            The Ether balance for your currently selected Ethereum address.
          </p>
        </Popover>
      </Overlay>
    </>
  );
};

export default BalancePopover;
