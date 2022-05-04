import { Typography } from '@mui/material';
import React from 'react';

// STYLES
import { StyledTypography, TextStrongBold } from '../style';

const GeneralInfo = () => {
  return (
    <>
      <StyledTypography>O que é um PIN?</StyledTypography>
      <p>
        Um PIN é um identificador único para a Turma. É uma sequência numérica
        que permite ao aluno encontrar a Turma de forma direta no aplicativo.
        <TextStrongBold>
          {' '}
          Também é o meio para acesso a turmas privadas.
        </TextStrongBold>
      </p>

      <StyledTypography>O que é uma Turma Privada?</StyledTypography>
      <p>
        Uma turma privada é aquela que não será exibida nas listagens de turmas
        disponíveis para o aluno. Ela só pode ser acessada através do seu PIN.
        Isso é feito caso o professor queira ter um pouco mais de controle a
        respeito de quem está se inscrevendo em suas turmas.
      </p>

      <StyledTypography>O que é uma Turma Pública?</StyledTypography>
      <p>
        Uma turma pública é aquela que pode ser listada para os alunos. Qualquer
        aluno pode vê-la, acessá-la e inscrever-se na mesma, sem a necessidade
        de saber o seu PIN.
      </p>
    </>
  );
};

export default GeneralInfo;
