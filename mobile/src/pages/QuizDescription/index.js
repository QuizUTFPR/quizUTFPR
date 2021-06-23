import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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
  ButtonStyled,
} from './styles';

const QuizDescription = ({ route }) => {
  const navigation = useNavigation();
  const { id, description, title, image, tags } = route.params;
  return (
    <DetailsContainer fill="white">
      <QuizDescriptionHeader>
        <StyledImageBackground source={require('@assets/teste.jpg')}>
          <GoBackButtonWrapper>
            <StyledIconButton onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={32} color="white" />
            </StyledIconButton>
          </GoBackButtonWrapper>
          <ButtonStyled onPress={() => navigation.navigate('CountDown')}>
            <PlayButtonWrapper>
              <StyledIconButton>
                <Ionicons name="ios-play-circle" size={32} color="white" />
              </StyledIconButton>
              <StyledText fill="white">JOGAR</StyledText>
            </PlayButtonWrapper>
          </ButtonStyled>
        </StyledImageBackground>
      </QuizDescriptionHeader>

      <StyledScrollView>
        <BodyDescription>
          <StyledTitle>{title}</StyledTitle>
          <StyledDescriptionText>{description}</StyledDescriptionText>

          <StyledTitle>TAGS</StyledTitle>
          <TagsContainer>
            {tags.map((tag, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <StyledTag key={index}>{tag}</StyledTag>
            ))}
          </TagsContainer>
        </BodyDescription>
      </StyledScrollView>
    </DetailsContainer>
  );
};

export default QuizDescription;
