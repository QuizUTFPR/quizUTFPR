import React from 'react';
import { Typography, Divider } from '@mui/material';

// ASSETS
import StudentInfo from '@assets/FAQ/QuizStatisticsFAQ/StudentAnalyses/student_info.png';
import GraphInfo from '@assets/FAQ/QuizStatisticsFAQ/StudentAnalyses/graph_info.png';

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

const StudentAnalyses = () => {
  return (
    <Wrapper>
      <StyledParagraph>
        O gráfico apresentado nesta página é uma forma visual de mostrar a
        quantidade de alunos que atingiram determinadas porcentagens de acerto
        para o quiz. Com isso o professor consegue ter noção se os alunos estão
        bem (ou mal) no processo de resposta do quiz.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={GraphInfo}
          alt="Gráfico de respostas sobre análise por alunos."
        />
        <StyledFigureCaption>
          Gráfico de respostas sobre análise por alunos.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Nesta tela também consegue-se visualizar as respostas de forma separada.
        Para cada aluno, são exibidas as informações de respostas para cada
        questão do quiz, por exemplo, percentual de acerto, tempo de resposta e
        tipo da questão. Além disso, a alternativa escolhida pelo aluno.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={StudentInfo}
          alt="Informações de respostas sobre um aluno."
        />
        <StyledFigureCaption>
          Informações de respostas sobre um aluno.
        </StyledFigureCaption>
      </StyledFigure>
    </Wrapper>
  );
};

export default StudentAnalyses;
