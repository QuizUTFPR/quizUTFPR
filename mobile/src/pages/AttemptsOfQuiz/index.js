/* eslint-disable global-require */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
// import api from '@api';

// COMPONENTS
import Container from '@components/Container';

// ICONS
import { Ionicons } from '@expo/vector-icons';
// import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';

// STYLES
import {
  QuizTitle,
  QuizCard,
  Description,
  // StyledImage,
  TitleText,
  StyledIconButton,
  GoBackButtonWrapper,
  StyledView,
  StyledScrollView,
  QuizContainer,
} from './styles';

const Home = ({ route }) => {
  const navigation = useNavigation();
  const { attempts, teacher } = route.params;

  console.log(attempts);
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
          {attempts.map((item, index) => (
            <QuizCard>
              <StyledView>
                <Description>
                  <QuizTitle fill="black">{`Tentativa: ${
                    index + 1
                  }`}</QuizTitle>
                  <QuizTitle fill="black">{`Score: ${item.score}`}</QuizTitle>
                  <QuizTitle fill="black">{`Acertos: ${item.hit_amount}`}</QuizTitle>
                  <QuizTitle fill="black">{`Professor: ${teacher.name}`}</QuizTitle>
                </Description>
              </StyledView>
            </QuizCard>
          ))}
        </QuizContainer>
      </StyledScrollView>
    </Container>
  );
};
export default Home;
