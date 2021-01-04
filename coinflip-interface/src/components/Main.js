import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import cx from 'classnames';
import { useWeb3React } from '@web3-react/core';
import { parseEther } from '@ethersproject/units';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowDown,
  faMagic,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { truncateString, colors } from '../utils';
import { useTheme } from '../hooks';
import { Button } from '.';

const Main = () => {
  const { active, account } = useWeb3React();
  const { theme } = useTheme();
  // const { userBalance, setUserBalance } = useUser();
  // const {
  //   contract,
  //   contractOwner,
  //   contractBalance,
  //   setContractBalance,
  // } = useContract();
  // const {
  //   setShowModal,
  //   currentTab,
  //   transactionAmount,
  //   transactionResults,
  //   transactionButtonText,
  //   setTransactionButtonText,
  //   setTransactionAmount,
  //   setCurrentTab,
  //   setAlert,
  //   setTransactionResults,
  // } = useApplication();

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setTransactionAmount(e.currentTarget.value);
  // };

  // const sendTransaction = async (e) => {
  //   switch (true) {
  //     case transactionAmount === '':
  //       return;
  //     // only allow numbers and float points allowed
  //     case !new RegExp(/^\d*\.?\d+$/).test(transactionAmount):
  //       setAlert({
  //         title: 'Woops!',
  //         text: 'Only numbers are allowed',
  //       });
  //       return;
  //     case parseFloat(transactionAmount) === 0:
  //       setAlert({
  //         title: 'Oh no!',
  //         text: 'You have to send some ether to the contract',
  //       });
  //       return;
  //     case parseFloat(transactionAmount) < 0.01:
  //       setAlert({
  //         title: 'Oh no!',
  //         text: 'You have to send at least 0.01 ether',
  //       });
  //       return;
  //     case parseFloat(transactionAmount) > 5:
  //       setAlert({
  //         title: 'Oh no!',
  //         text: "You can't send more than 5 ether",
  //       });
  //       return;
  //     default:
  //       console.log('Your transaction is being submitted...');
  //   }
  //
  //   let tx, receipt, sumEvent;
  //   const config = { value: parseEther(transactionAmount) };
  //
  //   e.currentTarget.id === 'Fund Contract'
  //     ? (tx = await contract.fundContract(config))
  //     : (tx = await contract.bet(config));
  //
  //   receipt = await tx.wait(1);
  //   sumEvent = receipt.events.pop();
  //
  //   setAlert({
  //     title: 'Good News!',
  //     text: `Your transaction of ${parseFloat(
  //       transactionAmount,
  //     )} ether has been accepted.`,
  //   });
  //   setTransactionAmount(0);
  //
  //   sumEvent.event === 'BetPlaced' &&
  //     setTransactionResults({
  //       won: sumEvent.args.betWon,
  //       amount: sumEvent.args.betWon
  //         ? transactionAmount * 2
  //         : transactionAmount,
  //     });
  //
  //   setContractBalance(
  //     sumEvent.args.betWon
  //       ? parseFloat(
  //           parseFloat(contractBalance) - parseFloat(transactionAmount),
  //         )
  //       : parseFloat(
  //           parseFloat(contractBalance) + parseFloat(transactionAmount),
  //         ),
  //   );
  // };

  // const withdraw = async () => {
  //   switch (true) {
  //     case contractBalance === 0:
  //       setAlert({
  //         title: 'Oh no!',
  //         text: "The contract doesn't have any funds",
  //       });
  //       return;
  //     case userBalance === 0:
  //       setAlert({
  //         title: 'Woops!',
  //         text: 'You have to have funds in order to withdraw',
  //       });
  //       return;
  //     default:
  //       console.log('Initiating Transaction...');
  //   }
  //
  //   let tx =
  //     account === contractOwner
  //       ? await contract.withdrawContract()
  //       : await contract.withdraw();
  //   let receipt = await tx.wait(1);
  //
  //   console.log(receipt);
  //   setAlert({
  //     title: 'Congratulations!',
  //     text: 'The funds have made it to your account',
  //   });
  //   account === contractOwner ? setContractBalance(0) : setUserBalance(0);
  // };

  return (
    <>
      {/* <Row
        className={cx('', {
          'bg-light': theme === 'light',
          'bg-dark': theme === 'dark',
        })}
      >
        <Col className="col">
          <h1 className="display-6 mb-2 w-50">
            A decentralized game on Ethereum.
          </h1>
          <FontAwesomeIcon icon={faEthereum} />
          <p className="lead text-muted">Flip a coin and win some Ether.</p>
        </Col>
      </Row> */}
      <Container className="my-5">
        <Row className="mt-5">
          <Col
            xs={10}
            md={8}
            className={cx('border shadow-sm rounded mx-auto', {
              'bg-white border-light': theme === 'light',
              'bg-black border-dark': theme === 'dark',
            })}
          >
            <h5 className="py-3 mb-0">Marketplace</h5>
            <div className="App--rainbow-border-top rounded" />
            <Row className="my-4">
              <Col>
                <h6 className="text-muted">Choose an amount.</h6>
                <h5 className="text-dark">Press the play button.</h5>
                <h4 className="text-black">Win (or lose) some ether.</h4>
              </Col>
              <Col xs={12} md={4}>
                <div className="rounded p-4 py-md-0">
                  Recent Transactions
                  <ul className="p-0" style={{ listStyleType: 'none' }}>
                    {[
                      { wonMatch: true, amountEarnedOrLost: '2' },
                      { wonMatch: false, amountEarnedOrLost: '4' },
                      { wonMatch: true, amountEarnedOrLost: '2' },
                    ].map((obj, idx) => (
                      <li key={idx}>
                        <FontAwesomeIcon
                          icon={faCircle}
                          className={
                            obj.wonMatch ? 'text-success' : 'text-danger'
                          }
                        />
                        {obj.wonMatch ? 'Won' : 'Lost'} {obj.amountEarnedOrLost}{' '}
                        Ether
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>

            <Row noGutters>
              <Col>
                <div className="border p-4 rounded text-center">
                  <h1>
                    <FontAwesomeIcon icon={faEthereum} />
                  </h1>
                  <h1>
                    <span>0.0</span> Ether
                  </h1>
                </div>
              </Col>
            </Row>
            <Row className="my-5" noGutters>
              <Col className="d-flex justify-content-center">
                <Button id="Button--play" variant="green" className="mx-2 w-25">
                  Play
                </Button>
                <Button id="Button--reset" variant="pink" className="mx-2 w-25">
                  Reset
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Main;
