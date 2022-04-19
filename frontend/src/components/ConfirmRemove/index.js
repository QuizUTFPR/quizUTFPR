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

const AlertRemoveQuestion = forwardRef((props, _) => {
  const { onClick, handleClose, title, description } = props;

  const [loading, setLoading] = useState(false);

  const handleRemove = () => {
    setLoading(true);
    onClick();
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
          loading={loading}
          onClick={handleRemove}
          color="primary"
          variant="contained"
          autoFocus
        >
          Excluir
        </Button>
      </DialogActions>
    </Wrapper>
  );
});

export default AlertRemoveQuestion;
