import React, { useRef, useState } from 'react';
import { Overlay, Popover, Button } from 'react-bootstrap';

import { useTransaction, useUser } from '../context';

const EarningsPopover = () => {
  const target = useRef(null);
  const { earnings } = useUser();
  const { sendTransaction } = useTransaction();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <Button
        ref={target}
        variant="success"
        onClick={() => setShowTooltip(!showTooltip)}
      >
        {earnings || 0} ETH
      </Button>
      <Overlay target={target.current} show={showTooltip} placement="bottom">
        <Popover className="p-3">
          <h3>Earnings</h3>
          <p className="text-secondary">
            The current amount of Ether you&apos;ve earned.{' '}
            <b>Play the game to earn some ether!</b>
          </p>
          <Button
            variant="success"
            size="block"
            disabled={earnings <= 0}
            onClick={() => sendTransaction('user_withdraw')}
          >
            Withdraw
          </Button>
        </Popover>
      </Overlay>
    </>
  );
};

export default EarningsPopover;
