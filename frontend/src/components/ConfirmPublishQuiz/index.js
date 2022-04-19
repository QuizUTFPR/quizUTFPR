import React, { forwardRef, useState } from 'react';

// COMPONENTS
import {
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Wrapper from '@components/RefferedContainer';
import Button from '@components/Button';

const PublishQuizAlert = forwardRef((props, _) => {
  const { onClick, handleClose, title, description } = props;
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
    handleClose();
  };

  return (
    <Wrapper>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          loading={false}
          onClick={handleClose}
          color="primary"
          variant="outlined"
        >
          Cancelar
        </Button>
        <Button
          onClick={handlePublish}
          color="primary"
          variant="contained"
          autoFocus
          loading={loading}
        >
          Publicar
        </Button>
      </DialogActions>
    </Wrapper>
  );
});

export default PublishQuizAlert;
