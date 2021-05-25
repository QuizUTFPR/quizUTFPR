import React, { forwardRef } from "react";

// COMPONENTS
import {
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle
} from "@material-ui/core";

import GridContainer from "@components/Container";

const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

// eslint-disable-next-line no-unused-vars
const FinishAlert = forwardRef((props, ref) => {
  const { onClick, handleClose } = props;

  const handleFinish = () => {
    onClick();
    handleClose();
  };

  return (
    <Wrapper>
      <DialogTitle id="id-dialog-title">Deseja mesmo Finalizar?</DialogTitle>
      <DialogContent>
        <DialogContentText id="id-dialog-description">
          Caso você tenha feito alguma alteração e não a salvou, ela não será
          salva caso você finalize a edição
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleFinish} color="primary">
          Finalizar
        </Button>
      </DialogActions>
    </Wrapper>
  );
});

export default FinishAlert;
