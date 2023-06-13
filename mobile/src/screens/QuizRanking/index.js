import React, { useRef, useState, useEffect } from 'react';
import api from '@api';

// Components
import RankingStudentItem from '@components/RankingLine';
import FabButton from '@components/FabButton';
import NoContent from '@components/NoContent';

// HOOKS
import useStudentAuth from '@hook/useStudentAuth';

// Style
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyledContainer, StyledFlatList } from './style';

const Ranking = ({ route }) => {
  const { quizId, classId } = route.params;
  const {
    studentInfo: { student },
  } = useStudentAuth();
  const [rankingQuizList, setRankingQuizList] = useState([]);
  const [bestScore, setBestScore] = useState(1);
  let myIdxToScroll = -1;
  const [loading, setLoading] = useState(true);

  const refList = useRef(null);

  const getAllQuizRanking = async () => {
    try {
      setLoading(true);
      const { data } = await api.post('/studentRanking/getAllQuizRanking', {
        quizId,
        classId,
      });

      const {
        rankStudentQuiz: { score },
      } = data[0];

      setBestScore(score);
      setRankingQuizList(data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllQuizRanking();

    return () => {
      setRankingQuizList([]);
      setBestScore(1);
      setLoading(true);
    };
  }, []);

  return (
    <>
      <StyledContainer fill="white">
        {!loading && rankingQuizList.length === 0 ? (
          <NoContent
            title="Opps..."
            subtitle="Nenhuma tentativa de resposta para os quizzes foi encontrada."
          />
        ) : null}
        <StyledFlatList
          ref={refList}
          data={rankingQuizList}
          renderItem={({ item, index }) => {
            const name = item?.rankStudent?.name;
            const pontuation = item?.rankStudentQuiz?.score;
            const imageUrl = item?.rankStudent?.imageProfile?.url;

            if (item.studentId === student.id) {
              myIdxToScroll = index;
            }

            return (
              <RankingStudentItem
                isLoggedStudent={item.studentId === student.id}
                rank={index + 1}
                name={name}
                porcentage={(pontuation * 100) / bestScore}
                pontuation={pontuation}
                imageUrl={imageUrl}
              />
            );
          }}
          keyExtractor={({ studentId }) => studentId}
        />
        <FabButton
          icon={
            <MaterialCommunityIcons name="target" size={28} color="white" />
          }
          variant="primary"
          onPress={() => {
            if (myIdxToScroll >= 0) {
              refList.current.scrollToIndex({
                animated: true,
                index: myIdxToScroll,
              });
            }
          }}
        />
      </StyledContainer>
    </>
  );
};

export default Ranking;
