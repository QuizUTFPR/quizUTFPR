import React, { useState } from 'react';
import PropTypes from 'prop-types';

// ICONS
import { Save, CheckCircle, Done, Warning, Create } from '@mui/icons-material/';

// COMPONENTS
import StyledButton from '@components/Button';
import { Grid, Typography } from '@mui/material';
import {
  StyledAppBar,
  StyledMessage,
  BoxStyledAction,
  WrapperMessage,
  StyledExitIcon,
  StyledToolBar,
} from '../style';

const Header = ({
  handleGetOut,
  location,
  handleSave,
  handleFinish,
  isSaved,
  isTyping,
}) => {
  let statusOfQuestions;

  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingFinish, setLoadingFinish] = useState(false);

  if (isSaved && !isTyping) {
    statusOfQuestions = (
      <WrapperMessage>
        <Done />
        <StyledMessage>Salvo</StyledMessage>
      </WrapperMessage>
    );
  } else if (isTyping) {
    statusOfQuestions = (
      <WrapperMessage>
        <Create />
        <StyledMessage>Digitando...</StyledMessage>
      </WrapperMessage>
    );
  } else {
    statusOfQuestions = (
      <WrapperMessage>
        <Warning />
        <StyledMessage>Há alterações que não foram salvas</StyledMessage>
      </WrapperMessage>
    );
  }
  return (
    <StyledAppBar position="static" color="transparent">
      <StyledToolBar>
        <Grid item>
          <StyledButton
            color="secondary"
            variant="outlined"
            onClick={handleGetOut}
            startIcon={<StyledExitIcon />}
            size="large"
            loading={false}
          >
            Voltar
          </StyledButton>
        </Grid>

        {/* <Grid item> */}
        <Typography noWrap component="h4" variant="h4" color="primary">
          {location.state ? location.state.title : 'Sem Título'}
        </Typography>
        {/* </Grid> */}

        <BoxStyledAction>
          {statusOfQuestions}
          <StyledButton
            style={{ marginRight: '20px' }}
            color="primary"
            variant="outlined"
            onClick={async () => {
              setLoadingSave(true);
              await handleSave();
              setLoadingSave(false);
            }}
            startIcon={<Save />}
            size="large"
            loading={loadingSave}
            disabled={
              isSaved || isTyping || location.state.published || loadingSave
            }
          >
            Salvar
          </StyledButton>
          <StyledButton
            disabled={location.state.published}
            color="primary"
            variant="contained"
            loading={loadingFinish}
            onClick={async () => {
              setLoadingFinish(true);
              await handleFinish();
              setLoadingFinish(false);
            }}
            startIcon={<CheckCircle />}
            size="large"
          >
            Finalizar
          </StyledButton>
        </BoxStyledAction>
      </StyledToolBar>
    </StyledAppBar>
  );
};

Header.defaultProps = {
  isSaved: false,
  isTyping: false,
};

Header.propTypes = {
  handleGetOut: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      title: PropTypes.string,
    }),
  }).isRequired,
  handleSave: PropTypes.func.isRequired,
  isSaved: PropTypes.bool,
  isTyping: PropTypes.bool,
};

export default Header;
