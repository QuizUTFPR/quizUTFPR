import React from "react";
import { Modal, Backdrop, Fade } from "@material-ui/core";

const ModalWrapper = ({
  open,
  setOpen,
  handleOpen,
  handleClose,
  modalTitle,
  modalDescription,
  children
}) => {
  return (
    <Modal
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
    </Modal>
  );
};

export default ModalWrapper;
