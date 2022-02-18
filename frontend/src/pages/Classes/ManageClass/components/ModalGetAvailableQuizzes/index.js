import React, { useState, useEffect } from 'react';
import api from '@api';

// Components
import { Close } from '@mui/icons-material';
import { IconButton, Grid, Typography, Divider } from '@mui/material';

// Style
import { FormWrapper, GridContainerModal } from './style';

const ModalGetAvailableQuizzes = (props) => {
  console.log('props', props);

  const [availableQuizzes, setAvailableQuizzes] = useState([]);

  const getAvailableQuizzes = async () => {
    try {
      const response = await api.get('/quiz');

      if (response.status !== 200) setAvailableQuizzes([]);
      else setAvailableQuizzes(response.data);
    } catch (error) {
      console.log('Published teacher quizzes error:', error);
    }
  };

  useEffect(() => {
    getAvailableQuizzes();
  }, []);

  return (
    <GridContainerModal
      container
      spacing={3}
      style={{
        maxHeight: '90vh',
        flexWrap: 'nowrap',
        overflow: 'auto',
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={3} md={1}>
          <IconButton
            aria-label="closeModal"
            onClick={() => console.log('teste')}
          >
            <Close />
          </IconButton>
        </Grid>

        <Grid item xs={9} md={11}>
          <Typography variant="h5" color="primary">
            Anexar Quizzes
          </Typography>
        </Grid>
      </Grid>

      <Grid item style={{ marginBottom: '10px' }}>
        <Divider />
      </Grid>

      <FormWrapper
        container
        component="form"
        // onSubmit={formik.handleSubmit}
        spacing={2}
      >
        {availableQuizzes.map((quiz) => (
          <p key={quiz.id}>{quiz.title}</p>
        ))}
      </FormWrapper>
    </GridContainerModal>
  );
};

export default ModalGetAvailableQuizzes;
