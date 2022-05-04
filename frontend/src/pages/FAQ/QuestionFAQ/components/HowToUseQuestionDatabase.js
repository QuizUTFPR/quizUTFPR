import React from 'react';

import Create from '@assets/FAQ/QuestionFAQ/create.png';
import Options from '@assets/FAQ/QuestionFAQ/options.png';
import SearchByTagsExample from '@assets/FAQ/QuestionFAQ/search_by_tag_example.png';
import QuestionsOfDatabase from '@assets/FAQ/QuestionFAQ/questions_of_database.png';
import AddingQuestionOfDatabase from '@assets/FAQ/QuestionFAQ/adding_question_of_database.png';

// STYLES
import {
  Wrapper,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../style';

import { TextStrongBold } from '../../style';

const HowToUseQuestionDatabase = () => {
  return (
    <Wrapper>
      <StyledParagraph>
        Na tela de criação de questões para o quiz, no canto inferior esquerdo,
        clique em <TextStrongBold>{`"CRIAR"`}</TextStrongBold>.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={Create} alt="Botão criação de nova questão." />
        <StyledFigureCaption>
          Botão de criação de nova questão.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Um modal será aberto lhe dando opção de escolher como quer criar a nova
        questão. Clique em{' '}
        <TextStrongBold>{`"USAR QUESTÃO DO BANCO"`}</TextStrongBold>.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={Options}
          alt="Modal com opções para criação das questões."
        />
        <StyledFigureCaption>
          Modal com opções para criação das questões.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        A pesquisa é realizada através das tags dadas para as questões. Digite
        uma tag que descreve seu interesse e clique em{' '}
        <TextStrongBold>{`"PESQUISAR"`}</TextStrongBold>.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={SearchByTagsExample}
          alt="Modal para informar as tags."
        />
        <StyledFigureCaption>Modal para informar as tags.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Ao clicar em <TextStrongBold>{`"PESQUISAR"`}</TextStrongBold>, as
        questões que possuem a tag informada serão exibidas (caso existam
        questões com essa tag).
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={QuestionsOfDatabase}
          alt="Modal com listagem das questões que possuem a tag informada."
        />
        <StyledFigureCaption>
          Modal com listagem das questões que possuem a tag informada.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Ao clicar na questão desejada, ela será adicionada ao seu quiz. Caso
        clique novamente, ela será removida.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={AddingQuestionOfDatabase}
          alt="Adicionando questão do banco de questões."
        />
        <StyledFigureCaption>
          Adicionando questão do banco de questões.
        </StyledFigureCaption>
      </StyledFigure>
    </Wrapper>
  );
};

export default HowToUseQuestionDatabase;
