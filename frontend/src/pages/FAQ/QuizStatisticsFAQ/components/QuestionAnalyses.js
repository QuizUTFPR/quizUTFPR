import React from 'react';
import { Typography, Divider } from '@mui/material';

// ASSETS
import QuestionInfo from '@assets/FAQ/QuizStatisticsFAQ/QuestionAnalyses/question_info.png';
import GraphInfo from '@assets/FAQ/QuizStatisticsFAQ/QuestionAnalyses/graph_info.png';

// STYLES
import {
  TextStrongBold,
  TextBold,
  StyledParagraph,
  StyledFigure,
  StyledImg,
  StyledFigureCaption,
  Wrapper,
} from '../../style';

const QuestionAnalyses = () => {
  return (
    <Wrapper>
      <StyledParagraph>
        O gráfico apresentado nesta página é uma forma mostrar visualmente a
        quantidade de questões que atingiram determinadas médias de porcentagem
        de acerto. Com isso o professor consegue ter noção de quais questões
        estão sendo mais (ou menos) acertadas pelos alunos.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={GraphInfo}
          alt="Gráfico de respostas sobre análise de questões."
        />
        <StyledFigureCaption>
          Gráfico de respostas sobre análise de questões.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Nesta tela, também consegue-se visualizar as respostas de forma
        separada. Para cada questão, são exibidas as informações como percentual
        de acerto, tempo médio de resposta e quantidade de jogadores (alunos que
        responderam a questão). Além disso, as alternativas escolhidas por cada
        aluno são mostradas na listagem de Respostas.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={QuestionInfo}
          alt="Informações de respostas sobre uma questão."
        />
        <StyledFigureCaption>
          Informações de respostas sobre uma questão.
        </StyledFigureCaption>
      </StyledFigure>
    </Wrapper>
  );
};

export default QuestionAnalyses;
