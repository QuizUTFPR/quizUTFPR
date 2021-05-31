import React, { forwardRef } from 'react';

// COMPONENTS
import {
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import GridContainer from '@components/Container';

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
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleRemove} color="primary" autoFocus>
          Excluir
        </Button>
      </DialogActions>
    </Wrapper>
  );
});

export default AlertRemoveQuestion;
