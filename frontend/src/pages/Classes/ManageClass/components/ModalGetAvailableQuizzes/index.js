import React from 'react';

// Components
import { Close } from '@mui/icons-material';
import { IconButton, Grid, Typography, Divider } from '@mui/material';

// Style
import { FormWrapper, GridContainerModal } from './style';

const ModalGetAvailableQuizzes = (props) => {
  console.log('props', props);

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
        teste
      </FormWrapper>
    </GridContainerModal>
  );
};

export default ModalGetAvailableQuizzes;
