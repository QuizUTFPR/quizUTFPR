import React from 'react';

// ASSETS
import InitialScreen from '@assets/FAQ/TurmasFAQ/initial_screen.png';
import MyClasses from '@assets/FAQ/TurmasFAQ/my_classes.png';
import EditClass from '@assets/FAQ/TurmasFAQ/HowToEdit/edit_class.png';
import ClickButtonDeleteClass from '@assets/FAQ/TurmasFAQ/HowToDelete/click_button_delete_class.png';
import OpenModalDeleteClass from '@assets/FAQ/TurmasFAQ/HowToDelete/modal_remove_class.png';

// STYLES
import {
  Wrapper,
  TextBold,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../style';

const HowToDelete = () => {
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
        Feito isso, abra a seção onde se encontra a turma que deseja remover
        (pública ou privada).
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={MyClasses} alt="Tela de listagem de turmas." />
        <StyledFigureCaption>Tela de listagem de turmas.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Feito isso, clique no ícone correspondente a remoção da turma.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={ClickButtonDeleteClass}
          alt="Botão de remoção da Turma."
        />
        <StyledFigureCaption>Botão de remoção da Turma.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Uma janela será aberta, possibilitando a confirmação da remoção ou o
        cancelamento da ação.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={OpenModalDeleteClass}
          alt="Modal de remoção da Turma."
        />
        <StyledFigureCaption>Modal de remoção da Turma.</StyledFigureCaption>
      </StyledFigure>
    </Wrapper>
  );
};

export default HowToDelete;
