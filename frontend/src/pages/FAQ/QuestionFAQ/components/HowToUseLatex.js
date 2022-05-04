import React from 'react';

import GeneralKnowledge from '@assets/FAQ/QuestionFAQ/HowToCreate/general_knowledge.png';
import Latex from '@assets/FAQ/QuestionFAQ/HowToCreate/latex.png';

// STYLES
import {
  Wrapper,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../style';

import { TextStrongBold } from '../../style';

const HowToUseLatex = () => {
  return (
    <Wrapper>
      <StyledParagraph>
        É possível utilzar LaTex na criação das questões, o que pode ser
        interessante para inserção de notações matemáticas. Para tanto, basta
        adicionar <TextStrongBold>$$</TextStrongBold> no campo em que se deseja
        adicionar o LaTex.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={Latex} alt="Usando LaTex para criação de questão." />
        <StyledFigureCaption>
          Usando LaTex para criação de questão.
        </StyledFigureCaption>
      </StyledFigure>
    </Wrapper>
  );
};

export default HowToUseLatex;
