import React from 'react';

import { QuizProgressBarBackground, QuizProgressBar } from './style';

const ProgressBar = ({ porcentage }) => (
  <QuizProgressBarBackground fill="lightGrey">
    <QuizProgressBar
      porcentage={porcentage > 100 ? 100 : porcentage}
      fill="purple"
    />
  </QuizProgressBarBackground>
);

ProgressBar.defaultProps = {
  porcentage: 50,
};

export default ProgressBar;
