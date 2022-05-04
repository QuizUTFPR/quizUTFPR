import React from 'react';

import GeneralKnowledge from '@assets/FAQ/QuestionFAQ/general_knowledge.png';
import Example from '@assets/FAQ/QuestionFAQ/example.png';
import Save from '@assets/FAQ/QuestionFAQ/save.png';
import Adding from '@assets/FAQ/QuestionFAQ/adding.png';

// STYLES
import {
  Wrapper,
  TextBold,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
  StyledTypography,
} from '../style';

import { TextStrongBold } from '../../style';

const HowToCreate = () => {
  return (
    <Wrapper>
      <StyledTypography>
        Primeira opção: após a criação do quiz.
      </StyledTypography>

      <StyledParagraph>
        Assim que um quiz for criado, você será redirecionado para a tela de
        criação de questões.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={GeneralKnowledge} alt="Tela de criação de questões." />
        <StyledFigureCaption>Tela de criação de questões.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Preencha as informações da questão como no exemplo abaixo. Por padrão, a
        questão a ser criada é do tipo múltipla escolha, mas pode ser facilmente
        alterada para verdadeiro ou falso no canto direito da tela.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={Example} alt="Exemplo de criação de questão." />
        <StyledFigureCaption>
          Exemplo de criação de questão.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Após criar a questão, para garantir que suas alterações não serão
        perdidas, clique em <TextStrongBold>{`"SALVAR"`}</TextStrongBold>.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={Save} alt="Salvar alterações das questões." />
        <StyledFigureCaption>
          Salvar alterações das questões.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Após criar todas as questões desejadas, clique em{' '}
        <TextStrongBold>{`"Finalizar"`}</TextStrongBold> como mostrado na Figura
        acima e suas questões estarão criadas.
      </StyledParagraph>

      <br />
      <br />
      <StyledTypography>
        Segunda opção: Adicionando questões a um quiz já criado.
      </StyledTypography>

      <StyledParagraph>
        Na listagem de quizzes criados, clique no quiz para o qual se deseja
        adicionar mais questões.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={Adding} alt="Adicionar questões." />
        <StyledFigureCaption>Adicionar questões.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Ao clicar, você será redirecionado para a página de criação de questões.
        Basta realizar a adição das questões como já explicado acima.
      </StyledParagraph>
    </Wrapper>
  );
};

export default HowToCreate;
