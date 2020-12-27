import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { X } from 'react-feather';

import './index.css';

import { useApplication } from '../../../context/ApplicationContext';

const Alert = () => {
  const { alert, setAlert } = useApplication();

  if (!alert) return null;

  const alertBgColor = alert?.title?.match(/^woops|oh no|dang/i)
    ? { backgroundColor: '#f7608b' }
    : { backgroundColor: '#52f292' };

  return (
    <Card className={`alert p-0 m-0 ${alert && 'fade-in'}`}>
      <Card.Header className="p-0 text-right" style={alertBgColor}>
        <Button variant="" className="p-0 m-0 mr-1" onClick={() => setAlert(null)}>
          <X className="alert-close mb-1" size={17} />
        </Button>
      </Card.Header>
      <Card.Body className="text-left pl-3 py-2">
        <Card.Title>{alert?.title}</Card.Title>
        <Card.Text>{alert?.text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Alert;
