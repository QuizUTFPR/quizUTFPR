import React from 'react';

// ASSETS
import QuizzesList from '@assets/FAQ/QuizFAQ/HowToEdit/quizzes_list.png';
import Edit from '@assets/FAQ/QuizFAQ/HowToEdit/edit.png';

// STYLES
import {
  Wrapper,
  TextBold,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../style';

const HowToEdit = () => {
  return (
    <Wrapper>
      <StyledParagraph>
        Na tela de listagem dos quizzes, no canto lateral direito do quiz,
        clique no ícone de edição. Lembre-se que essa edição é apenas das
        informações mais gerais do quiz (imagem, título, descrição, etc.)
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={QuizzesList} alt="Tela de listagem dos quizzes." />
        <StyledFigureCaption>Tela de listagem dos quizzes.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Agora basta alterar as informações desejadas e clicar em{' '}
        <TextBold>{`"SALVAR ALTERAÇÕES"`}</TextBold>.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={Edit} alt="Edição das informações de um quiz." />
        <StyledFigureCaption>
          Edição das informações de um quiz.
        </StyledFigureCaption>
      </StyledFigure>
    </Wrapper>
  );
};

export default HowToEdit;
