import React from 'react';
import { Divider } from '@mui/material';

// STYLES
import { StyledTypography, TextStrongBold } from '../../style';

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

      <Divider style={{ margin: '20px 0' }} />

      <StyledTypography>O que é uma Turma Privada?</StyledTypography>
      <p>
        Uma turma privada é aquela que não será exibida nas listagens de turmas
        disponíveis para o aluno. Ela só pode ser acessada através do seu PIN.
        Isso é feito caso o professor queira ter um pouco mais de controle a
        respeito de quem está realizando inscrições em suas turmas.
      </p>

      <Divider style={{ margin: '20px 0' }} />

      <StyledTypography>O que é uma Turma Pública?</StyledTypography>
      <p>
        Uma turma pública é aquela que pode ser listada para os alunos. Qualquer
        aluno pode vê-la, acessá-la e inscrever-se na mesma, sem a necessidade
        de saber o seu PIN.
      </p>

      <Divider style={{ margin: '20px 0' }} />

      <StyledTypography>O que é a função de clonar Turma?</StyledTypography>
      <p>
        A função de clonar turmas é uma forma do professor reaproveitar quizzes
        associados a uma turma já existente, sem a necessidade de realizar todo
        o processo de anexar quizzes a turmas novamente.
      </p>
    </>
  );
};

export default GeneralInfo;
