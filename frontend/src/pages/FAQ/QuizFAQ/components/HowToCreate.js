import React from 'react';

// ASSETS
import InitialScreen from '@assets/FAQ/QuizFAQ/HowToCreate/initial_screen.png';

// STYLES
import { TextBold, StyledImg } from '../style';

const HowToCreate = () => {
  return (
    <>
      <p>
        No canto esquerdo da tela inicial, clique em{' '}
        <TextBold>{`"Meus Quizzes"`}</TextBold>.
      </p>

      <StyledImg
        src={InitialScreen}
        alt="Tela inicial do Painel de Controle."
      />

      <p>
        Feito isso, no canto superior direito da tela de quizzes, clique no
        botão <TextBold>{`"CRIAR QUIZ"`}</TextBold>.
      </p>

      <p>
        Feito isso, preencha as informações necessárias para a criação do quiz.
        Para adicionar a imagem, clique na área de adição da imagem ou apenas
        arraste uma até tal área. Título, visibilidade e descrição são campos
        obrigatórios.
      </p>

      <p>
        Preenchidas as informações necessárias, basta clicar no botão{' '}
        <TextBold>{`"CRIAR QUIZ"`}</TextBold> e pronto, seu quiz foi criado e
        você será redirecionado(a) para a tela de criação de questões.
      </p>
    </>
  );
};

export default HowToCreate;
