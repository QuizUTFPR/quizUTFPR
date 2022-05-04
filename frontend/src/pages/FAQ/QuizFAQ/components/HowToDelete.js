import React from 'react';

// ASSETS
import Delete from '@assets/FAQ/QuizFAQ/HowToDelete/delete.png';
import ConfirmDelete from '@assets/FAQ/QuizFAQ/HowToDelete/confirm_delete.png';

// STYLES
import {
  Wrapper,
  TextBold,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../style';

const HowToDelete = () => {
  return (
    <Wrapper>
      <StyledParagraph>
        Na tela de listagem de quizzes, no canto direito do quiz, clique no
        ícone de deleção. Lembre-se que só é possível apagar um quiz antes de
        sua publicação.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={Delete} alt="Tela de listagem de quizzes." />
        <StyledFigureCaption>Quiz com o botão de deleção.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Depois, basta clicar em <TextBold>{`"EXCLUIR"`}</TextBold> para
        confirmar a exclusão do quiz (ou em <TextBold>{`"CANCELAR"`}</TextBold>{' '}
        para cancelar a ação, caso deseje).
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={ConfirmDelete} alt="Confirmação da deleção do quiz." />
        <StyledFigureCaption>
          Confirmação da deleção do quiz.
        </StyledFigureCaption>
      </StyledFigure>
    </Wrapper>
  );
};

export default HowToDelete;
