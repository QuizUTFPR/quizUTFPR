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

  const [loading, setLoading] = useState(false);

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
        loading={loading}
        colors={theme.color.gradients.orange}
        variant="primary"
        onPress={async () => {
          setLoading(true);

          const hasMessageError = await getQuizByTags();

          if (!hasMessageError) {
            navigation.navigate('ResultSearchTag');
          }
          setLoading(false);
        }}
      >
        Pesquisar
      </StyledButton>
    </HeaderWrapper>
  );
};

export default Header;
