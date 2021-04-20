import React, { useState } from "react";

// COMPONENTS
import GridContainer from "@components/Container";
import Card from "@components/Card";
import Modal from '@components/Modal'

//STYLE

// MATERIAL-UI COMPONENTS
import { Grid, Button, IconButton, Typography, Divider  } from "@material-ui/core";

// MATERIAL-UI ICONS
import { Edit, Delete } from "@material-ui/icons";

const Quiz = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <GridContainer container spacing={3}>
      <Grid container align="center" justify="space-between">
        <Typography color="primary" component="h4" variant="h4">
          Quizzes Cadastrados
        </Typography>

        <Button variant="contained" color="primary" onClick={handleOpen}>
          Criar Quiz
        </Button>
      </Grid>

      <Grid item>
        <Divider  />
      </Grid>

      <Card
        image="https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg"
        imageTitle="Live from space album cover"
        title="Título Aqui..."
        description="Descrição aqui..."
      >
        <IconButton>
          <Edit />
        </IconButton>
        <IconButton>
          <Delete />
        </IconButton>
      </Card>
    </GridContainer>
    
    <Modal
      open={open} handleClose={handleClose}
      modalTitle="CadastrarQuiz"
      modalDescription="EscolhaDoModoDeQuiz"
    >
      <div>
        <p>Modal aberto!</p>
      </div>
    </Modal>
    </>
  );
};

export default Quiz;
