import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
// ROUTES
import { QUIZ } from '@routes';

// COMPONENTS
import {
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import Wrapper from '@components/RefferedContainer';
import Button from '@components/Button';

const GetOutAlert = forwardRef((props, _) => {
  const { handleClose } = props;

  return (
    <Wrapper>
      <DialogTitle id="id-dialog-title">Deseja mesmo sair?</DialogTitle>
      <DialogContent>
        <DialogContentText id="id-dialog-description">
          Há alterações que não foram salvas. Se você sair agora, perderá todas
          elas.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancelar
        </Button>
        <Button
          style={{ marginLeft: '10px' }}
          component={Link}
          to={QUIZ}
          color="primary"
          variant="contained"
        >
          Sair mesmo assim
        </Button>
      </DialogActions>
    </Wrapper>
  );
});

GetOutAlert.defaultProps = {
  handleClose: () => {},
};

GetOutAlert.propTypes = {
  handleClose: PropTypes.func,
};

export default GetOutAlert;
