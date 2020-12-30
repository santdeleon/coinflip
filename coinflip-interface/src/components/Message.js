import React, { useState } from 'react';
import { Toast, Spinner } from 'react-bootstrap';
import { string, bool } from 'prop-types';
import cx from 'classnames';

const propTypes = {
  message: string.isRequired,
  isError: bool,
  isLoader: bool,
  showToast: bool,
};

const defaultProps = {
  showToast: false,
};

const Message = ({ message, showToast, isError, isLoader }) => {
  const [shouldShowToast, setShouldShowToast] = useState(showToast || false);

  if (isLoader) {
    return (
      <>
        <Spinner animation="border" role="status" size="sm">
          <span className="sr-only">Loading...</span>
        </Spinner>{' '}
        {message}
      </>
    );
  }

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'relative',
        minHeight: '200px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        <Toast
          animation={false} // using this temporarily to silence findDOMNode errors
          show={shouldShowToast}
          delay={5000}
          autohide
          onClose={() => setShouldShowToast(false)}
        >
          <Toast.Header
            className={cx('text-light', {
              'bg-success': !isError,
              'bg-danger': isError,
            })}
          >
            <strong className="mr-auto">{isError ? 'Uh Oh' : 'Success'}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;
export default Message;
