import React from 'react';
import { AntDesign } from '@expo/vector-icons';

import {
  QuizCard,
  StyledImage,
  StyledView,
  Description,
  QuizTitle,
  StyledIconButton,
} from '../style';

import { TeacherName } from './style';

const WithTeacherName = ({ data, color, navigate }) => (
  <QuizCard onPress={navigate}>
    <StyledImage source={data?.image?.url ? { uri: data.image.url } : null} />
    <StyledView>
      <Description>
        <QuizTitle fill="black">{data.title}</QuizTitle>
        <TeacherName fill="black">Prof.: {data.teacher.name}</TeacherName>
      </Description>
    </StyledView>

    <StyledIconButton>
      <AntDesign name="arrowright" size={24} color={color} />
    </StyledIconButton>
  </QuizCard>
);

export default WithTeacherName;
