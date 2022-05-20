import React from 'react';
import { Divider } from '@mui/material';

// ASSETS
import OrderStatisticsClass from '@assets/FAQ/ClassStatisticsFAQ/HowToSeeStatistics/order_statistics_class.png';

// STYLES
import {
  StyledTypography,
  TextBold,
  StyledFigure,
  StyledImg,
  StyledFigureCaption,
} from '../../style';

const GeneralInfo = () => {
  return (
    <>
      <StyledTypography>O que é Estatísticas da Turma?</StyledTypography>
      <p>
        É uma página onde o professor consegue obter informações sobre o
        processo de resposta dos alunos em relação aos quizzes anexados em sua
        turma.
      </p>

      <Divider style={{ margin: '20px 0' }} />

      <StyledTypography>
        Quais são as formas de ordenação das estatísticas?
      </StyledTypography>

      <StyledFigure>
        <StyledImg
          src={OrderStatisticsClass}
          alt="Ordenar estatísticas de Turmas."
        />
        <StyledFigureCaption>
          Ordenar estatísticas de Turmas.
        </StyledFigureCaption>
      </StyledFigure>

      <p>
        <TextBold>Quizzes Respondidos:</TextBold> a ordenação é feita com base
        nos alunos que responderam a maior quantidade de quizzes (ordem
        crescente).
      </p>

      <p>
        <TextBold>Questões Acertadas:</TextBold> a ordenação é feita com base
        nos alunos que acertaram uma quantidade maior de questões (ordem
        crescente).
      </p>

      <p>
        <TextBold>Quem não respondeu nenhum quiz:</TextBold> é exibido o nome
        dos alunos inscritos na turma que não responderam nenhum quiz vinculado
        à turma.
      </p>
    </>
  );
};

export default GeneralInfo;
