import React, { useState } from "react";

// COMPONENTS
import GridContainer from "../../components/Container";
import Card from "../../components/Card";

// MATERIAL-UI COMPONENTS
import { Grid, Button, IconButton, Typography } from "@material-ui/core";

// MATERIAL-UI ICONS
import { Edit, Delete } from "@material-ui/icons";

const Quiz = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <GridContainer container>
      <Grid container align="center" justify="space-between">
        <Grid item>
          <Typography color="primary" component="h4" variant="h4">
            Quizzes Cadastrados
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Criar Quiz
          </Button>
        </Grid>
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
  );
};

export default Quiz;
