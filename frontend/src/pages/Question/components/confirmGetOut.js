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
} from '@material-ui/core';

import GridContainer from '@components/Container';
import Button from '@components/Button';

const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

// eslint-disable-next-line no-unused-vars
const GetOutAlert = forwardRef((props, ref) => {
  const { handleClose } = props;

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
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancelar
        </Button>
        <Button component={Link} to={QUIZ} color="primary" variant="contained">
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
