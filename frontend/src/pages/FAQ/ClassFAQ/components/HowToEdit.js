import React from 'react';

// ASSETS
import InitialScreen from '@assets/FAQ/TurmasFAQ/initial_screen.png';
import MyClasses from '@assets/FAQ/TurmasFAQ/my_classes.png';
import OpenClassSection from '@assets/FAQ/TurmasFAQ/HowToEdit/open_class_section.png';

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
        Feito isso, preencha as informações necessárias para a criação da turma.
        Para adicionar a imagem, clique na área de adição da imagem ou apenas
        arraste uma até tal área. Título, visibilidade e descrição são campos
        obrigatórios.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={OpenClassSection}
          alt="Seção de turmas públicas aberta."
        />
        <StyledFigureCaption>
          Seção de turmas públicas aberta.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Preenchidas as informações necessárias, basta clicar no botão{' '}
        <TextBold>{`"CRIAR TURMA"`}</TextBold> e pronto, sua Turma foi criada e
        você será redirecionado(a) para a tela de gerenciamento de turmas.
      </StyledParagraph>
    </Wrapper>
  );
};

export default HowToEdit;
