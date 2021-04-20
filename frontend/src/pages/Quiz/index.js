import React from 'react'
import styled from 'styled-components'

import { 
  Typography, 
} from '@material-ui/core';

// COMPONENTS
import GridContainer from '../../components/Container'

import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CardActions
} from '@material-ui/core';

import {
  Edit,
  Delete
} from '@material-ui/icons';


const StyledCard = styled(Card)`
  display: flex;
`

const StyledCardMedia = styled(CardMedia)`
  width: 20%;
  height: 140px;
`

const StyledCardContent = styled(CardContent)`
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
`
const StyledCardActions = styled(CardActions)`
  && {
    button span {
      color: ${({theme}) => theme.palette.primary.main};
    }
  }
`

const Home = () => {

  return (
    <GridContainer container>
      <StyledCard >
        <StyledCardMedia
          image="https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg"
          title="Live from space album cover"
        />
        <StyledCardContent>
          <Typography color='primary' component="h5" variant="h5">
            Título Aqui...
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Descrição aqui...
          </Typography>
        </StyledCardContent>
        <StyledCardActions>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton>
            <Delete />
          </IconButton>
        </StyledCardActions>
    </StyledCard>
    </GridContainer>
  )
}


export default Home;