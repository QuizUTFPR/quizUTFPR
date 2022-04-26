import React from 'react';

// STYLES
import {
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
  <>
    {attempts.map((attempt, idx) => {
      const date = new Date(attempt.createdAt);
      const day = `${date.getDay()}`;
      const month = `${date.getMonth()}`;
      const year = date.getFullYear();

      const hours = `${date.getHours()}`;
      const minutes = `${date.getMinutes()}`;

      const { id, hitAmount } = attempt;

      return (
        <AttemptCard key={id}>
          <AttemptNumberWrapper>
            <StyledHashtag>#</StyledHashtag>
            <AttemptNumber>{idx + 1}</AttemptNumber>
          </AttemptNumberWrapper>
          <AttemptInformations>
            <Score>
              {hitAmount === 1 ? `${hitAmount} pt.` : `${hitAmount} pts.`}
            </Score>

            <AttemptDateAndHits>
              <SytledDateTime>
                {day.length === 1 ? `0${day}` : day}/
                {month.length === 1 ? `0${month}` : month}/{year} {`às `}
                {hours.length === 1 ? `0${hours}` : hours}:
                {minutes.length === 1 ? `0${minutes}` : minutes}
              </SytledDateTime>

              <QuizProgressText fill="purple">
                {hitAmount}/{amountOfQuestions}
              </QuizProgressText>
            </AttemptDateAndHits>
            <QuizProgressBarBackground fill="lightGrey">
              <QuizProgressBar
                porcentage={(attempt.hitAmount * 100) / amountOfQuestions}
                fill="purple"
              />
            </QuizProgressBarBackground>
          </AttemptInformations>
        </AttemptCard>
      );
    })}
  </>
);

export default Attempts;
