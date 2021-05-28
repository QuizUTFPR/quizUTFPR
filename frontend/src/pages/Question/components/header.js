import React from 'react';

// ICONS
import { Save, CheckCircle, Done, Warning, Create } from '@material-ui/icons/';

// COMPONENTS
import StyledButton from '@components/Button';
import { Grid, Typography, Toolbar } from '@material-ui/core';
import {
  StyledAppBar,
  StyledMessage,
  BoxStyledAction,
  WrapperMessage,
  StyledExitIcon,
} from '../style';

const Header = ({ handleGetOut, location, handleSave, isSaved, isTyping }) => {
  let statusOfQuestions;

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
        <StyledMessage>Não Salvo</StyledMessage>
      </WrapperMessage>
    );
  }
  return (
    <StyledAppBar position="static" color="transparent">
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <StyledButton
              color="secondary"
              variant="outlined"
              onClick={handleGetOut}
              startIcon={<StyledExitIcon />}
              size="large"
            >
              Sair
            </StyledButton>
          </Grid>

          <Grid item>
            <Typography component="h4" variant="h4" color="primary">
              {location.state ? location.state.title : 'Sem Título'}
            </Typography>
          </Grid>

          <BoxStyledAction>
            {statusOfQuestions}
            <StyledButton
              style={{ marginRight: '20px' }}
              color="primary"
              variant="outlined"
              onClick={handleSave}
              startIcon={<Save />}
              size="large"
              disabled={isSaved || isTyping}
            >
              Salvar
            </StyledButton>
            <StyledButton
              color="primary"
              variant="contained"
              startIcon={<CheckCircle />}
              size="large"
            >
              Finalizar
            </StyledButton>
          </BoxStyledAction>
        </Grid>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
