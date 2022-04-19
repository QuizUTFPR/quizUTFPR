import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import api from '@api';

// ROUTES
import { STATISTICS_QUIZ } from '@routes';

// Components
import Tooltip from '@components/ToolTip';
import { Delete, BarChart } from '@mui/icons-material';
import Modal from '@components/Modal';
import { Divider } from '@mui/material';
import AlertRemoveMessage from '@components/ConfirmRemove';
import ModalGetAvailableQuizzes from '../components/ModalGetAvailableQuizzes';

// Style
import {
  Wrapper,
  QuizzesWrapper,
  HeaderWrapper,
  NoStudentsWarning,
  StyledButton,
  WrapperQuiz,
  ImageQuiz,
  ContainerContent,
  QuizTitle,
  QuizInfoWrapper,
  QuizDescription,
  WrapperActions,
  StyledIconButton,
  EmptyImage,
  QuizRightWrapper,
} from './style';
import { ClassName } from '../style';

const QuizzesOfClass = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const { idClass } = useParams();
  const [visibilityModal, setvisibilityModal] = useState(false);

  const [modalDettachQuiz, setmodalDettachQuiz] = useState({
    open: false,
    idQuiz: null,
  });

  const handleOpenModelDettachQuiz = (idQuiz) =>
    setmodalDettachQuiz({ open: true, idQuiz });
  const handleCloseModelDettachQuiz = () =>
    setmodalDettachQuiz({ open: false, idQuiz: null });

  const [quizzes, setQuizzes] = useState([]);

  const getAttachedQuizzes = async () => {
    try {
      const { data } = await api.get(`/class/getAllClassQuiz/${idClass}`);

      setQuizzes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAttachedQuizzes();

    return () => setQuizzes([]);
  }, []);

  const toogleModal = () => setvisibilityModal((prevState) => !prevState);

  const handleRemoveQuiz = async () => {
    try {
      await api.delete('/class/dettachQuiz', {
        data: { idClass, idQuiz: modalDettachQuiz.idQuiz },
      });

      getAttachedQuizzes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Wrapper
        key="quizzes"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <QuizzesWrapper>
          <HeaderWrapper>
            <ClassName>{state?.title || 'Sem Título'} </ClassName>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={toogleModal}
              loading={false}
            >
              Anexar Quiz
            </StyledButton>
          </HeaderWrapper>
          <Divider />

          {!quizzes.length && (
            <NoStudentsWarning>
              Não há estudantes cadastrados na turma, ou eles ainda não
              responderam nenhum quiz vinculado na turma!
            </NoStudentsWarning>
          )}

          <ContainerContent>
            {quizzes.map((quiz) => {
              return (
                <WrapperQuiz key={quiz.id}>
                  {quiz?.image?.url ? (
                    <ImageQuiz src={quiz?.image?.url} />
                  ) : (
                    <EmptyImage />
                  )}
                  <QuizRightWrapper>
                    <QuizInfoWrapper>
                      <QuizTitle>{quiz.title}</QuizTitle>
                      <QuizDescription>{quiz.description}</QuizDescription>
                    </QuizInfoWrapper>

                    <WrapperActions>
                      <Tooltip
                        arrow
                        ariaLabel="statistics"
                        title="Visualizar estatisticas"
                      >
                        <StyledIconButton
                          onClick={() =>
                            navigate(`${STATISTICS_QUIZ}/${quiz.id}`, {
                              state: {
                                idClass,
                              },
                            })
                          }
                        >
                          <BarChart />
                        </StyledIconButton>
                      </Tooltip>
                      <Tooltip arrow ariaLabel="deletar" title="Deletar">
                        <StyledIconButton
                          onClick={() => handleOpenModelDettachQuiz(quiz.id)}
                        >
                          <Delete />
                        </StyledIconButton>
                      </Tooltip>
                    </WrapperActions>
                  </QuizRightWrapper>
                </WrapperQuiz>
              );
            })}
          </ContainerContent>
        </QuizzesWrapper>
      </Wrapper>

      <Modal
        open={visibilityModal}
        handleClose={toogleModal}
        modalTitle="Anexar Quizzes"
        modalDescription="Adicione quizzes em sua turma..."
      >
        <ModalGetAvailableQuizzes
          handleUpdateQuizzes={getAttachedQuizzes}
          handleClose={toogleModal}
        />
      </Modal>

      <Modal
        open={modalDettachQuiz.open}
        handleClose={handleCloseModelDettachQuiz}
      >
        <AlertRemoveMessage
          handleClose={handleCloseModelDettachQuiz}
          onClick={handleRemoveQuiz}
          title="Deseja mesmo desvincular o Quiz?"
          description="O vínculo entre turma e o quiz será excluida e todas suas informações serão perdidas."
        />
      </Modal>
    </>
  );
};

export default QuizzesOfClass;
