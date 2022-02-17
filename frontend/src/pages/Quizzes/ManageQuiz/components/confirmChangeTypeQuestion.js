import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import {
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import GridContainer from '@components/Container';
import Button from '@components/Button';

const ChangeQuestionType = ({ handleClose, modalState, handleChange }) => {
  return (
    <GridContainer>
      <DialogTitle id="id-dialog-title">
        Deseja mesmo alterar o tipo da questão?
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
    </GridContainer>
  );
};

ChangeQuestionType.defaultProps = {
  handleClose: () => {},
};

ChangeQuestionType.propTypes = {
  handleClose: PropTypes.func,
  modalState: PropTypes.shape({
    open: PropTypes.bool,
    indexQuestion: PropTypes.number,
    type: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ChangeQuestionType;
