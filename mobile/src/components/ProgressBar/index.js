import React from 'react';

import { QuizProgressBarBackground, QuizProgressBar } from './style';

const ProgressBar = () => (
  <QuizProgressBarBackground fill="lightGrey">
    <QuizProgressBar porcentage={(2 * 100) / 5} fill="purple" />
  </QuizProgressBarBackground>
);

export default ProgressBar;
