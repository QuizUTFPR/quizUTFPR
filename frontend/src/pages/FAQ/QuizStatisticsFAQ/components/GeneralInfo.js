import React from 'react';
import { Typography, Divider } from '@mui/material';

// ASSETS
import FilterStatisticsClass from '@assets/FAQ/QuizStatisticsFAQ/filter_statistics_quiz.png';
import FilterClass from '@assets/FAQ/QuizStatisticsFAQ/filter_class.png';
import FilterAttempt from '@assets/FAQ/QuizStatisticsFAQ/filter_attempt.png';

// STYLES
import {
  StyledTypography,
  TextBold,
  StyledFigure,
  StyledImg,
  StyledFigureCaption,
  TextStrongBold,
} from '../../style';

const GeneralInfo = () => {
  return (
    <>
      <StyledTypography>O que é {`"Estatísticas do Quiz?"`}</StyledTypography>
      <p>
        É uma página que reune dados sobre as respostas dos alunos a um quiz
        específico. Esta possibilita ao professor realizar análises mais
        detalhadas para cada questão ou aluno.
      </p>

      <Divider style={{ margin: '20px 0' }} />

      <StyledTypography>
        Quais são as formas de filtragem de estatísticas?
      </StyledTypography>
      <p>
        A filtragem das estatísticas do quiz é feita pela combinação de duas
        variáveis: Turmas e Tentativa.
      </p>

      <StyledFigure>
        <StyledImg
          src={FilterStatisticsClass}
          alt="Filtrar estatísticas do Quiz."
        />
        <StyledFigureCaption>Filtrar estatísticas do Quiz.</StyledFigureCaption>
      </StyledFigure>

      <Divider style={{ margin: '20px 0' }} />

      <p>
        <TextStrongBold>Filtrar por Turmas:</TextStrongBold> as respostas são
        filtradas de acordo com a turma selecionada. As turmas listadas são as
        que possuem o quiz vínculado.
      </p>
      <StyledFigure>
        <StyledImg src={FilterClass} alt="Filtragem por Turmas." />
        <StyledFigureCaption>Filtrar por Turmas.</StyledFigureCaption>
      </StyledFigure>

      <Divider style={{ margin: '20px 0' }} />

      <p>
        <TextStrongBold>Filtrar por Tentativa:</TextStrongBold> é a forma como
        será selecionada a tentativa de resposta dos alunos.
      </p>

      <StyledFigure>
        <StyledImg src={FilterAttempt} alt="Filtrar por Tentativas." />
        <StyledFigureCaption>Filtrar por Tentativas.</StyledFigureCaption>
      </StyledFigure>

      <p>
        <TextStrongBold>Melhor Tentativa:</TextStrongBold> a tentativa escolhida
        de cada aluno será a que possuir maior pontuação.
      </p>

      <p>
        <TextStrongBold>Pior Tentativa:</TextStrongBold> a tentativa escolhida
        de cada aluno será a que possuir menor pontuação.
      </p>

      <p>
        <TextStrongBold>Primeira Tentativa:</TextStrongBold> a primeira
        tentativa de cada aluno será selecionada.
      </p>
    </>
  );
};

export default GeneralInfo;
