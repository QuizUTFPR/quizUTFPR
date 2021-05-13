import React, {forwardRef} from 'react';
import { useFormik } from "formik";



// COMPONENTS
import GridContainer from '@components/Container';
import Button from '@components/Button';
import ChipInput from "@components/ChipInput";
import {
  IconButton, 
  Grid, 
  Typography, 
  Divider, 
  TextField, 
  MenuItem
} from '@material-ui/core';

// ASSETS
import SaveIcon from '@material-ui/icons/Save';
import { Close } from '@material-ui/icons';

const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

const TypeOfQuestion = forwardRef((props, ref) => {

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      visibility: "public",
      file: {},
      tags: ["UTFPR", "QUIZ"]
    },
    onSubmit: values => {
      console.log(values)
    }
  });


  return(
      <Wrapper container spacing={3} >
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={3} md={1}>
            <IconButton aria-label="closeModal" onClick={props.handleClose}>
              <Close />
            </IconButton >
          </Grid>

          <Grid item xs={9} md={11}>
            <Typography variant='h5' color='primary'>
              Preferências do Quiz
            </Typography>
          </Grid>
        </Grid>
  
  
        <Grid item><Divider /></Grid>

        <Grid
          container
          component="form"
          justify="center"
          align="center"
          onSubmit={formik.handleSubmit}
          spacing={2}
        >
        
        <Grid item xs={12}>
          <TextField
            type="file"
            name="Imagem de Capa"
            id="file"
            onChange={event => 
              formik.setFieldValue("file", event.target.files[0])
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Título"
            id="title"
            variant="filled"
            value={formik.values.title}
            onChange={formik.handleChange}
            required
            autoFocus
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Visibilidade"
            id="visibility"
            name='visibility'
            variant="filled"
            value={formik.values.visibility}
            onChange={(event) => 
              formik.setFieldValue("visibility", event.target.value)
            }
            required
            select
          >
            <MenuItem value="public">Público</MenuItem>
            <MenuItem value="other">Outros</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descrição"
            id="description"
            variant="filled"
            value={formik.values.description}
            onChange={formik.handleChange}
            required
            multiline
            rows={5}
            rowsMax={5}
          />
        </Grid>

        <Grid item xs={12}>
          <ChipInput
            fullWidth
            value={formik.values.tags}
            suggestions={["Aprenda", "JavaScript"]}
            onChange={(_, value) => formik.setFieldValue("tags", value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            SALVAR ALTERAÇÔES
          </Button>
        </Grid>      
      </Grid>
      </Wrapper>
    )
  })


export default TypeOfQuestion;