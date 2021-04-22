import React from 'react'

import {Button} from '@material-ui/core'

import GridContainer from '@components/Container'

const QuestionDatabase = ({handleClose}) => {
  return (
    <GridContainer container>
    <Button color='secondary' variant='contained' onClick={handleClose}>Fechar</Button>
    <h1>Digite as tags</h1>
    </GridContainer>
  )
}

export default QuestionDatabase;