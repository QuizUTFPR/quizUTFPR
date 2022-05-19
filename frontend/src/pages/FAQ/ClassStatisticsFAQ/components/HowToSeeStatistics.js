import React from 'react';

// ASSETS
import InitialScreen from '@assets/FAQ/TurmasFAQ/initial_screen.png';
import MyClasses from '@assets/FAQ/TurmasFAQ/my_classes.png';
import OpenManageClass from '@assets/FAQ/TurmasFAQ/HowToAppendQuiz/open_manage_class.png';
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
        <TextBold>{`"Minhas Turmas"`}</TextBold>.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={InitialScreen} alt="Menu com botao minhas turmas." />
        <StyledFigureCaption>Menu com botao minhas turmas.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Abra a seção onde se encontra a turma que deseja vincular quizzes
        (pública ou privada).
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={MyClasses} alt="Tela de listagem de turmas." />
        <StyledFigureCaption>Tela de listagem de turmas.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Clique na área de título e descrição da Turma para abrir o gerenciador
        de turmas.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={OpenManageClass} alt="Abrir gerenciador de turms." />
        <StyledFigureCaption>Abrir gerenciador de turms.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Uma página será aberta, possibilitando o gerenciamento da Turma. Para
        vincular novos quizzes a turma, clique em{' '}
        <TextBold>{`"Estatística"`}</TextBold>.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={InitialPageManageClass}
          alt="Tela de gerenciamento de Turmas."
        />
        <StyledFigureCaption>
          Tela de gerenciamento de Turmas.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Após isso, uma nova página será mostrada, contendo informações sobre as
        respostas dos alunos em relação a todos os quizzes vinculados na Turma.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={ListStatisticsInClass}
          alt="Tela de estatísticas de Turmas."
        />
        <StyledFigureCaption>
          Tela de estatísticas de Turmas.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Existe a possibilitade de mudar a listagem exibida na tela mostrada.
        Para isso, utilizamos o campo <TextBold>{`"Ordenar por" `}</TextBold>
        para selecionar a forma de ordenação:
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={OrderStatisticsClass}
          alt="Ordenar estatísticas de Turmas."
        />
        <StyledFigureCaption>
          Ordenar estatísticas de Turmas.
        </StyledFigureCaption>
      </StyledFigure>
    </Wrapper>
  );
};

export default HowToSeeStatistics;
