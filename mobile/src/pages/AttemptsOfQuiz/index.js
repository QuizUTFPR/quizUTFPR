/* eslint-disable global-require */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
// import api from '@api';

// COMPONENTS
import Container from '@components/Container';

// ICONS
import { AntDesign, Ionicons } from '@expo/vector-icons';
// import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';

// STYLES
import {
  QuizTitle,
  QuizCard,
  Description,
  StyledImage,
  TitleText,
  StyledIconButton,
  GoBackButtonWrapper,
  StyledView,
  StyledScrollView,
  QuizContainer,
} from './styles';

const Home = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <StyledScrollView>
        <GoBackButtonWrapper>
          <StyledIconButton onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={32} color="white" />
          </StyledIconButton>
        </GoBackButtonWrapper>
        <QuizContainer>
          <TitleText>Minhas Tentativas</TitleText>
          <QuizCard>
            <StyledImage source={require('@assets/teste.jpg')} />
            <StyledView>
              <Description>
                <QuizTitle fill="black">Título</QuizTitle>
                {/* <StyledText>Criador: {quiz.teacher}</StyledText> */}
              </Description>
            </StyledView>

            <StyledIconButton>
              <AntDesign name="arrowright" size={24} color="#4B24B1" />
            </StyledIconButton>
          </QuizCard>
        </QuizContainer>
      </StyledScrollView>
    </Container>
  );
};
export default Home;
