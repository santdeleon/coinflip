import React, { useState } from 'react';
import { Container, Row, Col, Spinner, Button, Card } from 'react-bootstrap';
import { FaEthereum } from 'react-icons/fa';
import cx from 'classnames';

import { useContract, useTransaction } from '../context';

const Main = () => {
  const { balance } = useContract();
  const { transaction, setTransaction, sendTransaction } = useTransaction();
  const [form, setForm] = useState({
    canSubmit: false,
    inputError: null,
  });

  const handleChange = (e) => {
    let query = e.currentTarget.value;
    let regex = /^[+-]?(\d*\.)?\d+$/; // only allow numbers and periods

    if (query === '' || regex.test(query)) {
      setTransaction({ amount: query });
      setForm({ canSubmit: true });
    }

    if (query.length === 0 || query === '0' || parseInt(query) > balance / 2) {
      setForm({ ...form, canSubmit: false });
    }

    const input = validateInput(query);
    if (input) setForm({ ...form, canSubmit: false, inputError: input });
  };

  const validateInput = (inputValue) => {
    let errorMessage;

    switch (true) {
      case parseInt(inputValue) > 5:
        errorMessage = 'The limit for a transaction is 5 ether';
        break;
      case inputValue === '0':
        errorMessage = 'You have to send more ether than that';
        break;
      case parseInt(inputValue) > balance / 2:
        errorMessage = "You can't send more than twice the contract balance";
        break;
      default:
        break;
    }

    return errorMessage || false;
  };

  return (
    <Container as="main">
      <Card className="border shadow-sm rounded mx-auto mt-5">
        <Card.Header>Contract Balance: {balance || 0} ETH</Card.Header>
        <Card.Body className="text-center mx-auto">
          <Row className="mb-5">
            <Col>
              <FaEthereum size="42" className="mb-4" />
              <h1 className="text-center">
                <input
                  type="text"
                  value={transaction.amount}
                  onChange={handleChange}
                  placeholder="0.0"
                  className={cx('text-center text-dark border rounded', {
                    'border-danger': form.inputError,
                    'border-success': form.canSubmit,
                    'border-dark': !form.canSubmit && !form.inputError,
                  })}
                  style={{ outline: 0 }}
                />
              </h1>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button
                variant="primary"
                className="mx-2 w-25"
                onClick={() => sendTransaction('bet')}
                disabled={!form.canSubmit || transaction.amount === '0'}
              >
                Play
              </Button>
              <Button
                variant="danger"
                className="mx-2 w-25"
                onClick={() => {
                  setTransaction({ amount: '0' });
                  setForm({ inputError: null });
                }}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Card.Body>
        {(form.inputError || transaction.status === 'pending') && (
          <Card.Footer className="text-center">
            {form.inputError ? (
              <small className="text-danger">{form.inputError}</small>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" size="sm" className="mr-2" />
                Processing your transaction...
                <Button
                  variant="secondary"
                  size="sm"
                  className="ml-3"
                  onClick={() =>
                    setTransaction({
                      amount: '',
                      status: 'idle',
                      error: null,
                    })
                  }
                >
                  Clear
                </Button>
              </div>
            )}
          </Card.Footer>
        )}
      </Card>
    </Container>
  );
};

export default Main;
