import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { StyledModal } from './style';

const ModalWrapper = (props) => {
  const { open, handleClose, modalTitle, modalDescription, children } = props;

  const ref = useRef(null);

  return (
    <StyledModal
      aria-labelledby={modalTitle}
      aria-describedby={modalDescription}
      open={open}
      onClose={handleClose}
      ref={ref}
    >
      {children}
    </StyledModal>
  );
};

ModalWrapper.defaultProps = {
  handleClose: () => {},
};
ModalWrapper.propTypes = {
  handleClose: PropTypes.func,
};

export default ModalWrapper;
