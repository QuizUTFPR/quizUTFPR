import React from 'react';

// ASSETS
import InitialScreen from '@assets/FAQ/TurmasFAQ/initial_screen.png';
import MyClasses from '@assets/FAQ/TurmasFAQ/my_classes.png';
import ClickButtonEditClass from '@assets/FAQ/TurmasFAQ/HowToEdit/click_button_edit_class.png';
import EditClass from '@assets/FAQ/TurmasFAQ/HowToEdit/edit_class.png';

// STYLES
import {
  Wrapper,
  TextBold,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../style';

const HowToEdit = () => {
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
        Feito isso, abra a seção onde se encontra a turma que deseja editar
        (pública ou privada).
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={MyClasses} alt="Tela de listagem de turmas." />
        <StyledFigureCaption>Tela de listagem de turmas.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Feito isso, clique no ícone correspondente a edição da turma.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={ClickButtonEditClass} alt="Botão de edição da Turma." />
        <StyledFigureCaption>Botão de edição da Turma.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Uma janela será aberta, possibilitando a alterações de informações sobre
        a Turma.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={EditClass} alt="Modal de edição da Turma." />
        <StyledFigureCaption>Modal de edição da Turma.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Após preencher as informações que deseja alterar, basta clicar no botão{' '}
        <TextBold>{`"SALVAR ALTERAÇÕES"`}</TextBold> e pronto, sua Turma será
        editada.
      </StyledParagraph>
    </Wrapper>
  );
};

export default HowToEdit;
