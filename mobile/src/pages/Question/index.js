import React from 'react';
import { IconButton, Button, useTheme } from 'react-native-paper';
import CircleCheckBox from 'react-native-circle-checkbox';

// COMPONENTS
import Container from '@components/Container';

// STYLES
import {
  Header,
  Footer,
  CurrentQuestion,
  QuestionDescription,
  QuestionImage,
  QuestionText,
  AnswerContainer,
  AnswerText,
  StyledButton,
  ScrollWrapper,
} from './styles';

const fakeAnswers = [
  'Amarelo',
  'Roxo',
  'Azul',
  'Tijolo',
  'Maça',
  'Lajota',
  'Teste',
];

const Question = () => {
  const { label } = useTheme();

  return (
    <Container>
      <Header>
        <IconButton icon="close" onPress={() => {}} />
        <CurrentQuestion fontSize={label.fontSize}>
          Questão 01/20
        </CurrentQuestion>
        <IconButton icon="timer" onPress={() => {}} />
      </Header>

      <ScrollWrapper>
        <QuestionDescription>
          {/* eslint-disable-next-line global-require */}
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
      </ScrollWrapper>
      <Footer>
        <Button mode="text" onPress={() => {}}>
          Pular
        </Button>
        <StyledButton onPress={() => {}}>Confirmar</StyledButton>
      </Footer>
    </Container>
  );
};

export default Question;
