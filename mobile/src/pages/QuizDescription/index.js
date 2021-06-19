import React from 'react';
import { Ionicons } from '@expo/vector-icons';

// COMPONENTS
import Container from '@components/Container';

// STYLES
import {
  QuizDescriptionHeader,
  StyledImageBackground,
  GoBackButtonWrapper,
  StyledIconButton,
  StyledText,
  PlayButtonWrapper,
  StyledScrollView,
  BodyDescription,
  StyledTitle,
  StyledDescriptionText,
  TagsContainer,
  StyledTag,
} from './styles';

const fakeTags = [
  'tag',
  'tagtagtagtag',
  'tagtagtag',
  'tag',
  'tag',
  'tagtag',
  'tag',
];

const QuizDescription = ({ navigation }) => {
  return (
    <Container>
      <QuizDescriptionHeader>
        <StyledImageBackground source={require('@assets/icon.png')}>
          <GoBackButtonWrapper>
            <StyledIconButton onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={32} color="black" />
            </StyledIconButton>
            <StyledText onPress={() => navigation.goBack()}>
              Título do Quiz
            </StyledText>
          </GoBackButtonWrapper>
          <PlayButtonWrapper>
            <StyledIconButton onPress={() => {}}>
              <Ionicons name="ios-play-circle" size={32} color="black" />
            </StyledIconButton>
            <StyledText onPress={() => {}}>JOGAR</StyledText>
          </PlayButtonWrapper>
        </StyledImageBackground>
      </QuizDescriptionHeader>

      <StyledScrollView>
        <BodyDescription>
          <StyledTitle>DESCRIÇÃO</StyledTitle>
          <StyledDescriptionText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            beatae asperiores maiores, deleniti molestias expedita! Iste ipsum
            magni quaerat, tenetur dignissimos aliquam asperiores error sed
            eaque ipsam, voluptate ab quia?
          </StyledDescriptionText>

          <StyledTitle>TAGS</StyledTitle>
          <TagsContainer>
            {fakeTags.map((tag, index) => (
              <StyledTag key={index}>{tag}</StyledTag>
            ))}
          </TagsContainer>
        </BodyDescription>
      </StyledScrollView>
    </Container>
  );
};

export default QuizDescription;
