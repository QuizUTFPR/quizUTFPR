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

const Attempts = ({ attempts }) => (
  <StyledScrollView>
    {attempts.map((attempt) => {
      const date = new Date(attempt.createdAt);
      const day = `${date.getDay()}`;
      const month = `${date.getMonth()}`;
      const year = date.getFullYear();

      const hours = `${date.getHours()}`;
      const minutes = `${date.getMinutes()}`;

      return (
        <AttemptCard key={attempt.id}>
          <AttemptNumberWrapper>
            <StyledHashtag>#</StyledHashtag>
            <AttemptNumber>{attempt.id}</AttemptNumber>
          </AttemptNumberWrapper>
          <AttemptInformations>
            <Score>
              {attempt.score === 1
                ? `${attempt.score} pt.`
                : `${attempt.score} pts.`}
            </Score>

            <AttemptDateAndHits>
              <SytledDateTime>
                {day.length === 1 ? `0${day}` : day}/
                {month.length === 1 ? `0${month}` : month}/{year} {`às `}
                {hours.length === 1 ? `0${hours}` : hours}:
                {minutes.length === 1 ? `0${minutes}` : minutes}
              </SytledDateTime>

              <QuizProgressText fill="purple">1/10</QuizProgressText>
            </AttemptDateAndHits>
            <QuizProgressBarBackground fill="lightGrey">
              <QuizProgressBar porcentage={(1 * 100) / 10} fill="purple" />
            </QuizProgressBarBackground>
          </AttemptInformations>
        </AttemptCard>
      );
    })}
  </StyledScrollView>
);

export default Attempts;
