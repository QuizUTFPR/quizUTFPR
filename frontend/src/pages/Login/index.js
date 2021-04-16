import React, {useState} from 'react'

// COMPONENTS
import { 
  makeStyles, 
  Container, 
  Grid, 
  Typography, 
  Button,
  InputAdornment,
  TextField,
  IconButton
} from '@material-ui/core';
import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  Lock
} from '@material-ui/icons';

// ASSETS
import {ReactComponent as Illustration} from '@assets/login_illustration.svg'

// STYLES
const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    display: 'flex'
  },
  wrapperForm: {},
  descriptions: {
    paddingBottom: '20px'
  },
  title: {
    fontWeight: '700',
    marginBottom: '10px'
  },
  subtitle: {
    fontWeight: '500',
    opacity: '0.7'
  },
  input:{
    width: '100%',
    marginBottom: '20px'
  },
  form: {
    width: '100%'
  },
  button: {
    width: '50%',
    height: '50px',
    fontWeight: 'bolder',
    fontSize: '1.3em'
  }
});



const Login = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };


  return (
    <Container className={classes.container}>
      <Grid container alignItems='center'>

        <Grid item xs={6}>
          <Illustration />
        </Grid>
        
        <Grid 
          item
          xs={12} sm={12} md={6} lg={6} 
          className={classes.wrapperForm}
        >
          <Grid item xs={12} className={classes.descriptions}>
            <Typography className={classes.title} variant='h4' color='primary'>Login</Typography>
            <Typography className={classes.subtitle} color='primary'>
              Seja bem-vindo novamente! <br />
              Por favor entre em sua conta logo abaixo.
            </Typography>
          </Grid>

          <Grid
            item xs={12}
            component='form' className={classes.form} 
            onSubmit={(e) => {
              e.preventDefault();
              console.log(values.password, values.username);
            }} 
          >
              <TextField
                className={classes.input} color='primary'variant= 'filled'
                id='username' label= 'Usuário' value={values.username}
                onChange={handleChange('username')}
                InputProps={{
                  startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                  ),}}
                autoFocus
              />
          
              <TextField 
                className={classes.input} color='primary' variant= 'filled'
                id='password' label= 'Senha' type={values.showPassword ? 'text' : 'password'}
                value={values.password} onChange={handleChange('password')}
                InputProps={{
                  startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                  ),
                  endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                  ),}}
              />
            
        
            <Grid item align='center'>
              <Button type='submit' className={classes.button} color="primary" variant="contained">
                ENTRAR
              </Button>
            </Grid>
          </Grid>

      </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
