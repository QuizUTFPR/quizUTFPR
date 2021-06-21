/* eslint-disable global-require */
import React from 'react';
import { useNavigation } from '@react-navigation/native';

// COMPONENTS
import Container from '@components/Container';

// ICONS
import { AntDesign, FontAwesome } from '@expo/vector-icons';

// STYLES
import {
  HeaderWrapper,
  HeaderInformations,
  HeaderWelcomeTextView,
  StyledTitle,
  StyledParagraph,
  HeaderButton,
  SearchInput,
  InputWrapper,
  BackgroundHeader,
  QuizCard,
  Description,
  StyledWelcome,
  StyledImage,
  // StyledText,
  QuizTitle,
  StyledIconButton,
  StyledView,
  StyledScrollView,
  QuizContainer,
} from './styles';

const fakeData = [
  {
    name: 'Quiz 1',
    teacher: 'Óclin',
  },
  {
    name: 'Quiz 1',
    teacher: 'Óclin',
  },
  {
    name: 'Quiz 1',
    teacher: 'Óclin',
  },
  {
    name: 'Quiz 1',
    teacher: 'Óclin',
  },
];

const Home = () => {
  const navigation = useNavigation();

  return (
    <Container>
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
            <FontAwesome name="search" size={25} color="#4B24B1" />
            <SearchInput placeholder="Digite o PIN" />
          </InputWrapper>
        </BackgroundHeader>
      </HeaderWrapper>

      <StyledScrollView>
        <QuizContainer>
          <QuizTitle>Quizes</QuizTitle>
          {fakeData.map((quiz, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <QuizCard
              key={index}
              // onPress={() => navigation.navigate('CountDown')}
              onPress={() => navigation.navigate('Descricao')}
            >
              <StyledView>
                <StyledImage source={require('@assets/icon.png')} />
                <Description>
                  <StyledTitle fill="black">{quiz.name}</StyledTitle>
                  {/* <StyledText>Criador: {quiz.teacher}</StyledText> */}
                </Description>
              </StyledView>
              <StyledIconButton
                // onPress={() => navigation.navigate('CountDown')}
                onPress={() => navigation.navigate('Descricao')}
              >
                <AntDesign name="arrowright" size={24} color="#4B24B1" />
              </StyledIconButton>
            </QuizCard>
          ))}
        </QuizContainer>
      </StyledScrollView>
    </Container>
  );
};

export default Home;
