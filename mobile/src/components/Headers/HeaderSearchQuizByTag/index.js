import React from 'react';
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

  const { getQuizByTags, tags, setTags } = useSearchQuizByTag();

  return (
    <HeaderWrapper>
      <BackgroundHeader>
        <HeaderInformations>
          <HeaderButton onPress={() => navigation.openDrawer()}>
            <AntDesign name="menu-fold" size={32} color="white" />
          </HeaderButton>
          <HeaderWelcomeTextView>
            <StyledWelcome fill="white">Busca por Tag&apos;s,</StyledWelcome>
            <StyledParagraph fill="white">
              Faça sua busca personalizada!
            </StyledParagraph>
          </HeaderWelcomeTextView>
        </HeaderInformations>
        <ChipInput
          placeholder="Digite as tags aqui..."
          chips={tags}
          setChips={setTags}
        />
      </BackgroundHeader>
      <StyledButton
        colors={theme.color.gradients.orange}
        variant="primary"
        onPress={async () => {
          const hasError = await getQuizByTags();
          if (!hasError) {
            navigation.navigate('ResultSearchTag');
          }
        }}
      >
        Pesquisar
      </StyledButton>
    </HeaderWrapper>
  );
};

export default Header;
