import React, { useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ROTAS
import { QUESTION } from '@routes';

// COMPONENTS
import GridContainer from '@components/Container';
import ChipInput from '@components/ChipInput';
import Button from '@components/Button';
import { Close } from '@mui/icons-material';

import {
  Grid,
  Typography,
  Divider,
  MenuItem,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
  Tooltip,
} from '@mui/material';

const GetImageFromPexels = forwardRef((props, __) => {
  const { handleClose } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <GridContainer container spacing={3}>
      <Grid item xs={3} md={1}>
        <IconButton aria-label="closeModal" onClick={handleClose}>
          <Close />
        </IconButton>
      </Grid>
      <Grid container align="center" justifyContent="center">
        <Typography color="primary" component="h4" variant="h4">
          Informações do Quiz
        </Typography>
      </Grid>

      <Grid item>
        <Divider />
      </Grid>

      <Grid container justifyContent="center" align="center" spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descrição"
            id="description"
            variant="outlined"
            required
            multiline
            minRows={5}
            maxRows={5}
          />
        </Grid>

        <Grid item xs={12}>
          <ChipInput
            fullWidth
            suggestions={['Aprenda', 'JavaScript']}
            onChange={(_, value) => {
              console.log('value', value);
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Button
            loading={loading}
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            CRIAR QUIZ
          </Button>
        </Grid>
      </Grid>
    </GridContainer>
  );
});

export default GetImageFromPexels;
