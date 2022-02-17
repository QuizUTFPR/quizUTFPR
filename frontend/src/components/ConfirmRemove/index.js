import React from 'react';

// COMPONENTS
import {
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import GridContainer from '@components/Container';
import Button from '@components/Button';

const AlertRemoveQuestion = ({ onClick, handleClose, title, description }) => {
  const handleRemove = () => {
    onClick();
    handleClose();
  };

  return (
    <GridContainer>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleRemove}
          color="primary"
          variant="contained"
          autoFocus
        >
          Excluir
        </Button>
      </DialogActions>
    </GridContainer>
  );
};

export default AlertRemoveQuestion;
