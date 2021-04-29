import React, {forwardRef, useState, useEffect} from 'react'

import {IconButton, Grid, Typography, Divider } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import {StyledSearchTagButton} from './style'

// COMPONENTS
import GridContainer from '@components/Container'
import InputAutoComplete from '@components/AutoCompleteInput'
import Question from './question'


const FakeQuestions = [{
    title: "Chabu é erro?",
    correctAnswer: true,
    timer: 15,
    difficultyLevel: 3,
    quiz_id: 2,
    answer: [
        {
            title: "Verdadeiro",
            is_correct: true
        },
        {
            title: "Mentira",
            is_correct: false
        }
    ],
    tags: [{name: "erro"}]
  },
  {
    title: "Chabu é correto?",
    correctAnswer: true,
    timer: 15,
    difficultyLevel: 3,
    quiz_id: 2,
    answer: [
        {
            title: "Verdadeiro",
            is_correct: true
        },
        {
            title: "Mentira",
            is_correct: false
        }
    ],
    tags: [{name: "erro"}]
  },
  {
    title: "Chabu é teste?",
    correctAnswer: true,
    timer: 15,
    difficultyLevel: 3,
    quiz_id: 2,
    answer: [
        {
            title: "Verdadeiro",
            is_correct: true
        },
        {
            title: "Mentira",
            is_correct: false
        }
    ],
    tags: [{name: "erro"}]
  },
  {
    title: "Chabu é aaa?",
    correctAnswer: true,
    timer: 15,
    difficultyLevel: 3,
    quiz_id: 2,
    answer: [
        {
            title: "Verdadeiro",
            is_correct: true
        },
        {
            title: "Mentira",
            is_correct: false
        }
    ],
    tags: [{name: "erro"}]
  },
  {
    title: "Chabu é dawdawdawdwa?",
    correctAnswer: true,
    timer: 15,
    difficultyLevel: 3,
    quiz_id: 2,
    answer: [
        {
            title: "Verdadeiro",
            is_correct: true
        },
        {
            title: "Mentira",
            is_correct: false
        }
    ],
    tags: [{name: "erro"}]
  }
  ]



const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

const QuestionDatabase = forwardRef((props, ref) => {
  const [checkboxes, setCheckboxes] = useState([]);

  const handleQuestionChecked = (question, id) => (e) => {
    setCheckboxes(prevState => ({
      ...prevState,
      [id]: e.target.checked
    }))

    if(e.target.checked){
      props.handleaddQuestion(question);
    }else{
      props.handleRemoveQuestion(question);
    }
  }


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
              Banco de Questões via Tag's
            </Typography>
          </Grid>
        </Grid>
  
        <Grid container justify='center' alignItems='center' spacing={2}>
          <Grid item xs={9}>
            <InputAutoComplete
              fullWidth
              stateValue={'tag'}
              suggestions={["aprenda", "ola"]}
              onChange={(e) => {console.log(e)}}
              variant='filled'
              label="Tag"
              placeholder="Digite a Tag de questões que você deseja pesquisar..."
            />
          </Grid>
          <Grid item xs={3}>
            <StyledSearchTagButton fullWidth color='primary' variant='contained'>Pesquisar</StyledSearchTagButton>
          </Grid>
        </Grid>
  
        <Grid item><Divider /></Grid>

        <Grid container spacing={3} justify='center' style={{ overflow: 'scroll', height:'calc(100vh - 25px - 72px - 48px - 60px)' }}>
          {/* {FakeQuestions.filter(element => !props.questions.includes(element)).map((question, index)=>
            <Grid key={index} item xs={12}>
              <Question 
                question={question} id={index} 
                checked={checkboxes[index]} 
                onChange={() => handleQuestionChecked(question, index)} 
              />
            </Grid>
          )} */}
          
          {FakeQuestions.map((question, index) => (
            <Grid key={index} item xs={12}>
              <Question 
                question={question} id={index} 
                checked={checkboxes[index]} 
                onChange={() => handleQuestionChecked(question, index)} 
              />
            </Grid>
          ))}          
        </Grid>
      </Wrapper>
    )
  })


export default QuestionDatabase;