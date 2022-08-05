import React from 'react';

// ASSETS
import InitialScreen from '@assets/FAQ/TurmasFAQ/initial_screen.png';
import MyClasses from '@assets/FAQ/TurmasFAQ/my_classes.png';
import CreateClass from '@assets/FAQ/TurmasFAQ/HowToCreate/create_class.png';

// STYLES
import {
  Wrapper,
  TextBold,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../../style';

const HowToCreate = () => {
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
        No canto superior direito da tela de turmas, clique no botão{' '}
        <TextBold>{`"CRIAR TURMA"`}</TextBold>.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={MyClasses} alt="Tela de listagem de turmas." />
        <StyledFigureCaption>Tela de listagem de turmas.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Preencha as informações necessárias para a criação da turma. Para
        adicionar a imagem, clique na área de adição da imagem ou apenas arraste
        uma até tal área. Nome da Turma, descrição e visibilidade são campos
        obrigatórios.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={CreateClass} alt="Tela de criação de turmas." />
        <StyledFigureCaption>Tela de criação de turmas.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Preenchidas as informações necessárias, basta clicar no botão{' '}
        <TextBold>{`"CRIAR TURMA"`}</TextBold> e pronto, sua Turma foi criada e
        você será redirecionado(a) para a tela de gerenciamento de turmas.
      </StyledParagraph>
    </Wrapper>
  );
};

export default HowToCreate;
