import React from 'react';

import { Divider } from '@mui/material';

import InitialQuestionOrder from '@assets/FAQ/QuestionFAQ/initial_order.png';
import ClickButtonChangeOrder from '@assets/FAQ/QuestionFAQ/click_button_change_order.png';
import AfterChangeOrder from '@assets/FAQ/QuestionFAQ/after_change_order.png';

// STYLES
import {
  Wrapper,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../style';

const HowToChangeOrder = () => {
  return (
    <Wrapper>
      <StyledParagraph>
        Durante a criação do quiz, o professor pode desejar que determinada
        questão seja respondida antes de outra. Sendo assim, o mesmo necessitará
        definir a ordem correta para as mesmas.
      </StyledParagraph>

      <Divider style={{ margin: '20px 0', width: '100%' }} />

      <StyledParagraph>
        Veja na imagem abaixo um exemplo de questões onde a ordem atual é a
        seguinte: 1, 2, 3.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={InitialQuestionOrder}
          alt="Ordem inicial das questões."
        />
        <StyledFigureCaption>Ordem inicial das questões.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Caso o professor queira mudar a ordem das questões para: 2, 1, 3, o
        mesmo deverá clicar na seta ao lado da questão que deseja alterar a
        ordem. Se deseja mover para cima, deverá clicar na seta virada para
        cima. Caso contrário, deverá criar na seta virada para baixo. Veja na
        imagem abaixo o botão que devemos clicar para colocar a questão 1 como
        sendo a segunda questão do quiz.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={ClickButtonChangeOrder}
          alt="Mudando ordem da questão 1."
        />
        <StyledFigureCaption>Mudando ordem da questão 1.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Após clicar no botão, a ordem das questões estarão mudadas. Observe na
        imagem abaixo o resultado.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={AfterChangeOrder} alt="Ordem final das questões." />
        <StyledFigureCaption>Ordem final das questões.</StyledFigureCaption>
      </StyledFigure>
    </Wrapper>
  );
};

export default HowToChangeOrder;
