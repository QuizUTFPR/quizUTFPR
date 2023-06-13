/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import React from 'react';

// Icons
import { AntDesign } from '@expo/vector-icons';

// Style
import {
  QuizCard,
  StyledImage,
  StyledView,
  Description,
  QuizTitle,
  StyledIconButton,
} from '../style';

import {
  QuizProgressBarBackground,
  QuizProgressBar,
  QuizProgressText,
  ClassTitle,
} from './style';

const CardInProgress = ({ navigate, data, color, ...props }) => (
  <QuizCard onPress={navigate} {...props}>
    <StyledImage
      source={
        data?.quiz?.image?.url
          ? {
              uri: data.quiz.image.url,
            }
          : null
      }
    />
    <StyledView>
      <Description>
        <QuizTitle fill="black">{data.quiz.title}</QuizTitle>
        {data?.classInstance ? (
          <ClassTitle fill="black">
            Turma {data.classInstance?.title}
          </ClassTitle>
        ) : null}
      </Description>
      <QuizProgressBarBackground fill="lightGrey">
        <QuizProgressBar
          porcentage={(data.studentChoicesAmount * 100) / data.questionAmount}
          fill="purple"
        />
      </QuizProgressBarBackground>
    </StyledView>
    <QuizProgressText fill="purple">
      {Math.floor((data.studentChoicesAmount * 100) / data.questionAmount)}%
    </QuizProgressText>
    <StyledIconButton>
      <AntDesign name="arrowright" size={24} color={color} />
    </StyledIconButton>
  </QuizCard>
);

export default CardInProgress;
