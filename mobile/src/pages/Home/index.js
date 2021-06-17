import React from 'react';
import { useNavigation } from '@react-navigation/native';

// COMPONENTS
import Container from '@components/Container';
import { ScrollView, View } from 'react-native';

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
  StyledImage,
  StyledText,
  QuizTitle,
  StyledIconButton,
  StyledIcon,
  StyledView,
} from './styles';

const fakeData = [
  {
    name: 'quiz 1',
    teacher: 'Óclin',
  },
  {
    name: 'quiz 1',
    teacher: 'Óclin',
  },
  {
    name: 'quiz 1',
    teacher: 'Óclin',
  },
  {
    name: 'quiz 1',
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
              <StyledTitle fill="white">Seja bem-vindo,</StyledTitle>
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

      <QuizTitle>Quizes</QuizTitle>
      <ScrollView>
        {fakeData.map((quiz, index) => (
          <QuizCard key={index} onPress={() => {}}>
            <StyledView>
              <StyledImage source={require('@assets/icon.png')} />
              <Description>
                <StyledText>{quiz.name}</StyledText>
                <StyledText>Criador: {quiz.teacher}</StyledText>
              </Description>
            </StyledView>
            <StyledIconButton onPress={() => navigation.navigate('CountDown')}>
              <AntDesign name="play" size={50} color="black" />
            </StyledIconButton>
          </QuizCard>
        ))}
      </ScrollView>
    </Container>
  );
};

export default Home;
