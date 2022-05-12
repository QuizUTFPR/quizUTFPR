import React from 'react';
import { Typography, Divider } from '@mui/material';

// STYLES
import { StyledTypography } from '../style';

const GeneralInfo = () => {
  return (
    <>
      <StyledTypography>O que é um PIN?</StyledTypography>
      <p>
        Um PIN é um identificador único para o Quiz. É uma sequência numérica
        que permite ao aluno encontrar o Quiz diretamente sem a necessidade de
        digitar o nome do mesmo. Também é o meio para acesso de quizzes
        privados.
      </p>

      <Divider style={{ margin: '20px 0' }} />

      <StyledTypography>O que é um Quiz Privado?</StyledTypography>
      <p>
        Um quiz privado é aquele que não será exibido nas listagens de quizzes
        disponíveis para o aluno. Ele só pode ser acessado através do seu PIN.
        Isso é feito caso o professor queira ter um pouco mais de controle a
        respeito de quem está respondendo um determinado quiz.
      </p>

      <Divider style={{ margin: '20px 0' }} />

      <StyledTypography>O que é um Quiz Público?</StyledTypography>
      <p>
        Um quiz público é aquele que pode ser listado para os alunos. Qualquer
        aluno pode vê-lo, acessá-lo e respondê-lo sem a necessidade de saber o
        PIN do mesmo.
      </p>

      <Divider style={{ margin: '20px 0' }} />

      <StyledTypography>O que é uma Tag do Quiz?</StyledTypography>
      <p>
        Uma tag é mais uma maneira de identificar um quiz. Por meio dela é
        possível rotular os quizzes para que se possa buscar aqueles que são de
        um determinado assunto. Ela funciona como uma palavra-chave que fornece
        um contexto para o quiz que a possui.
      </p>

      <Divider style={{ margin: '20px 0' }} />

      <StyledTypography>
        O que é o Limite de tempo para as respostas?
      </StyledTypography>
      <p>
        Limite de tempo, como sugere o nome, informa se as questões do quiz
        possuirão ou não um tempo máximo para serem respondidas. Vale ressaltar
        que o tempo das questões é desconsiderado caso o tempo máximo seja
        desconsiderado na criação do quiz.
      </p>

      <Divider style={{ margin: '20px 0' }} />

      <StyledTypography>O que é Publicar um Quiz?</StyledTypography>
      <p>
        Ao finalizar a criação de um quiz, ele ainda não está acessível pelos
        usuários (seja ele público ou privado). Além disso, o quiz ainda está
        editável, podendo ter questões adicionadas, removidas e editadas, bem
        como ser possível a exclusão do quiz. O ato de publicar um quiz implica
        em torná-lo acessível e não permitir mais as alterações informadas
        acima.
      </p>
    </>
  );
};

export default GeneralInfo;
