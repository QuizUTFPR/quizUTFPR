import React from 'react';

// ASSETS
import GetQuizPin from '@assets/FAQ/QuizFAQ/HowStudentAccessQuizViaPin/get_quiz_pin.png';
import HomeScreen from '@assets/FAQ/QuizFAQ/HowStudentAccessQuizViaPin/home_screen.png';
import WritingPin from '@assets/FAQ/QuizFAQ/HowStudentAccessQuizViaPin/writing_pin.png';
import QuizResult from '@assets/FAQ/QuizFAQ/HowStudentAccessQuizViaPin/quiz_result.png';

// STYLES
import {
  Wrapper,
  TextBold,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../style';

const HowStudentAccessQuizViaPin = () => {
  return (
    <Wrapper>
      <StyledParagraph>
        Primeiramente, obtenha o pin do Quiz na tela de listagem de Quizzes.
        Observe na Figura abaixo a localização do PIN do Quiz alvo.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={GetQuizPin} alt="Obtendo PIN do quiz." />
        <StyledFigureCaption>Obtendo PIN do quiz.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Desta forma, o professor deverá repassar aos alunos o PIN do quiz para o
        mesmo inserir na tela <TextBold>{`"Início"`}</TextBold> do aplicativo.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={HomeScreen} alt="Tela inicial do aplicativo." />
        <StyledFigureCaption>Tela inicial do aplicativo.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        O aluno com o PIN em mãos deverá inserir o mesmo no campo de busca de
        Quizzes por PIN
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={WritingPin} alt="Aluno digitando o PIN." />
        <StyledFigureCaption>Aluno digitando o PIN.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Após o aluno clicar no botão de confirmar no teclado, o mesmo será
        redirecionado para a página do Quiz referente ao PIN.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={QuizResult} alt="Resultado da busca de Quiz por PIN." />
        <StyledFigureCaption>
          Resultado da busca de Quiz por PIN.
        </StyledFigureCaption>
      </StyledFigure>
    </Wrapper>
  );
};

export default HowStudentAccessQuizViaPin;
