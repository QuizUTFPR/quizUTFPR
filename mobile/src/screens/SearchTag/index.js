import React from 'react';

// HOOKS
import useSearchQuizByTag from '@hook/useSearchQuizByTag';

// Components
import Container from '@components/Container';
// import CardWithTeacherName from '@components/Card/WithTeacherName';

// THEME
// import theme from '@theme';

// STYLES
import { SafeArea, QuizContainer } from './style';

const SearchTag = () => {
  const { quizzes } = useSearchQuizByTag();
  console.log('quizzes', quizzes);
  return (
    <Container>
      <SafeArea>
        <QuizContainer>
          {/* {quizzes.map((quiz) => (
            <CardWithTeacherName
              key={quiz.id}
              data={quiz}
              navigate={() => console.log('teste')}
              // navigation.navigate('AttempsOfQuiz', {
              //   id: quiz.id,
              //   attempts: quiz.quizStudent,
              //   teacher: quiz.teacher,
              //   isFavorite: quiz.isFavorite,
              //   title: quiz.title,
              //   image: quiz?.image?.url,
              //   amountOfQuestions: quiz.amountOfQuestions,
              //   tags: quiz.tagsQuiz,
              //   noTime: quiz.noTime,
              // })

              color={theme.color.purple}
            />
          ))} */}
        </QuizContainer>
      </SafeArea>
    </Container>
  );
};

export default SearchTag;
