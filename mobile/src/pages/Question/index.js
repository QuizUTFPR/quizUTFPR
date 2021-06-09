import React, { useState } from 'react';
import { IconButton, Headline, Button, useTheme } from 'react-native-paper';
import CircleCheckBox from 'react-native-circle-checkbox';

// COMPONENTS
import Container from '@components/Container';

// STYLES
import {
  Header,
  Footer,
  Body,
  CurrentQuestion,
  QuestionDescription,
  QuestionImage,
  QuestionText,
  AnswerContainer,
  AnswerText,
  StyledButton,
  ScrollWrapper,
} from './styles';

const fakeAnswers = ['Amarelo', 'Roxo', 'Azul', 'Tijolo'];

const Question = () => {
  const { label } = useTheme();

  return (
    <>
      <Container>
        <Header>
          <IconButton icon="close" onPress={() => {}} />
          <CurrentQuestion fontSize={label.fontSize}>
            Questão 01/20
          </CurrentQuestion>
          <IconButton icon="timer" onPress={() => {}} />
        </Header>

        <ScrollWrapper>
          <Body>
            <QuestionDescription>
              <QuestionImage source={require('@assets/icon.png')} />

              <QuestionText fontSize={label.fontSize}>
                Qual a cor do líquido de Erlenmeyer?
              </QuestionText>
            </QuestionDescription>

            {fakeAnswers.map((answer) => (
              <AnswerContainer key={answer}>
                <AnswerText fontSize={label.fontSize}>{answer}</AnswerText>
                <CircleCheckBox
                  outerColor="#333d54"
                  innerColor="#333d54"
                  onToggle={() => {}}
                />
              </AnswerContainer>
            ))}
          </Body>
        </ScrollWrapper>
      </Container>

      <Footer>
        <Button mode="text" onPress={() => {}}>
          Pular
        </Button>
        <StyledButton onPress={() => {}}>Confirmar</StyledButton>
      </Footer>
    </>
  );
};

export default Question;
