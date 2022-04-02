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

const HeaderRanking = () => {
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
            <Title fill="white">Ranking Geral,</Title>
            <Paragraph fill="white">
              Veja os players com maiores pontuações!
            </Paragraph>
          </TextWrapper>
        </HeaderInformations>
      </BackgroundHeader>
    </HeaderWrapper>
  );
};

export default HeaderRanking;
