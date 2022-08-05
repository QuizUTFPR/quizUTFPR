/* eslint-disable camelcase */
import React, { forwardRef } from 'react';

// COMPONENTS
import Wrapper from '@components/RefferedContainer';
import Dragzone from '@components/DragZoneImageOrSearch';
import useQuestion from '@hooks/QuestionQuiz';

import { IconButton, Grid, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
// import SnackBar from '@components/SnackBar';

const SheetQuestionModal = forwardRef((props, ref) => {
  const { handleReadExcelFile } = useQuestion();

  return (
    <Wrapper width={props.width} container spacing={3}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={3} md={1}>
          <IconButton aria-label="closeModal" onClick={props.handleClose}>
            <Close />
          </IconButton>
        </Grid>
        <Grid item xs={9} md={11}>
          <Typography variant="h5" color="primary">
            {props.modalTitle}
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          {props.modalDescription}
        </Grid>

        <Grid item xs={12}>
          <Dragzone
            handleChange={async (file) => {
              const response = await handleReadExcelFile(file);

              if (response) {
                props.handleClose();
              }
            }}
            label="Planilha de Questões"
            accept=".xlsx, .xls, .ods, application/vnd.oasis.opendocument.spreadsheet, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            canSearchOnInternet={false}
            description="Arraste e solte a planilha aqui ou clique no botão abaixo."
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
});

SheetQuestionModal.defaultProps = {
  props: {
    handleClose: () => {},
    modalDescription: '',
    modalTitle: '',
  },
};

export default SheetQuestionModal;
