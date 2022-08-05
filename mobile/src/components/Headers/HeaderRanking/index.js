import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// ICONS

import {
  HeaderWrapper,
  BackgroundHeader,
  HeaderInformations,
  TextWrapper,
  Title,
  Paragraph,
  HeaderButton,
} from './style';

const HeaderRanking = () => {
  const navigation = useNavigation();

  return (
    <HeaderWrapper>
      <BackgroundHeader>
        <HeaderInformations>
          <HeaderButton onPress={() => navigation.openDrawer()}>
            <AntDesign name="menu-fold" size={32} color="white" />
          </HeaderButton>
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
