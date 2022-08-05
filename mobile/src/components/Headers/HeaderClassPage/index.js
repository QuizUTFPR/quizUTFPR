import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Style
import {
  HeaderWrapper,
  BackgroundHeader,
  HeaderInformations,
  HeaderButton,
  HeaderWelcomeTextView,
  StyledWelcome,
  StyledParagraph,
} from './style';

// import

const HeaderClassPage = () => {
  const navigation = useNavigation();

  return (
    <HeaderWrapper>
      <BackgroundHeader>
        <HeaderInformations>
          <HeaderButton onPress={() => navigation.openDrawer()}>
            <AntDesign name="menu-fold" size={32} color="white" />
          </HeaderButton>
          <HeaderWelcomeTextView>
            <StyledWelcome fill="white">Turmas,</StyledWelcome>
            <StyledParagraph fill="white">Encontre sua turma!</StyledParagraph>
          </HeaderWelcomeTextView>
        </HeaderInformations>
      </BackgroundHeader>
    </HeaderWrapper>
  );
};

export default HeaderClassPage;
