import React from 'react';
import { Divider } from '@mui/material';

// ASSETS
import QuestionDetail from '@assets/FAQ/QuestionFAQ/question_info.png';

// STYLES
import {
  Wrapper,
  TextBold,
  StyledFigure,
  StyledImg,
  StyledFigureCaption,
} from '../style';

const GeneralInfo = () => {
  return (
    <>
      <Wrapper>
        <StyledFigure>
          <StyledImg
            src={QuestionDetail}
            alt="Detalhes da criação da questão."
          />
          <StyledFigureCaption>
            Detalhes da criação da questão.
          </StyledFigureCaption>
        </StyledFigure>
      </Wrapper>

      <p>
        <TextBold>Tipo da Questão: </TextBold>
        permite o professor mudar o tipo da questão criada, podendo escolher
        entre: múltipla escolha (pode haver mais de um correta) ou
        verdadeiro/falso (somente uma correta).
      </p>

      <Divider style={{ margin: '20px 0' }} />

      <p>
        <TextBold>Tempo: </TextBold>é o tempo máximo que o aluno terá para
        responder a questão.
      </p>

      <Divider style={{ margin: '20px 0' }} />

      <p>
        <TextBold>Nível de Dificuldade: </TextBold> permite o professor escolher
        o quão díficil é a questão (no momento não tem impacto no cálculo do
        score do aluno).
      </p>

      <Divider style={{ margin: '20px 0' }} />

      <p>
        <TextBold>Tags: </TextBold> são palavras-chave pelas quais a questão
        pode ser buscada no banco de questões. O campo é obrigatorio caso o
        professor marque a opção{' '}
        <TextBold>{`"Disponível no Banco de Questões"`}</TextBold>.
      </p>

      <Divider style={{ margin: '20px 0' }} />

      <p>
        <TextBold>Disponível no Banco de Questões: </TextBold> usado para
        informar que a questão poderá ser reutilizada em outros quizzes. Ou
        seja, ela estará presente no banco de questões.
      </p>
    </>
  );
};

export default GeneralInfo;
