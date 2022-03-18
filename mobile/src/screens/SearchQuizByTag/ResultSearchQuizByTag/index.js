import React, { useEffect } from 'react';
import theme from '@theme';
import { useNavigation } from '@react-navigation/native';

// HOOKS
import useSearchQuizByTag from '@hook/useSearchQuizByTag';

// Components
import Container from '@components/Container';
import CardWithTeacherName from '@components/Card/WithTeacherName';

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
  const { quizzes, tags, removeTagAndGetNewQuizzes } = useSearchQuizByTag();
  const navigation = useNavigation();

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
          {quizzes.map((quiz) => (
            <CardWithTeacherName
              key={quiz.id}
              data={quiz}
              navigate={() =>
                navigation.navigate('Descricao', {
                  quiz: {
                    id: quiz.id,
                    title: quiz.title,
                    description: quiz.description,
                    pin: quiz.pin,
                    image: quiz?.image?.url,
                    tags: quiz.tagsQuiz.map((tag) => tag.name),
                    isFavorite: quiz.isFavorite,
                    noTime: quiz.noTime,
                  },
                })
              }
              color={theme.color.purple}
            />
          ))}
        </QuizContainer>
      </SafeArea>
    </Container>
  );
};

export default ResultSearchTag;
