import React from 'react';
import theme from '@theme';
import { Text } from 'react-native';

// HOOKS
import useSearchQuizByTag from '@hook/useSearchQuizByTag';

// Components
import Container from '@components/Container';
import CardWithTeacherName from '@components/Card/WithTeacherName';

// STYLES
import { QuizContainer, SafeArea } from './style';

const ResultSearchTag = () => {
  const { quizzes, tags } = useSearchQuizByTag();

  return (
    <Container>
      <SafeArea>
        {tags.map((item) => (
          <Text key={item}>{item}</Text>
        ))}

        <QuizContainer>
          {quizzes.map((quiz) => (
            <CardWithTeacherName
              key={quiz.id}
              data={quiz}
              navigate={() => console.log('teste')}
              color={theme.color.purple}
            />
          ))}
        </QuizContainer>
      </SafeArea>
    </Container>
  );
};

export default ResultSearchTag;
