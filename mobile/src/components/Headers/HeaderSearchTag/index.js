import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import theme from '@theme';
import ChipInput from '@components/ChipInput';

// HOOKS
import useSearchQuizByTag from '@hook/useSearchQuizByTag';

// Style
import {
  HeaderWrapper,
  BackgroundHeader,
  HeaderInformations,
  HeaderButton,
  HeaderWelcomeTextView,
  StyledWelcome,
  StyledParagraph,
  StyledButton,
} from './style';

const Header = () => {
  const navigation = useNavigation();
  const [chips, setChips] = useState([]);

  const { getQuizByTags } = useSearchQuizByTag();

  return (
    <HeaderWrapper>
      <BackgroundHeader>
        <HeaderInformations>
          <HeaderButton onPress={() => navigation.openDrawer()}>
            <AntDesign name="menu-fold" size={32} color="white" />
          </HeaderButton>
          <HeaderWelcomeTextView>
            <StyledWelcome fill="white">Busca por Tag's,</StyledWelcome>
            <StyledParagraph fill="white">
              Faça sua busca personalizada!
            </StyledParagraph>
          </HeaderWelcomeTextView>
        </HeaderInformations>
        <ChipInput
          placeholder="Digite as tags aqui..."
          chips={chips}
          setChips={setChips}
        />
      </BackgroundHeader>
      <StyledButton
        colors={theme.color.gradients.orange}
        variant="primary"
        onPress={() => getQuizByTags(chips)}
      >
        Pesquisar
      </StyledButton>
    </HeaderWrapper>
  );
};

export default Header;
