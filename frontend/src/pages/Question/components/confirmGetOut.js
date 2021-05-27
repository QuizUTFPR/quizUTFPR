import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

// ROUTES
import { QUIZ } from '@routes';

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
const GetOutAlert = forwardRef((props, ref) => {
  const { onClick, handleClose } = props;

  const handleGetOut = () => {
    onClick();
    handleClose();
  };

  return (
    <Wrapper>
      <DialogTitle id="id-dialog-title">Deseja mesmo Sair?</DialogTitle>
      <DialogContent>
        <DialogContentText id="id-dialog-description">
          Há alterações que não foram salvas. Se você sair agora, perderá todas
          elas.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button
          component={Link}
          to={QUIZ}
          onClick={handleGetOut}
          color="primary"
        >
          Sair mesmo assim
        </Button>
      </DialogActions>
    </Wrapper>
  );
});

export default GetOutAlert;
