import React, { forwardRef } from 'react';

// COMPONENTS
// import Button from '@components/Button';
import { IconButton, Grid, Typography, Divider } from '@mui/material';
import Wrapper from '@components/RefferedContainer';
import { Close } from '@mui/icons-material/';
import DragImageInput from './dragImage';

// ASSETS

const DragImageContainer = forwardRef((props, _) => {
  const { handleClose, updateQuestion, formik } = props;

  return (
    <Wrapper width="45vw" container spacing={3}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={3} md={1}>
          <IconButton aria-label="closeModal" onClick={handleClose}>
            <Close />
          </IconButton>
        </Grid>
        <Grid item xs={9} md={11}>
          <Typography variant="h5" color="primary">
            Adicione a imagem da questão
          </Typography>
        </Grid>
      </Grid>

      <Grid item>
        <Divider />
      </Grid>

      <Grid container spacing={3} justifyContent="center" align="center">
        <Grid item xs={12}>
          <DragImageInput
            formikID={['question.imageObj', 'question.imageUrl']}
            name="Imagem de Capa"
            handleFormikChange={formik.setFieldValue}
            handlePropsChange={{
              handleUpdate: updateQuestion,
              key: ['imageObj', 'imageUrl'],
              index: formik.values.index,
            }}
            handleCloseModal={handleClose}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
});

export default DragImageContainer;
