/* eslint-disable global-require */
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// ICONS
import { Ionicons } from '@expo/vector-icons';

// COMPONENTS
import Attempts from './Components/Attempts';
import Tags from './Components/Tags';

import {
  QuizAttemptsHeader,
  StyledImageBackground,
  GoBackButtonWrapper,
  StyledIconButton,
  BottomDecoration,
  Description,
  StyledText,
  Divider,
  ButtonsContainer,
  ButtonWrapper,
  StyledButtonNavigation,
} from './styles';

const fakeTags = ['tag1', 'tag2', 'tag tag tag tag 1', 'tag tag 2', 'tag'];

const Home = ({ route }) => {
  const navigation = useNavigation();
  const { attempts, teacher } = route.params;

  const [isAttemptsSelected, setAttemptsSelect] = useState(true);
  const [isTagsSelected, setTagsSelect] = useState(false);

  const handleClickAttemptsSelected = () => {
    setAttemptsSelect(true);
    setTagsSelect(false);
  };

  const handleClickTagsSelected = () => {
    setTagsSelect(true);
    setAttemptsSelect(false);
  };

  return (
    <>
      <QuizAttemptsHeader>
        <StyledImageBackground
          // source={
          //   image.length
          //     ? {
          //         uri: image,
          //       }
          //     : null
          // }
          source={null}
        >
          <GoBackButtonWrapper>
            <StyledIconButton onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={32} color="white" />
            </StyledIconButton>
          </GoBackButtonWrapper>
          <BottomDecoration />
        </StyledImageBackground>
        <Description>
          <StyledText title>Título do Quiz</StyledText>
          <StyledText>By: {teacher.name}</StyledText>
          <StyledText>Qtde. de questões: 1</StyledText>
        </Description>
      </QuizAttemptsHeader>

      <Divider />

      <ButtonsContainer>
        <ButtonWrapper selected={isAttemptsSelected}>
          <StyledButtonNavigation
            selected={isAttemptsSelected}
            onPress={() => handleClickAttemptsSelected()}
          >
            Tentativas
          </StyledButtonNavigation>
        </ButtonWrapper>
        <ButtonWrapper selected={isTagsSelected}>
          <StyledButtonNavigation
            selected={isTagsSelected}
            onPress={() => handleClickTagsSelected()}
          >
            Tags
          </StyledButtonNavigation>
        </ButtonWrapper>
      </ButtonsContainer>

      {isAttemptsSelected && <Attempts attempts={attempts} />}

      {isTagsSelected && <Tags tags={fakeTags} />}
    </>
  );
};

export default Home;
