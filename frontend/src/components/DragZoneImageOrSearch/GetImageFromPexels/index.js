import React, { useState, forwardRef, useEffect, useRef } from 'react';

// COMPONENTS
import ChipInput from '@components/ChipInput';
import Button from '@components/Button';
import { Close } from '@mui/icons-material';
import SnackBar from '@components/SnackBar';

import { Grid, Typography, Divider, IconButton } from '@mui/material';

// Style
import {
  WrapperImages,
  Image,
  GridContainerModal,
  StyledPagination,
} from './style';

const GetImageFromPexels = forwardRef((props, __) => {
  const ref = useRef(null);
  const { handleClose, handleSelectImage } = props;
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState([]);
  const [pexelsData, setPexelsData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(-1);
  const [page, setPage] = useState(1);
  const [openSnackBar, setOpenSnackBar] = useState({
    message: '',
    open: false,
    type: 'error',
  });

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar((prevState) => ({
      message: '',
      open: false,
      type: prevState.type,
    }));
  };

  const handleOpenSnackBar = (message, type) => {
    setOpenSnackBar({
      message: '',
      open: false,
      type,
    });
    setTimeout(() => {
      setOpenSnackBar({
        message,
        open: true,
        type,
      });
    }, 250);
  };

  const handleSearchImagesOnPexels = async () => {
    if (words.length <= 0) {
      handleOpenSnackBar('Nenhuma palavra-chave informada.', 'error');
      return;
    }

    try {
      setLoading(true);
      const args = words.join(',');

      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${args}&page=${page}&per_page=10&locale=pt-BR&orientation=landscape&size=small`,
        {
          methods: 'GET',
          headers: {
            Authorization: process.env.REACT_APP_TOKEN_PEXELS,
          },
        }
      );

      const data = await response.json();
      if (!data?.photos?.length) {
        handleOpenSnackBar(
          'Nenhuma imagem encontrada para as palavras-chaves informadas.',
          'error'
        );
      }
      setPexelsData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (e, pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    // usei para nao buscar imagens na hora que o componente acaba de montar
    if (ref.current) {
      ref.current = false;
    } else {
      handleSearchImagesOnPexels();
    }
  }, [page]);

  return (
    <>
      <GridContainerModal container spacing={3}>
        <Grid
          ref={ref}
          item
          xs={12}
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <IconButton aria-label="closeModal" onClick={handleClose}>
            <Close />
          </IconButton>
          <Typography color="primary" component="h4" variant="h4">
            Busca de Imagens na Internet
          </Typography>
        </Grid>

        <Grid item style={{ marginBottom: 30 }}>
          <Divider />
        </Grid>

        <Grid container justifyContent="center" align="center" spacing={2}>
          <Grid item xs={9}>
            <ChipInput
              label="Palavras-Chaves"
              placeholder="Realize a busca de imagens por meio de palavra-chave..."
              suggestions={[]}
              value={words}
              onChange={(e, value) => {
                setWords(value);
              }}
            />
          </Grid>

          <Grid item xs={3}>
            <Button
              loading={loading}
              fullWidth
              style={{ height: '100%' }}
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSearchImagesOnPexels}
            >
              PESQUISAR
            </Button>
          </Grid>
          <WrapperImages>
            {pexelsData?.photos?.map((image, idx) => (
              <Image
                selected={idx === selectedImage}
                onClick={() => {
                  handleSelectImage(image);
                  setSelectedImage(idx);
                  handleOpenSnackBar(
                    'Imagem selecionada com sucesso.',
                    'success'
                  );
                }}
                key={image.id}
                src={image?.src?.medium}
                alt={image?.alt}
              />
            ))}
          </WrapperImages>
        </Grid>
        {!!pexelsData?.photos?.length && !!pexelsData?.next_page && (
          <StyledPagination
            onChange={handleChangePage}
            style={{ alignSelf: 'center' }}
            count={Math.floor(pexelsData.total_results / pexelsData.per_page)}
          />
        )}
      </GridContainerModal>

      <SnackBar
        openSnackBar={openSnackBar.open}
        handleCloseSnackBar={handleCloseSnackBar}
        autoHideDuration={2000}
        text={openSnackBar.message}
        severity={openSnackBar.type}
      />
    </>
  );
});

export default GetImageFromPexels;
