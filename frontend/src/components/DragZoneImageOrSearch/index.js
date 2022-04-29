import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

// Components
import Button from '@components/Button';
import Modal from '@components/Modal';
import SnackBar from '@components/SnackBar';
import getFileFromUrl from '@utils/getFileFromUrl';
import { Tooltip } from '@mui/material';

// Assets
import { Image, Upload, Search } from '@mui/icons-material';

import GetImageFromPexels from './GetImageFromPexels';
// Style
import {
  ContainerDragZone,
  Wrapper,
  Label,
  Description,
  // ContainerPexelsImage,
  WrapperButton,
  // StyledImageIcon,
} from './style';

const StyledDropzone = ({
  handleChange,
  accept,
  maxFiles,
  maxSize,
  label,
  description,
  canSearchOnInternet,
}) => {
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
      handleOpenErrorSnackBar('Arquivo Inválida');
    },
  });

  const [openPexelsModal, setOpenPexelsModal] = useState(false);

  const tooglePexelsModal = (e) => {
    e.stopPropagation();
    setOpenPexelsModal((prevState) => !prevState);
  };

  const handleSelectImage = async (image) => {
    const objImage = await getFileFromUrl(image?.src?.large);
    const files = [objImage];
    handleChange(files);
  };

  return (
    <>
      <Wrapper className="container">
        <Label>{label}</Label>
        <ContainerDragZone
          {...getRootProps({
            isDragActive,
            isDragAccept,
            isDragReject,
          })}
        >
          <input {...getInputProps()} />
          <Image sx={{ fontSize: 200 }} />
          <Description>{description}</Description>
          <WrapperButton>
            <Tooltip title="Realizar Upload">
              <Button loading={false} variant="contained" color="primary">
                <Upload />
              </Button>
            </Tooltip>
            {canSearchOnInternet && (
              <Tooltip title="Pesquisar na Internet">
                <Button
                  onClick={tooglePexelsModal}
                  variant="contained"
                  color="primary"
                  loading={false}
                >
                  <Search />
                </Button>
              </Tooltip>
            )}
          </WrapperButton>
        </ContainerDragZone>

        <SnackBar
          openSnackBar={openSnackBar.open}
          handleCloseSnackBar={handleCloseSnackBar}
          autoHideDuration={1000}
          text={openSnackBar.message}
          severity="error"
        />
      </Wrapper>

      {/* MODALS */}
      <Modal
        open={openPexelsModal}
        modalTitle="Prefêrencias do Quiz"
        modalDescription="Edite os dados de seu quiz..."
        style={{ overflow: 'scroll' }}
        handleClose={tooglePexelsModal}
      >
        <GetImageFromPexels
          handleSelectImage={handleSelectImage}
          handleClose={tooglePexelsModal}
        />
      </Modal>
    </>
  );
};

StyledDropzone.defaultProps = {
  accept: 'image/*',
  maxFiles: 1,
  maxSize: 734003,
  label: 'Imagem',
  description:
    'Arraste e solte os arquivos aqui ou pesquise uma imagem na internet.',
  canSearchOnInternet: true,
};

export default StyledDropzone;
