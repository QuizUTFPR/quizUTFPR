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

const CardBasic = ({ navigate, data, color }) => (
  <QuizCard onPress={navigate}>
    <StyledImage
      source={
        data?.image?.url
          ? {
              uri: data.image.url,
            }
          : null
      }
    />
    <StyledView>
      <Description>
        <QuizTitle fill="black">{data.title}</QuizTitle>
      </Description>
    </StyledView>
    <StyledIconButton>
      <AntDesign name="arrowright" size={24} color={color} />
    </StyledIconButton>
  </QuizCard>
);

export default CardBasic;
