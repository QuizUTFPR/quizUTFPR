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
  const [quizzes, setQuizzes] = useState([]);

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
        const { data } = await api.get('/quiz');
        setQuizzes(data);
      } catch (err) {
        console.log(err);
      }
    };

    getQuizzes();
  }, []);

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
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            image="https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg"
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
        ))}
      </GridContainer>

      {/* MODALS */}
      <Modal
        open={isModalOpen.open}
        modalTitle="Prefêrencias do Quiz"
        modalDescription="Edite os dados de seu quiz..."
        style={{ overflow: 'scroll' }}
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
