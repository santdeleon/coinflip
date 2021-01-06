import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import cx from 'classnames';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';

import { Button } from '.';

import { useTheme, useContract, useTransaction } from '../hooks';

import { colors } from '../utils';

const StyledInterface = styled(Col)`
  border-radius: 12px;
  max-width: 450px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$white : colors.$gray80};
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px,
    rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px;
`;

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
      parseInt(query) > contractBalance / 2
    ) {
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
      case parseInt(inputValue) > contractBalance / 2:
        errorMessage = "Can't send more than twice the contract balance";
        break;
      default:
        break;
    }

    return errorMessage ? errorMessage : false;
  };

  return (
    <main>
      <Container className="my-5 py-4">
        <Row className="mt-5">
          <StyledInterface className="mx-auto" theme={theme}>
            {/* Header */}
            <Row className="py-3">
              <Col className="d-flex align-items-center justify-content-between">
                <small className="text-right text-muted">
                  Contract Balance:{' '}
                  {contractBalance
                    ? contractBalance < 0.0001
                      ? 0
                      : contractBalance
                    : null}{' '}
                  ETH
                </small>
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
                </div>
              </Col>
            </Row>
            {form.inputError && (
              <Row className="justify-content-center w-100 mx-auto mt-2">
                <Col className="d-flex justify-content-center">
                  <small className="text-danger text-left">
                    {form.inputError}
                  </small>
                </Col>
              </Row>
            )}
            <Row className="my-5" noGutters>
              <Col className="d-flex justify-content-center">
                <Button
                  id="Button--play"
                  variant="pink"
                  className="mx-2 w-25"
                  onClick={() => sendTransaction('bet')}
                  disabled={!form.canSubmit || transaction.amount === '0'}
                >
                  Play
                </Button>
                <Button
                  id="Button--reset"
                  variant="dark"
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
                className={cx('border-top rounded py-4', {
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
          </StyledInterface>
        </Row>
      </Container>
    </main>
  );
};

export default Main;
