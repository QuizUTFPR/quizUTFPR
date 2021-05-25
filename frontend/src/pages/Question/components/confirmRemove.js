import React, { forwardRef } from 'react'


// COMPONENTS
import {
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import GridContainer from '@components/Container'


const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

const AlertRemoveQuestion = forwardRef((props, ref) => {
  const {
    onClick,
    handleClose
  } = props;

  const handleRemove  = () => {
    onClick();
    handleClose();
  }

  return(
    <Wrapper>
        <DialogTitle id="alert-dialog-title">{"Deseja mesmo excluir a questão?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A questão será excluida do modo de edição, porém, somente sera persistida a exclusão pressionar o botão de salvar alterações.
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
    )
  })


export default AlertRemoveQuestion;