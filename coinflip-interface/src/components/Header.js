import React from 'react';
import { Row, Col } from 'react-bootstrap';
import cx from 'classnames';

import { useTheme } from '../hooks';

const Header = () => {
  const { theme } = useTheme();

  return (
    <Row
      className={cx({
        'bg-light': theme === 'light',
        'bg-dark': theme === 'dark',
      })}
    >
      <Col>
        <small>
          This app is currently undergoing remodel, expect some buggy
          functionality.
        </small>
      </Col>
    </Row>
  );
};

export default Header;
