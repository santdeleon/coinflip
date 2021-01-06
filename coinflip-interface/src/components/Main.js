import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import cx from 'classnames';
import { useWeb3React } from '@web3-react/core';
import { formatEther, parseEther } from '@ethersproject/units';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../utils';
import { useTheme, useContract, useTransaction } from '../hooks';
import { Button } from '.';

const Main = () => {
  const { account } = useWeb3React();
  const { contract } = useContract();
  const { transaction, setTransaction, sendTransaction } = useTransaction();
  const { theme } = useTheme();

  const [contractBalance, setContractBalance] = useState(null);
  const [form, setForm] = useState({
    canSubmit: false,
    inputError: null,
  });

  useEffect(() => {
    if (contract) {
      console.log(contract);
      // fetch contract balance
      contract
        .balances(contract.address)
        .then((balance) => setContractBalance(formatEther(balance)))
        .catch((err) => console.error(err));
    }
  }, [contract, account]);

  const handleChange = (e) => {
    let query = e.currentTarget.value;
    let regex = /^[+-]?(\d*\.)?\d+$/; // only allow numbers and periods

    if (query === '' || regex.test(query)) {
      setTransaction({ amount: query });
      setForm({ canSubmit: true });
    }

    if (
      query.length === 0 ||
      query === '0' ||
      parseFloat(query) > contractBalance / 2
    ) {
      setForm({ ...form, canSubmit: false });
    }

    const input = validateInput(query);
    if (input) setForm({ ...form, inputError: input });
  };

  const validateInput = (inputValue) => {
    let errorMessage;

    switch (true) {
      case parseInt(inputValue) > 5:
        errorMessage = 'The limit for transactions is 5 ether';
        break;
      case inputValue === '0':
        errorMessage = 'You have to send more ether than that';
        break;
      case parseInt(inputValue) > contractBalance / 2:
        errorMessage =
          'The contract must have at least twice as much ether as your sending it';
        break;
      default:
        break;
    }

    return errorMessage ? errorMessage : false;
  };

  return (
    <Container className="my-5 py-4">
      <Row className="mt-5">
        <Col
          xs={10}
          md={8}
          lg={6}
          className={cx('border rounded shadow-sm rounded mx-auto', {
            'bg-white border-light': theme === 'light',
            'bg-black border-dark': theme === 'dark',
          })}
        >
          {/* Header */}
          <Row className="py-3">
            <Col>
              <h5 className="mb-0">Play Game</h5>
            </Col>
            <Col className="d-flex flex-column justify-content-end">
              <small className="text-right text-muted">
                Contract Balance:{' '}
                {contractBalance
                  ? contractBalance < 0.0001
                    ? 0
                    : contractBalance
                  : null}{' '}
                ETH
              </small>
              <Button
                id="Main__Button--fund-contract"
                variant="transparent"
                className="p-0 m-0 text-right"
              >
                <small>No funds? Fund the contract.</small>
              </Button>
            </Col>
          </Row>
          <div className="App--rainbow-border rounded" />
          {/* Body */}
          <Row className="mt-5" noGutters>
            <Col xs={8} md={6} className="mx-auto">
              <div className="text-center mx-auto">
                <h1>
                  <FontAwesomeIcon icon={faEthereum} />
                </h1>
                <h1 className="text-center">
                  <input
                    type="text"
                    value={transaction.amount}
                    onChange={handleChange}
                    placeholder="0.0"
                    className={cx(
                      'text-center border-0 w-100 p-0 bg-transparent outline-0',
                      {
                        'text-dark': theme === 'light',
                        'text-light': theme === 'dark',
                      },
                    )}
                  />
                </h1>
                {form.inputError && (
                  <small className="text-danger">{form.inputError}</small>
                )}
              </div>
            </Col>
          </Row>
          <Row className="my-5" noGutters>
            <Col className="d-flex justify-content-center">
              <Button
                id="Button--play"
                variant="green"
                className="mx-2 w-25"
                onClick={() => sendTransaction('bet')}
                disabled={!form.canSubmit || transaction.amount === '0'}
              >
                Play
              </Button>
              <Button
                id="Button--reset"
                variant="pink"
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
          {transaction.status === 'pending' && (
            <Row
              className={cx('border-top py-4', {
                'bg-light border-light': theme === 'light',
                'bg-dark border-dark': theme === 'dark',
              })}
            >
              <Col className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" size="sm" className="mr-2" />
                Processing your transaction...
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
