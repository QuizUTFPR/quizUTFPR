/* eslint-disable global-require */
import React from 'react';
import { useNavigation } from '@react-navigation/native';

// COMPONENTS
import Container from '@components/Container';

// ICONS
import { Ionicons } from '@expo/vector-icons';

// STYLES
import {
  QuizTitle,
  QuizCard,
  Description,
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
            <QuizCard key={item.id}>
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
