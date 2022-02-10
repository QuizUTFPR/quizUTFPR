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

const CardQuizBasic = ({ navigate, quiz, color }) => (
  <QuizCard onPress={navigate}>
    <StyledImage
      source={
        quiz?.image?.url
          ? {
              uri: quiz.image.url,
            }
          : null
      }
    />
    <StyledView>
      <Description>
        <QuizTitle fill="black">{quiz.title}</QuizTitle>
      </Description>
    </StyledView>
    <StyledIconButton>
      <AntDesign name="arrowright" size={24} color={color} />
    </StyledIconButton>
  </QuizCard>
);

export default CardQuizBasic;
