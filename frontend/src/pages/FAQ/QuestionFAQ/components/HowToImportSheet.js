import React from 'react';

import { Divider } from '@mui/material';

import ButtonCreateQuestion from '@assets/FAQ/QuestionFAQ/button.png';
import ModalClickButtonImportQuestionSheet from '@assets/FAQ/QuestionFAQ/modal_button_question_sheet.png';
import InputImportQuestionSheet from '@assets/FAQ/QuestionFAQ/input_import_question_sheet.png';

// STYLES
import {
  Wrapper,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../style';

import { TextStrongBold } from '../../style';

const HowToImportSheet = () => {
  return (
    <Wrapper>
      <StyledParagraph>
        É possível utilizar uma planilha eletrônica para a criação de novas
        questões do Quiz.
      </StyledParagraph>

      <StyledParagraph
        as="a"
        href={`${process.env.REACT_APP_BASE_URL}/getQuestionModelSheet`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Para realizar o download do modelo de planilha eletrônica, para a
        criação de questões, clique aqui.
      </StyledParagraph>

      <Divider style={{ margin: '20px 0', width: '100%' }} />

      <StyledParagraph>
        Para realizar a importação, primeiramente clique no botão{' '}
        <TextStrongBold>{`"CRIAR"`}</TextStrongBold> presente no canto inferior
        esquerdo da tela de gerenciamento de questões do quiz.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={ButtonCreateQuestion}
          alt="Botão de criar nova questão no quiz."
        />
        <StyledFigureCaption>
          Botão de criar nova questão no quiz.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Após clicar no botão, uma nova janela será aberta. Sendo assim, clique
        em <TextStrongBold>{`"IMPORTAR PLANILHA DE QUESTÕES"`}</TextStrongBold>.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={ModalClickButtonImportQuestionSheet}
          alt="Botão de importar planilha de questões."
        />
        <StyledFigureCaption>
          Botão de importar planilha de questões.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Uma nova janela será aberta, permitindo o professor importar sua
        planilha de questões.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={InputImportQuestionSheet}
          alt="Campo para importação da planilha de questão."
        />
        <StyledFigureCaption>
          Campo para importação da planilha de questão.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Após a importação, as janelas serão fechadas e seu quiz conterá as
        questões presentes na planilha. Por fim, clique em{' '}
        <TextStrongBold>{`"SALVAR"`}</TextStrongBold> para persistir suas
        alterações.
      </StyledParagraph>
    </Wrapper>
  );
};

export default HowToImportSheet;
