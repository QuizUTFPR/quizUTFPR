/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import api from '@api';

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

const Home = () => {
  const navigation = useNavigation();
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [pin, setPin] = useState();

  useEffect(() => {
    const getAllPublishedQuizzes = async () => {
      const { data } = await api.get('/publishedQuiz/getAll');
      setAllQuizzes(data);
    };

    getAllPublishedQuizzes();
  }, []);

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
            <SearchInput
              defaultValue={pin}
              onSubmitEditing={() => console.log('pin', pin)}
              onChangeText={(pinText) => setPin(pinText)}
              placeholder="Digite o PIN"
            />
          </InputWrapper>
        </BackgroundHeader>
      </HeaderWrapper>

      <StyledScrollView>
        <QuizContainer>
          <QuizTitle>Quizes</QuizTitle>
          {allQuizzes.map((quiz) => (
            <QuizCard key={quiz.id}>
              <StyledView>
                <StyledImage source={require('@assets/teste.jpg')} />
                <Description>
                  <StyledTitle fill="black">{quiz.title}</StyledTitle>
                  {/* <StyledText>Criador: {quiz.teacher}</StyledText> */}
                </Description>
              </StyledView>
              <StyledIconButton
                onPress={() =>
                  navigation.navigate('Descricao', {
                    id: quiz.id,
                    title: quiz.title,
                    description: quiz.description,
                    // image: quiz.image_quiz.url,
                    tags: quiz.tags_quiz.map((tag) => tag.name),
                  })
                }
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
