import React from 'react';
import { Ionicons } from '@expo/vector-icons';

// STYLES
import {
  DetailsContainer,
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

const QuizDescription = ({ navigation }) => (
  <DetailsContainer fill="white">
    <QuizDescriptionHeader>
      <StyledImageBackground source={require('@assets/teste.jpg')}>
        <GoBackButtonWrapper>
          <StyledIconButton onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={32} color="white" />
          </StyledIconButton>
        </GoBackButtonWrapper>
        <PlayButtonWrapper>
          <StyledIconButton onPress={() => {}}>
            <Ionicons name="ios-play-circle" size={32} color="white" />
          </StyledIconButton>
          <StyledText fill="white" onPress={() => {}}>
            JOGAR
          </StyledText>
        </PlayButtonWrapper>
      </StyledImageBackground>
    </QuizDescriptionHeader>

    <StyledScrollView>
      <BodyDescription>
        <StyledTitle>Título do Quiz</StyledTitle>
        <StyledDescriptionText>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          beatae asperiores maiores, deleniti molestias expedita! Iste ipsum
          magni quaerat, tenetur dignissimos aliquam asperiores error sed eaque
          ipsam, voluptate ab quia?
        </StyledDescriptionText>

        <StyledTitle>TAGS</StyledTitle>
        <TagsContainer>
          {fakeTags.map((tag, index) => (
            <StyledTag key={index}>{tag}</StyledTag>
          ))}
        </TagsContainer>
      </BodyDescription>
    </StyledScrollView>
  </DetailsContainer>
);

export default QuizDescription;
