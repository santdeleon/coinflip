import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Tab from './Tab';
import TabBody from './TabBody';

const Tabs = () => {
  return (
    <>
      <Row className="mt-3 mb-3 justify-content-center" noGutters>
        {[
          { id: 0, name: 'Play' },
          { id: 1, name: 'Results' },
          { id: 2, name: 'Rules' },
          { id: 3, name: 'Withdraw' },
        ].map((tab) => (
          <Col xs={2} key={tab.id}>
            <Tab tab={tab} />
          </Col>
        ))}
      </Row>
      <TabBody />
    </>
  );
};

export default Tabs;
