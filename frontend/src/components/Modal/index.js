import React from "react";
import { Backdrop, Fade } from "@material-ui/core";
import {StyledModal} from './style'

const ModalWrapper = ({
  open,
  handleClose,
  modalTitle,
  modalDescription,
  children
}) => {
  return (
    <StyledModal
      aria-labelledby={modalTitle}
      aria-describedby={modalDescription}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>{children}</Fade>
    </StyledModal>
  );
};

export default ModalWrapper;
