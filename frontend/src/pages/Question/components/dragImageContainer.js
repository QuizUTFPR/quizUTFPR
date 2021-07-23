import React, { forwardRef } from 'react';

// COMPONENTS
// import Button from '@components/Button';
import { IconButton, Grid, Typography, Divider } from '@material-ui/core';
import GridContainer from '@components/Container';
import { Close } from '@material-ui/icons/';
import DragImageInput from './dragImage';

// ASSETS

// eslint-disable-next-line no-unused-vars
const DragImageContainer = forwardRef((props, ref) => {
  const { handleClose, updateQuestion, formik } = props;
  return (
    <GridContainer container spacing={3} style={{ width: '70vw' }}>
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
            formikID={['question.imageObj', 'question.imageBase64']}
            name="Imagem de Capa"
            handleFormikChange={formik.setFieldValue}
            handlePropsChange={{
              handleUpdate: updateQuestion,
              key: ['imageObj', 'imageBase64'],
              index: formik.values.index,
            }}
            handleCloseModal={handleClose}
          />
        </Grid>
      </Grid>
    </GridContainer>
  );
});

export default DragImageContainer;
