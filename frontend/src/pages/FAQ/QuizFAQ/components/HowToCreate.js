import React from 'react';

// ASSETS
import Menu from '@assets/FAQ/QuizFAQ/HowToCreate/menu.png';
import MyQuizzes from '@assets/FAQ/QuizFAQ/HowToCreate/my_quizzes.png';
import Create from '@assets/FAQ/QuizFAQ/HowToCreate/create_quiz.png';
import SelectVisibility from '@assets/FAQ/QuizFAQ/HowToCreate/select_visibility.png';
import SetTimeOrNot from '@assets/FAQ/QuizFAQ/HowToCreate/set_time_or_not.png';

// STYLES
import {
  Wrapper,
  TextBold,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../style';
import { TextStrongBold } from '../../style';

const HowToCreate = () => {
  return (
    <Wrapper>
      <StyledParagraph>
        No canto esquerdo da tela inicial, clique em{' '}
        <TextBold>{`"Meus Quizzes"`}</TextBold>.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={Menu} alt="Tela inicial do Painel de Controle." />
        <StyledFigureCaption>
          Menu com botão {`"meus quizzes"`}.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        No canto superior direito da tela de listagem de quizzes, clique no
        botão <TextBold>{`"CRIAR QUIZ"`}</TextBold>.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={MyQuizzes} alt="Tela de listagem dos quizzes." />
        <StyledFigureCaption>
          Card com o botão {`"CRIAR QUIZ"`}.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Agora é só preencher as informações necessárias para a criação do quiz.
        Para adicionar a imagem, clique na área de adição da imagem ou apenas
        arraste uma até tal área. Título, visibilidade e descrição são campos
        obrigatórios.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={Create} alt="Tela de criação do quiz." />
        <StyledFigureCaption>Tela de Criação do quiz.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Para alterar a visibilidade do quiz, basta selecionar se ele será
        público ou privado.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={SelectVisibility}
          alt="Seleção da visibilidade do quiz."
        />
        <StyledFigureCaption>
          Seleção da visibilidade do quiz.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Para desabilitar o tempo máximo para resposta da questão, basta clicar
        na opção{' '}
        <TextBold>{`"Desabilitar limite de tempo para respostas"`}</TextBold>.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={SetTimeOrNot} alt="Qestões possuem tempo ou não?" />
        <StyledFigureCaption>Quiz possui tempo ou não?</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Preenchidas as informações necessárias, basta clicar no botão{' '}
        <TextBold>{`"CRIAR QUIZ"`}</TextBold> e pronto, seu quiz foi criado e
        você será redirecionado(a) para a tela de criação de questões.
      </StyledParagraph>
    </Wrapper>
  );
};

export default HowToCreate;
