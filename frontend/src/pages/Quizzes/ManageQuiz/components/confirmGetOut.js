import React from 'react';
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

import GridContainer from '@components/Container';
import Button from '@components/Button';

const GetOutAlert = ({ handleClose }) => {
  return (
    <GridContainer>
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
    </GridContainer>
  );
};

GetOutAlert.defaultProps = {
  handleClose: () => {},
};

GetOutAlert.propTypes = {
  handleClose: PropTypes.func,
};

export default GetOutAlert;
