import React from 'react';

// ASSETS
import Publish from '@assets/FAQ/QuizFAQ/HowToPublish/publish.png';
import ConfirmPublish from '@assets/FAQ/QuizFAQ/HowToPublish/confirm_publish.png';

// STYLES
import {
  Wrapper,
  TextBold,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../style';

const HowToPublish = () => {
  return (
    <Wrapper>
      <StyledParagraph>
        Na listagem de quizzes, no canto direito do quiz, clique no ícone de
        publicação do quiz.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={Publish} alt="Listagem dos quizzes" />
        <StyledFigureCaption>Listagem dos quizzes.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Agora basta clicar em <TextBold>{`"PUBLICAR"`}</TextBold> para publicar
        o quiz ou em <TextBold>{`"CANCELAR"`}</TextBold> para cancelar a ação.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={ConfirmPublish} alt="Confirmação da publicação." />
        <StyledFigureCaption>Confirmação da publicação.</StyledFigureCaption>
      </StyledFigure>
    </Wrapper>
  );
};

export default HowToPublish;
