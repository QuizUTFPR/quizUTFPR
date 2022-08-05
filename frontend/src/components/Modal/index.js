import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { StyledModal } from './style';

const ModalWrapper = ({
  open,
  handleClose,
  modalTitle,
  modalDescription,
  children,
}) => {
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
  open: false,
  handleClose: () => {},
  modalTitle: 'Título do Modal',
  modalDescription: 'Descrição do Modal',
  // eslint-disable-next-line react/jsx-no-useless-fragment
  children: <></>,
};
ModalWrapper.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  modalTitle: PropTypes.string,
  modalDescription: PropTypes.string,
  children: PropTypes.node,
};

export default ModalWrapper;
