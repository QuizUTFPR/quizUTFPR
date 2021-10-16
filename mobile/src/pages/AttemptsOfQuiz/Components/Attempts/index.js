import React from 'react';

// STYLES
import {
  StyledScrollView,
  AttemptCard,
  Score,
  StyledHashtag,
  SytledDateTime,
  AttemptNumberWrapper,
  AttemptNumber,
  AttemptInformations,
  QuizProgressBarBackground,
  QuizProgressBar,
  QuizProgressText,
  AttemptDateAndHits,
} from './styles';

const Attempts = ({ attempts, amountOfQuestions }) => (
  <StyledScrollView>
    {attempts.map((attempt) => {
      const date = new Date(attempt.createdAt);
      const day = `${date.getDay()}`;
      const month = `${date.getMonth()}`;
      const year = date.getFullYear();

      const hours = `${date.getHours()}`;
      const minutes = `${date.getMinutes()}`;

      // eslint-disable-next-line camelcase
      const { id, score, hit_amount } = attempt;

      return (
        <AttemptCard key={id}>
          <AttemptNumberWrapper>
            <StyledHashtag>#</StyledHashtag>
            <AttemptNumber>{id}</AttemptNumber>
          </AttemptNumberWrapper>
          <AttemptInformations>
            <Score>{score === 1 ? `${score} pt.` : `${score} pts.`}</Score>

            <AttemptDateAndHits>
              <SytledDateTime>
                {day.length === 1 ? `0${day}` : day}/
                {month.length === 1 ? `0${month}` : month}/{year} {`às `}
                {hours.length === 1 ? `0${hours}` : hours}:
                {minutes.length === 1 ? `0${minutes}` : minutes}
              </SytledDateTime>

              <QuizProgressText fill="purple">
                {/* eslint-disable-next-line camelcase */}
                {hit_amount}/{amountOfQuestions}
              </QuizProgressText>
            </AttemptDateAndHits>
            <QuizProgressBarBackground fill="lightGrey">
              <QuizProgressBar
                porcentage={(attempt.hit_amount * 100) / amountOfQuestions}
                fill="purple"
              />
            </QuizProgressBarBackground>
          </AttemptInformations>
        </AttemptCard>
      );
    })}
  </StyledScrollView>
);

export default Attempts;
