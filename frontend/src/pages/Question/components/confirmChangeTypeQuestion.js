import React, { forwardRef } from 'react';

// COMPONENTS
import {
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import GridContainer from '@components/Container';
import Button from '@components/Button';

const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

// eslint-disable-next-line no-unused-vars
const ChangeQuestionType = forwardRef((props, ref) => {
  const { handleClose, modalState, handleChange } = props;

  return (
    <Wrapper>
      <DialogTitle id="id-dialog-title">
        Deseja mesmo alterar o tipo da Questão?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="id-dialog-description">
          Todas as alternativas já preenchidas serão perdidas.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={() => handleChange({ ...modalState, handleClose })}
          color="primary"
          variant="contained"
        >
          Confirmar
        </Button>
      </DialogActions>
    </Wrapper>
  );
});

export default ChangeQuestionType;
