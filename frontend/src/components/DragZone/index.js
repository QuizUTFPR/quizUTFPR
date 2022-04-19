import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '@components/Button';

import SnackBar from '@components/SnackBar';
import { Container } from './style';

const StyledDropzone = ({ handleChange, accept, maxFiles, maxSize }) => {
  const [openSnackBar, setOpenSnackBar] = useState({
    message: '',
    open: false,
  });

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar({
      message: '',
      open: false,
    });
  };

  const handleOpenErrorSnackBar = (message) => {
    setOpenSnackBar({
      message: '',
      open: false,
    });
    setTimeout(() => {
      setOpenSnackBar({
        message,
        open: true,
      });
    }, 250);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    onDropAccepted: (files) => {
      handleChange(files);
    },
    onDropRejected: () => {
      handleOpenErrorSnackBar('Imagem Inválida');
    },
  });

  return (
    <div className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p> Você pode arrastar e soltar imagens aqui para adicioná-las.</p>
        <p>Tamanho máximo: {maxSize / 1000} kB</p>
        <Button loading={false} color="secondary" variant="outlined">
          BROWSE
        </Button>
      </Container>

      <SnackBar
        openSnackBar={openSnackBar.open}
        handleCloseSnackBar={handleCloseSnackBar}
        autoHideDuration={1000}
        text={openSnackBar.message}
        severity="error"
      />
    </div>
  );
};

StyledDropzone.defaultProps = {
  accept: 'image/*',
  maxFiles: 1,
  maxSize: 734003,
};

export default StyledDropzone;
