import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import GridContainer from '@components/Container';
import Card from '@components/Card';
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
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

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

        <Card
          image="https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg"
          imageTitle="Live from space album cover"
          title="Título Aqui..."
          description="Descrição aqui..."
        >
          <IconButton onClick={handleOpenModal}>
            <Edit />
          </IconButton>
          <IconButton>
            <Delete />
          </IconButton>
        </Card>
      </GridContainer>

      {/* MODALS */}
      <Modal
        open={isModalOpen}
        modalTitle="Prefêrencias do Quiz"
        modalDescription="Edite os dados de seu quiz..."
        style={{ overflow: 'scroll' }}
      >
        <QuizPreferences handleClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default Quiz;
