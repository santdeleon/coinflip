import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { Navbar, Nav } from 'react-bootstrap';
import useAxios from 'axios-hooks';
import cx from 'classnames';

import { truncateString } from '../utils';

const GITHUB_REPO_URL =
  'https://api.github.com/repos/santdeleon/coinflip/commits/main';

const Footer = () => {
  const [{ data, loading, error }] = useAxios(GITHUB_REPO_URL);

  return (
    <Navbar fixed="bottom">
      <Nav className="ml-auto align-items-center px-2">
        <FaCircle
          size="10"
          className={cx('mr-2', {
            'text-success': data,
            'text-warning': loading,
            'text-danger': error,
          })}
        />
        <a
          href={`https://github.com/santdeleon/coinflip/commit/${data?.sha}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Github"
          className="mb-1 text-decoration-none text-truncate"
        >
          <small className="font-weight-light text-link">
            {data && truncateString(data.sha, 15)}
            {loading && 'Fetching last commit...'}
            {error && 'Unable to retreive last commit.'}
          </small>
        </a>
      </Nav>
    </Navbar>
  );
};

export default Footer;
