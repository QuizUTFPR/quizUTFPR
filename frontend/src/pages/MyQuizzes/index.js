import React, { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import api from '@api';

// COMPONENTS
import GridContainer from '@components/Container';
import Card from '@components/CardQuiz';
import Modal from '@components/Modal';
import AlertRemoveMessage from '@components/ConfirmRemove';

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
  Tooltip,
} from '@material-ui/core';
import Button from '@components/Button';
// MATERIAL-UI ICONS
import { Edit, Delete, Publish } from '@material-ui/icons';

const IconWrapper = forwardRef((props, ref) => (
  <IconButton ref={ref} onClick={props.onClick} {...props}>
    {props.children}
  </IconButton>
));

const Quiz = () => {
  const [quizzes, setQuizzes] = useState(false);
  const [isModalOpen, setModalOpen] = useState({
    open: false,
    quiz: null,
  });
  const [openAlert, setOpenAlert] = useState({ open: false, idQuiz: null });
  const handleClickOpenAlert = (idQuiz) => setOpenAlert({ open: true, idQuiz });
  const handleCloseAlert = () => setOpenAlert({ open: false, idQuiz: null });

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
    await api.delete('/quiz/delete', {
      data: { id_quiz: openAlert.idQuiz },
    });
    getQuizzes();
  };

  const publishQuiz = (quiz) => async () => {
    const quizUpdated = {
      id: quiz.id,
      published: true,
    };

    const responseQuiz = await api.post('/quiz/publish', quizUpdated);
    if (responseQuiz.status === 200) console.log('publicado');
  };

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
                <Tooltip arrow aria-label="publicar" title="Publicar">
                  <IconWrapper onClick={publishQuiz(quiz)}>
                    <Publish />
                  </IconWrapper>
                </Tooltip>
              )}
              <Tooltip arrow aria-label="editar" title="Editar">
                <IconWrapper onClick={handleOpenModal(quiz)}>
                  <Edit />
                </IconWrapper>
              </Tooltip>
              {!quiz.published && (
                <Tooltip arrow aria-label="deletar" title="Deletar">
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
    </>
  );
};

export default Quiz;
