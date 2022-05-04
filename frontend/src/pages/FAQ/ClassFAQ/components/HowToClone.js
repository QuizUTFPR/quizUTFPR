import React from 'react';

// ASSETS
import InitialScreen from '@assets/FAQ/TurmasFAQ/initial_screen.png';
import MyClasses from '@assets/FAQ/TurmasFAQ/my_classes.png';
import ClickButtonCloneClass from '@assets/FAQ/TurmasFAQ/HowToClone/click_button_clone_class.png';
import CloneClass from '@assets/FAQ/TurmasFAQ/HowToClone/clone_class.png';

// STYLES
import {
  Wrapper,
  TextBold,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../style';

const HowToClone = () => {
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
        Feito isso, abra a seção onde se encontra a turma que deseja clonar
        (pública ou privada).
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={MyClasses} alt="Tela de listagem de turmas." />
        <StyledFigureCaption>Tela de listagem de turmas.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Feito isso, clique no ícone correspondente a ação de clonar turma.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={ClickButtonCloneClass} alt="Botão de clonar Turma." />
        <StyledFigureCaption>Botão de clonar Turma.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Uma janela será aberta, possibilitando a alterações de informações da
        Turma clonada.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={CloneClass} alt="Modal de clonar Turma." />
        <StyledFigureCaption>Modal de clonar Turma.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Após preencher as informações necessárias, basta clicar no botão{' '}
        <TextBold>{`"CLONAR TURMA"`}</TextBold> e pronto, sua Turma será
        clonada.
      </StyledParagraph>
    </Wrapper>
  );
};

export default HowToClone;
