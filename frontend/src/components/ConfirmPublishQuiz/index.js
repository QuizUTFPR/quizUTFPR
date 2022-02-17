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

const PublishQuizAlert = ({ onClick, handleClose, title, description }) => {
  const handlePublish = () => {
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
          onClick={handlePublish}
          color="primary"
          variant="contained"
          autoFocus
        >
          Publicar
        </Button>
      </DialogActions>
    </GridContainer>
  );
};

export default PublishQuizAlert;
