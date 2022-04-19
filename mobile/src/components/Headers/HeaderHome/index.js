import React, { useState } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '@api';
import theme from '@theme';

// ICONS

import {
  HeaderWrapper,
  BackgroundHeader,
  HeaderInformations,
  HeaderButton,
  HeaderWelcomeTextView,
  StyledWelcome,
  StyledParagraph,
  InputWrapper,
  SearchInput,
} from './style';

// import

const Header = () => {
  const navigation = useNavigation();

  const [pin, setPin] = useState();

  const getQuizByPIN = async () => {
    try {
      if (!pin) {
        return;
      }

      const { data } = await api.post('/quiz/getByPIN', { pin });

      navigation.navigate('Descricao', {
        idStudentQuiz: data.idStudentQuiz,
        questionAmount: data.questionAmount,
        studentChoicesAmount: data.studentChoicesAmount,
        quiz: {
          id: data?.quiz?.id,
          title: data?.quiz?.title,
          description: data?.quiz?.description,
          pin: data?.quiz?.pin,
          image: data.quiz?.image?.url,
          tags: data?.quiz?.tagsQuiz.map((tag) => tag.name),
          isFavorite: data?.quiz?.isFavorite,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <HeaderWrapper>
      <BackgroundHeader>
        <HeaderInformations>
          <HeaderButton onPress={() => navigation.openDrawer()}>
            <AntDesign name="menu-fold" size={32} color="white" />
          </HeaderButton>
          <HeaderWelcomeTextView>
            <StyledWelcome fill="white">Seja bem-vindo,</StyledWelcome>
            <StyledParagraph fill="white">
              Escolha um quiz e divirta-se!
            </StyledParagraph>
          </HeaderWelcomeTextView>
        </HeaderInformations>

        <InputWrapper>
          <FontAwesome name="search" size={25} color={theme.color.purple} />
          <SearchInput
            defaultValue={pin}
            onSubmitEditing={getQuizByPIN}
            onChangeText={(pinText) => setPin(pinText)}
            placeholder="Digite o PIN"
          />
        </InputWrapper>
      </BackgroundHeader>
    </HeaderWrapper>
  );
};

export default Header;
