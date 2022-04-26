import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

// Components
import Button from '@components/Button';
import Modal from '@components/Modal';
import SnackBar from '@components/SnackBar';
import GetImageFromPexels from './GetImageFromPexels';

// Style
import {
  ContainerDragZone,
  Wrapper,
  Label,
  ContainerPexelsImage,
  TextOR,
} from './style';

const StyledDropzone = ({ handleChange, accept, maxFiles, maxSize, label }) => {
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

  const [openPexelsModal, setOpenPexelsModal] = useState(false);

  const tooglePexelsModal = () => setOpenPexelsModal((prevState) => !prevState);

  console.log('openPexelsModal', openPexelsModal);

  return (
    <>
      <Wrapper className="container" label={label}>
        <Label>Imagem</Label>
        <ContainerDragZone
          {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        >
          <input {...getInputProps()} />
          <p> Você pode arrastar e soltar imagens aqui para adicioná-las</p>
          <p>Tamanho máximo: {maxSize / 1e6} Mb</p>
          <Button
            style={{ marginTop: 10 }}
            loading={false}
            variant="contained"
            color="primary"
          >
            BUSCAR
          </Button>
        </ContainerDragZone>
        <TextOR>ou</TextOR>
        <ContainerPexelsImage>
          <p> Pesquise imagens da internet</p>
          <p>Utilize palavras-chave para realizar sua busca</p>
          <Button
            style={{ marginTop: 10 }}
            variant="contained"
            color="primary"
            loading={false}
          >
            Pesquisar Imagem
          </Button>
        </ContainerPexelsImage>

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
        <GetImageFromPexels handleClose={tooglePexelsModal} />
      </Modal>
    </>
  );
};

StyledDropzone.defaultProps = {
  accept: 'image/*',
  maxFiles: 1,
  maxSize: 734003,
  label: 'Imagem',
};

export default StyledDropzone;
