import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '@api';

// COMPONENTS
import Container from '@components/Container';
import Card from '@components/Card';
import Modal from '@components/Modal';
import AlertRemoveMessage from '@components/ConfirmRemove';
import PublishQuizMessage from '@components/ConfirmPublishQuiz';
import Tooltip from '@components/ToolTip';
import SnackBar from '@components/SnackBar';

// PAGES
import QuizPreferences from '@pages/Quizzes/EditQuiz';

// ROUTES
import { CREATE_QUIZ, STATISTICS_QUIZ, QUESTION } from '@routes';

// MATERIAL-UI COMPONENTS
import { IconButton } from '@mui/material';
import Button from '@components/Button';

// MATERIAL-UI ICONS
import { Edit, Delete, Publish, BarChart } from '@mui/icons-material';

// STYLE
import { TextPIN, HeaderTitle, HeaderTitleText, HeaderDivider } from './style';

const Quiz = () => {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState(false);
  const [isModalOpen, setModalOpen] = useState({
    open: false,
    quiz: null,
  });
  const [openAlert, setOpenAlert] = useState({ open: false, idQuiz: null });
  const [openPublish, setOpenPublish] = useState({ open: false, idQuiz: null });
  const [stateSnackBar, setStateSnackBar] = useState({
    open: false,
    text: '',
    severity: '',
  });

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setStateSnackBar((prevState) => ({ ...prevState, open: false }));
  };

  const handleClickSnackBar = (text, severity) => {
    setStateSnackBar({ text, open: true, severity });
  };

  const handleClickOpenAlert = (idQuiz) => setOpenAlert({ open: true, idQuiz });
  const handleCloseAlert = () => setOpenAlert({ open: false, idQuiz: null });
  const handleClickOpenPublish = (idQuiz) =>
    setOpenPublish({ open: true, idQuiz });
  const handleClosePublish = () =>
    setOpenPublish({ open: false, idQuiz: null });

  const getQuizzes = async () => {
    try {
      const response = await api.get('/quiz');

      console.log(response.data);

      if (response.status !== 200) setQuizzes(false);
      else setQuizzes(response.data);
    } catch (err) {
      //
    }
  };

  const handleOpenModal = (quiz) => () => {
    setModalOpen({
      open: true,
      quiz,
    });
  };
  const handleCloseModal = () => {
    setModalOpen({ open: false, quiz: null });
    getQuizzes();
  };

  const handleRemoveQuiz = async () => {
    try {
      await api.delete('/quiz/delete', {
        data: { idQuiz: openAlert.idQuiz },
      });

      handleClickSnackBar('Quiz removido com sucesso!', 'success');

      getQuizzes();
    } catch (error) {
      console.log(error);
      handleClickSnackBar(error.response.data.error, 'error');
    }
  };

  const publishQuiz = useCallback(async () => {
    try {
      const quizUpdated = {
        id: openPublish.idQuiz,
        published: true,
      };

      await api.post('/quiz/publish', quizUpdated);
      handleClickSnackBar('Quiz publicado com sucesso!', 'success');
      getQuizzes();
    } catch (error) {
      handleClickSnackBar(error.response.data.error, 'error');
    }
  }, [openPublish]);

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <>
      <Container container>
        <HeaderTitle container align="center" justifyContent="space-between">
          <HeaderTitleText color="primary">Quizzes Cadastrados</HeaderTitleText>

          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={CREATE_QUIZ}
            loading={false}
          >
            Criar Quiz
          </Button>
        </HeaderTitle>

        <HeaderDivider />

        <p>publicos</p>
        {!quizzes?.public ? (
          <p>Não existe nenhum quiz público!</p>
        ) : (
          quizzes?.public.map((quiz) => (
            <Card
              key={quiz.id}
              image={quiz.image?.url}
              imageTitle={quiz.title}
              title={`${quiz.title}`}
              description={quiz.description}
              to={`${QUESTION}${quiz.id}`}
              published={quiz.published}
              noTime={quiz.noTime}
            >
              {!quiz.published && (
                <Tooltip arrow ariaLabel="publicar" title="Publicar">
                  <IconButton onClick={() => handleClickOpenPublish(quiz.id)}>
                    <Publish />
                  </IconButton>
                </Tooltip>
              )}

              {quiz.published && (
                <>
                  <Tooltip
                    arrow
                    ariaLabel="pin"
                    title="PIN utilizado pelo aluno"
                  >
                    <TextPIN>{quiz.pin}</TextPIN>
                  </Tooltip>
                  <Tooltip
                    arrow
                    ariaLabel="statistics"
                    title="Visualizar estatisticas"
                  >
                    <IconButton
                      onClick={() => navigate(`${STATISTICS_QUIZ}/${quiz.id}`)}
                    >
                      <BarChart />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              <Tooltip arrow ariaLabel="editar" title="Editar">
                <IconButton onClick={handleOpenModal(quiz)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              {!quiz.published && (
                <Tooltip arrow ariaLabel="deletar" title="Deletar">
                  <IconButton onClick={() => handleClickOpenAlert(quiz.id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
            </Card>
          ))
        )}

        <p>Privados</p>
        {!quizzes?.private ? (
          <p>Não existe nenhum quiz privados!</p>
        ) : (
          quizzes?.private.map((quiz) => (
            <Card
              key={quiz.id}
              image={quiz.image?.url}
              imageTitle={quiz.title}
              title={`${quiz.title}`}
              description={quiz.description}
              to={`${QUESTION}${quiz.id}`}
              published={quiz.published}
              noTime={quiz.noTime}
            >
              {!quiz.published && (
                <Tooltip arrow ariaLabel="publicar" title="Publicar">
                  <IconButton onClick={() => handleClickOpenPublish(quiz.id)}>
                    <Publish />
                  </IconButton>
                </Tooltip>
              )}

              {quiz.published && (
                <>
                  <Tooltip
                    arrow
                    ariaLabel="pin"
                    title="PIN utilizado pelo aluno"
                  >
                    <TextPIN>{quiz.pin}</TextPIN>
                  </Tooltip>
                  <Tooltip
                    arrow
                    ariaLabel="statistics"
                    title="Visualizar estatisticas"
                  >
                    <IconButton
                      onClick={() => navigate(`${STATISTICS_QUIZ}/${quiz.id}`)}
                    >
                      <BarChart />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              <Tooltip arrow ariaLabel="editar" title="Editar">
                <IconButton onClick={handleOpenModal(quiz)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              {!quiz.published && (
                <Tooltip arrow ariaLabel="deletar" title="Deletar">
                  <IconButton onClick={() => handleClickOpenAlert(quiz.id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
            </Card>
          ))
        )}
      </Container>

      {/* MODALS */}
      <Modal
        open={isModalOpen.open}
        modalTitle="Prefêrencias do Quiz"
        modalDescription="Edite os dados de seu quiz..."
        style={{ overflow: 'scroll' }}
        handleClose={handleCloseModal}
      >
        <QuizPreferences
          quiz={isModalOpen.quiz}
          handleClose={handleCloseModal}
        />
      </Modal>

      <Modal open={openAlert.open} handleClose={handleCloseAlert}>
        <AlertRemoveMessage
          handleClose={handleCloseAlert}
          onClick={handleRemoveQuiz}
          title="Deseja mesmo excluir o Quiz?"
          description="O Quiz será excluido e todas suas questões também serão excluídas."
        />
      </Modal>

      <Modal open={openPublish.open} handleClose={handleClosePublish}>
        <PublishQuizMessage
          handleClose={handleClosePublish}
          onClick={publishQuiz}
          title="Deseja mesmo publicar o Quiz?"
          description="Após a publicação do quiz você não poderá realizar mais nenhuma alterações nas questões do mesmo. Assim como, não poderá exclui-lo."
        />
      </Modal>

      <SnackBar
        openSnackBar={stateSnackBar.open}
        handleCloseSnackBar={handleCloseSnackBar}
        autoHideDuration={1000}
        text={stateSnackBar.text}
        severity={stateSnackBar.severity}
      />
    </>
  );
};

export default Quiz;
