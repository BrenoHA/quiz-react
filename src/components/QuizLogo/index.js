import styled from 'styled-components';

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
function Logo({ className }) {
  return (
    <img src="https://i.ibb.co/GVm58R6/logo-Star-Wars.png" alt="Logo Quiz" />
  );
}

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

const QuizLogo = styled(Logo)`
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export default QuizLogo;
