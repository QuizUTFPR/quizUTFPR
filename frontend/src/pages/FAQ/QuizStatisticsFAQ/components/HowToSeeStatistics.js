import React from 'react';

// ASSETS
import InitialScreen from '@assets/FAQ/QuizStatisticsFAQ/initial_screen.png';

import ClickButtonStatisticsQuiz from '@assets/FAQ/QuizStatisticsFAQ/HowToSeeStatistics/click_button_statistics_class.png';
import StatisticsQuiz from '@assets/FAQ/QuizStatisticsFAQ/HowToSeeStatistics/statistics_quiz.png';
import InitialPageManageClass from '@assets/FAQ/ClassStatisticsFAQ/HowToSeeStatistics/initial_page_manage_class.png';
import ListStatisticsInClass from '@assets/FAQ/ClassStatisticsFAQ/HowToSeeStatistics/list_statistics_in_class.png';
import OrderStatisticsClass from '@assets/FAQ/ClassStatisticsFAQ/HowToSeeStatistics/order_statistics_class.png';

// STYLES
import {
  Wrapper,
  TextBold,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../../style';

const HowToSeeStatistics = () => {
  return (
    <Wrapper>
      <StyledParagraph>
        No canto esquerdo da tela inicial, clique em{' '}
        <TextBold>{`"Meus Quizzes"`}</TextBold>.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={InitialScreen} alt={`Menu com botão "meus quizzes".`} />
        <StyledFigureCaption>
          Menu com botão {`"meus quizzes"`}.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Clique no ícone correspondente a estatística do Quiz.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={ClickButtonStatisticsQuiz}
          alt="Abrir estatísticas do Quiz."
        />
        <StyledFigureCaption>Abrir estatísticas do Quiz.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Uma página será aberta, possibilitando a visualização das estatísticas
        do Quiz.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={StatisticsQuiz} alt="Tela de estatística do Quiz." />
        <StyledFigureCaption>Tela de estatística do Quiz.</StyledFigureCaption>
      </StyledFigure>
    </Wrapper>
  );
};

export default HowToSeeStatistics;
