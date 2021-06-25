import React, { useState, useEffect, forwardRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '@api';

// COMPONENTS
import GridContainer from '@components/Container';
import Card from '@components/CardQuiz';
import Modal from '@components/Modal';
import AlertRemoveMessage from '@components/ConfirmRemove';
import PublishQuizMessage from '@components/ConfirmPublishQuiz';
import Tooltip from '@components/ToolTip';

// PAGES
import QuizPreferences from '@pages/EditQuizPreferences';

// ROUTES
import { CREATE_QUIZ } from '@routes';

// MATERIAL-UI COMPONENTS
import {
  Grid,
  IconButton,
  Typography,
  Divider,
  // Tooltip,
} from '@material-ui/core';
import Button from '@components/Button';

// MATERIAL-UI ICONS
import { Edit, Delete, Publish } from '@material-ui/icons';

// STYLE
import { TextPIN } from './style';

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
  const [quizzes, setQuizzes] = useState(false);
  const [isModalOpen, setModalOpen] = useState({
    open: false,
    quiz: null,
  });
  const [openAlert, setOpenAlert] = useState({ open: false, idQuiz: null });
  const [openPublish, setOpenPublish] = useState({ open: false, idQuiz: null });

  const handleClickOpenAlert = (idQuiz) => setOpenAlert({ open: true, idQuiz });
  const handleCloseAlert = () => setOpenAlert({ open: false, idQuiz: null });
  const handleClickOpenPublish = (idQuiz) =>
    setOpenPublish({ open: true, idQuiz });
  const handleClosePublish = () =>
    setOpenPublish({ open: false, idQuiz: null });

  const getQuizzes = async () => {
    console.log('obtendo');
    try {
      const response = await api.get('/quiz');
      if (response.status !== 200) setQuizzes(false);
      else setQuizzes(response.data);
    } catch (err) {
      //
    }
  };
  console.log(quizzes);

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
    console.log('removendo');
    await api.delete('/quiz/delete', {
      data: { id_quiz: openAlert.idQuiz },
    });
    getQuizzes();
  };

  const publishQuiz = useCallback(async () => {
    console.log('publicando');
    const quizUpdated = {
      id: openPublish.idQuiz,
      published: true,
    };

    const responseQuiz = await api.post('/quiz/publish', quizUpdated);
    if (responseQuiz.status === 200) console.log('publicado');
    else console.log(responseQuiz);
  }, [openPublish]);

  useEffect(() => {
    getQuizzes();
  }, [publishQuiz]);

  return (
    <>
      <GridContainer container spacing={3}>
        <Grid container align="center" justify="space-between">
          <Typography color="primary" component="h4" variant="h4">
            Quizzes Cadastrados
          </Typography>

          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={CREATE_QUIZ}
          >
            Criar Quiz
          </Button>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        {!quizzes ? (
          <p>Vazio!</p>
        ) : (
          quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              image={
                quiz.image_quiz != null
                  ? quiz.image_quiz.url
                  : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
              }
              imageTitle={quiz.title}
              title={quiz.title}
              description={quiz.description}
              idQuiz={quiz.id}
              published={quiz.published}
            >
              {!quiz.published && (
                <Tooltip arrow ariaLabel="publicar" title="Publicar">
                  <IconWrapper onClick={() => handleClickOpenPublish(quiz.id)}>
                    <Publish />
                  </IconWrapper>
                </Tooltip>
              )}

              {quiz.published && (
                <Tooltip arrow ariaLabel="pin" title="PIN utilizado pelo aluno">
                  <TextPINReffed>{quiz.pin}</TextPINReffed>
                </Tooltip>
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
      </GridContainer>

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
    </>
  );
};

export default Quiz;
