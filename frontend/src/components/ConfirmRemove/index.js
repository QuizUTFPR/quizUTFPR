import React, { forwardRef } from 'react';

// COMPONENTS
import {
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import GridContainer from '@components/Container';
import Button from '@components/Button';

const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

// eslint-disable-next-line no-unused-vars
const AlertRemoveQuestion = forwardRef((props, ref) => {
  const { onClick, handleClose, title, description } = props;

  const handleRemove = () => {
    onClick();
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
    </Wrapper>
  );
});

export default AlertRemoveQuestion;
