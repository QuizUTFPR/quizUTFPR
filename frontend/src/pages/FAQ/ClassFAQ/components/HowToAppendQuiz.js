import React from 'react';

// ASSETS
import InitialScreen from '@assets/FAQ/TurmasFAQ/initial_screen.png';
import MyClasses from '@assets/FAQ/TurmasFAQ/my_classes.png';
import OpenManageClass from '@assets/FAQ/TurmasFAQ/HowToAppendQuiz/open_manage_class.png';
import InitialPageManageClass from '@assets/FAQ/TurmasFAQ/HowToAppendQuiz/initial_page_manage_class.png';
import ListQuizInClass from '@assets/FAQ/TurmasFAQ/HowToAppendQuiz/list_quiz_in_class.png';
import ModalAppendQuiz from '@assets/FAQ/TurmasFAQ/HowToAppendQuiz/modal_append_quiz.png';

// STYLES
import {
  Wrapper,
  TextBold,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../../style';

const HowToAppendQuiz = () => {
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
        Abra a seção (pública ou privada) onde se encontra a turma para a qual
        os quizzes serão vinculados.
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
        vincular novos quizzes à turma, clique em{' '}
        <TextBold>{`"Quizzes"`}</TextBold>.
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
        Após isso, uma nova página será mostrada, contendo todos os quizzes já
        vinculados em sua Turma. Para vincular um novo quiz, clique em
        <TextBold>{` "VINCULAR QUIZ"`}</TextBold>.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={ListQuizInClass}
          alt="Tela de gerenciamento de Turmas."
        />
        <StyledFigureCaption>
          Tela de gerenciamento de Turmas.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        A próxima janela a ser aberta irá conter todos os seus quizzes
        publicados. Para vincular quizzes, basta clicar em cima do mesmo.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={ModalAppendQuiz} alt="Modal para vincular quizzes." />
        <StyledFigureCaption>
          Modal para vincular quizzes na Turma.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Finalizado o processo, os quizzes selecionados já estarão vinculados em
        sua Turma.
      </StyledParagraph>
    </Wrapper>
  );
};

export default HowToAppendQuiz;
