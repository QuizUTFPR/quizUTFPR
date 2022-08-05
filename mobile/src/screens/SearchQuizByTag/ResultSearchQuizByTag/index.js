import React, { useEffect, useCallback } from 'react';
import theme from '@theme';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// HOOKS
import useSearchQuizByTag from '@hook/useSearchQuizByTag';

// Components
import Container from '@components/Container';
import CardWithTeacherName from '@components/Card/WithTeacherName';
import CardQuizInProgress from '@components/Card/InProgress';

// STYLES
import {
  QuizContainer,
  SafeArea,
  TagWrapper,
  TextBolder,
  WrapperTags,
  TagText,
  RemoveIcon,
  RemoveButton,
} from './style';

const ResultSearchTag = () => {
  const { quizzes, tags, removeTagAndGetNewQuizzes, getQuizByTags } =
    useSearchQuizByTag();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getQuizByTags();
    }, [])
  );

  useEffect(() => {
    if (quizzes.length === 0) {
      navigation.goBack();
    }
  }, [quizzes]);

  return (
    <Container>
      <SafeArea>
        <WrapperTags horizontal>
          {tags.map((item, idx) => (
            <TagWrapper key={item}>
              <TagText>{item}</TagText>
              <RemoveButton onPress={() => removeTagAndGetNewQuizzes(idx)}>
                <RemoveIcon />
              </RemoveButton>
            </TagWrapper>
          ))}
        </WrapperTags>

        <TextBolder>Resultados</TextBolder>

        <QuizContainer>
          {quizzes.map((item) =>
            item?.isInProgress ? (
              <CardQuizInProgress
                key={item.quiz.id}
                data={item}
                color={theme.color.primary}
                navigate={() =>
                  navigation.navigate('Descricao', {
                    idStudentQuiz: item.idStudentQuiz,
                    questionAmount: item.questionAmount,
                    studentChoicesAmount: item.studentChoicesAmount,
                    quiz: {
                      id: item.quiz.id,
                      title: item.quiz.title,
                      description: item.quiz.description,
                      pin: item.quiz.pin,
                      image: item.quiz?.image?.url,
                      tags: item.quiz.tagsQuiz.map((tag) => tag.name),
                      isFavorite: item.quiz.isFavorite,
                      noTime: item.quiz.noTime,
                    },
                    classInstance: item?.classInstance,
                  })
                }
              />
            ) : (
              <CardWithTeacherName
                key={item.quiz.id}
                data={item.quiz}
                navigate={() =>
                  navigation.navigate('Descricao', {
                    quiz: {
                      id: item.quiz.id,
                      title: item.quiz.title,
                      description: item.quiz.description,
                      pin: item.quiz.pin,
                      image: item.quiz?.image?.url,
                      tags: item.quiz.tagsQuiz.map((tag) => tag.name),
                      isFavorite: item.quiz.isFavorite,
                      noTime: item.quiz.noTime,
                    },
                  })
                }
                color={theme.color.primary}
              />
            )
          )}
        </QuizContainer>
      </SafeArea>
    </Container>
  );
};

export default ResultSearchTag;
