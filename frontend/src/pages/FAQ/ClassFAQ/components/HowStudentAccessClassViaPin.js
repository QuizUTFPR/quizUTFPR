import React from 'react';

// ASSETS
import GetClassPin from '@assets/FAQ/TurmasFAQ/HowStudentAccessClassViaPin/get_class_pin.png';
import ClassScreen from '@assets/FAQ/TurmasFAQ/HowStudentAccessClassViaPin/class_screen.png';
import ModalClassPin from '@assets/FAQ/TurmasFAQ/HowStudentAccessClassViaPin/modal_class_pin.png';
import WritingPIN from '@assets/FAQ/TurmasFAQ/HowStudentAccessClassViaPin/writing_pin.png';
import ClassInfo from '@assets/FAQ/TurmasFAQ/HowStudentAccessClassViaPin/class_info.png';
import StudentRegistered from '@assets/FAQ/TurmasFAQ/HowStudentAccessClassViaPin/student_registered.png';

// STYLES
import {
  Wrapper,
  TextBold,
  StyledImg,
  StyledParagraph,
  StyledFigure,
  StyledFigureCaption,
} from '../style';

const HowStudentAccessClassViaPin = () => {
  return (
    <Wrapper>
      <StyledParagraph>
        Primeiramente, obtenha o PIN da Turma na tela de listagem de Turmas.
        Observe na Figura abaixo a localização do PIN da Turma alvo.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={GetClassPin} alt="Obtendo PIN de turma." />
        <StyledFigureCaption>Obtendo PIN de turma.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        O professor deverá repassar aos alunos o PIN da turma para o mesmo
        inserir na tela <TextBold>{`"Turmas"`}</TextBold> do aplicativo. O aluno
        deverá clicar no botão da lupa no canto inferior direito com o ícone.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={ClassScreen} alt="Tela de turmas do aplicativo." />
        <StyledFigureCaption>Tela de turmas do aplicativo.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Após isso uma nova janela será aberta para a inserção do PIN referente a
        Turma.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg
          src={ModalClassPin}
          alt="Janela para inserção do PIN da turma."
        />
        <StyledFigureCaption>
          AJanela para inserção do PIN da turma.
        </StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Com o PIN da Turma em mãos, o aluno deverá digitar o mesmo no campo de
        texto presente na janela aberta.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={WritingPIN} alt="Aluno digitando PIN." />
        <StyledFigureCaption>Aluno digitando PIN.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        Após o aluno clicar no botão <TextBold>{`"PESQUISAR"`}</TextBold>, o
        mesmo será redirecionado para a tela da Turma referente ao PIN.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={ClassInfo} alt="Informações da turma." />
        <StyledFigureCaption>Informações da turma.</StyledFigureCaption>
      </StyledFigure>

      <StyledParagraph>
        O aluno poderá realizar sua inscrição na Turma ao clicar no botão{' '}
        <TextBold>{`"ENTRAR"`}</TextBold>.
      </StyledParagraph>

      <StyledFigure>
        <StyledImg src={StudentRegistered} alt="Aluno inscrito na turma." />
        <StyledFigureCaption>Aluno inscrito na turma.</StyledFigureCaption>
      </StyledFigure>
    </Wrapper>
  );
};

export default HowStudentAccessClassViaPin;
