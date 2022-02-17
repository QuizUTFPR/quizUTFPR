import React, { useRef, forwardRef } from 'react';
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
  const ChildrenRef = forwardRef((props, _) => children);

  return (
    <StyledModal
      aria-labelledby={modalTitle}
      aria-describedby={modalDescription}
      open={open}
      onClose={handleClose}
      ref={ref}
    >
      <ChildrenRef />
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
