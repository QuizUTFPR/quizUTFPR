import React, { useState, useEffect, forwardRef, useCallback } from 'react';
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
import QuizPreferences from '@pages/EditQuizPreferences';

// ROUTES
import { CREATE_QUIZ, STATISTICS_QUIZ, QUESTION } from '@routes';

// MATERIAL-UI COMPONENTS
import { IconButton } from '@mui/material';
import Button from '@components/Button';

// MATERIAL-UI ICONS
import { Edit, Delete, Publish, BarChart } from '@mui/icons-material';

// STYLE
import { TextPIN, HeaderTitle, HeaderTitleText, HeaderDivider } from './style';

const IconWrapper = forwardRef((props, ref) => (
  <IconButton ref={ref} onClick={props.onClick} {...props}>
    {props.children}
  </IconButton>
));

const TextPINReffed = forwardRef((props, ref) => (
  <TextPIN ref={ref} {...props}>
    {props.children}
  </TextPIN>
));

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
          >
            Criar Quiz
          </Button>
        </HeaderTitle>

        <HeaderDivider />

        {!quizzes ? (
          <p>Vazio!</p>
        ) : (
          quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              image={quiz.image?.url}
              imageTitle={quiz.title}
              title={quiz.title}
              description={quiz.description}
              to={`${QUESTION}${quiz.id}`}
              published={quiz.published}
              noTime={quiz.noTime}
            >
              {!quiz.published && (
                <Tooltip arrow ariaLabel="publicar" title="Publicar">
                  <IconWrapper onClick={() => handleClickOpenPublish(quiz.id)}>
                    <Publish />
                  </IconWrapper>
                </Tooltip>
              )}

              {quiz.published && (
                <>
                  <Tooltip
                    arrow
                    ariaLabel="pin"
                    title="PIN utilizado pelo aluno"
                  >
                    <TextPINReffed>{quiz.pin}</TextPINReffed>
                  </Tooltip>
                  <Tooltip
                    arrow
                    ariaLabel="statistics"
                    title="Visualizar estatisticas"
                  >
                    <IconWrapper
                      onClick={() => navigate(`${STATISTICS_QUIZ}/${quiz.id}`)}
                    >
                      <BarChart />
                    </IconWrapper>
                  </Tooltip>
                </>
              )}
              <Tooltip arrow ariaLabel="editar" title="Editar">
                <IconWrapper onClick={handleOpenModal(quiz)}>
                  <Edit />
                </IconWrapper>
              </Tooltip>
              {!quiz.published && (
                <Tooltip arrow ariaLabel="deletar" title="Deletar">
                  <IconWrapper onClick={() => handleClickOpenAlert(quiz.id)}>
                    <Delete />
                  </IconWrapper>
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

      <Modal open={openPublish.open} handleClose={handleCloseAlert}>
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
