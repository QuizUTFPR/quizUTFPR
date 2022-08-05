import React from 'react';

import Latex from '@assets/FAQ/QuestionFAQ/latex.png';

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
        É possível utilzar LaTeX na criação das questões, o que pode ser
        interessante para inserção de notações matemáticas. Para tanto, basta
        adicionar <TextStrongBold>$$</TextStrongBold> e escrever entre os dois
        caraceteres no campo em que se deseja adicionar o LaTeX.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={Latex} alt="Usando LaTeX para criação de questão." />
        <StyledFigureCaption>
          Usando LaTeX para criação de questão.
        </StyledFigureCaption>
      </StyledFigure>
    </Wrapper>
  );
};

export default HowToUseLatex;
