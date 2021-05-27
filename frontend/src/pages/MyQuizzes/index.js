import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '@api';

// COMPONENTS
import GridContainer from '@components/Container';
import Card from '@components/CardQuiz';
import Modal from '@components/Modal';

// PAGES
import QuizPreferences from '@pages/EditQuizPreferences';

// ROUTES
import { CREATE_QUIZ } from '@routes';

// MATERIAL-UI COMPONENTS
import {
  Grid,
  Button,
  IconButton,
  Typography,
  Divider,
} from '@material-ui/core';

// MATERIAL-UI ICONS
import { Edit, Delete } from '@material-ui/icons';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState(false);

  const [isModalOpen, setModalOpen] = useState({
    open: false,
    quiz: null,
  });
  const handleOpenModal = (quiz) => () => {
    setModalOpen({
      open: true,
      quiz,
    });
  };
  const handleCloseModal = () => setModalOpen({ open: false, quiz: null });

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const response = await api.get('/quiz');

        if (response.status !== 200) return;
        setQuizzes(response.data);
      } catch (err) {
        //
      }
    };

    getQuizzes();
  }, [isModalOpen]);

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
            >
              <IconButton onClick={handleOpenModal(quiz)}>
                <Edit />
              </IconButton>
              <IconButton>
                <Delete />
              </IconButton>
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
    </>
  );
};

export default Quiz;
