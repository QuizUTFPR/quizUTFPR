import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import theme from '@theme';

// ICONS

import {
  HeaderWrapper,
  BackgroundHeader,
  HeaderInformations,
  TextWrapper,
  Title,
  Paragraph,
  GoBackButtonWrapper,
  StyledIconButton,
} from './style';

const HeaderQuizRanking = ({ route }) => {
  const { quizTitle } = route.params;
  const navigation = useNavigation();

  return (
    <HeaderWrapper>
      <BackgroundHeader>
        <HeaderInformations>
          <GoBackButtonWrapper>
            <StyledIconButton onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={32}
                color={theme.color.purple}
              />
            </StyledIconButton>
          </GoBackButtonWrapper>
          <TextWrapper>
            <Title fill="white">Ranking do Quiz</Title>
            <Paragraph fill="white">{quizTitle}</Paragraph>
          </TextWrapper>
        </HeaderInformations>
      </BackgroundHeader>
    </HeaderWrapper>
  );
};

export default HeaderQuizRanking;
