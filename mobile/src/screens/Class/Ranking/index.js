import React, { useRef, useState, useCallback } from 'react';
import api from '@api';
import { useFocusEffect } from '@react-navigation/native';

// Components
import RankingStudentItem from '@components/RankingLine';
import FabButton from '@components/FabButton';
import NoContent from '@components/NoContent';

// HOOKS
import useClass from '@hook/useClass';
import useStudentAuth from '@hook/useStudentAuth';

// Styles
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RankingContainer, StyledFlatList } from './style';

// Assets

const RankingClass = () => {
  const {
    classData: { id: classId },
  } = useClass();
  const {
    studentInfo: { student },
  } = useStudentAuth();

  const [rankingQuizList, setRankingClassList] = useState([]);
  const [bestScore, setBestScore] = useState(1);
  const [loading, setLoading] = useState(true);

  let myIdxToScroll = -1;

  const refList = useRef(null);

  const getAllClassRanking = async () => {
    try {
      setLoading(true);

      const { data } = await api.post('/ranking/getAllClassRanking', {
        classId,
      });

      const {
        rankStudentQuiz: { score },
      } = data[0];

      setBestScore(score);
      setRankingClassList(data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log('focou ranking');
      getAllClassRanking();

      return () => {
        setRankingClassList([]);
        setBestScore(1);
        setLoading(true);
      };
    }, [])
  );

  return (
    <>
      <RankingContainer fill="white">
        {!loading && rankingQuizList.length === 0 && (
          <NoContent
            title="Opps..."
            subtitle="Nenhum aluno respondeu algum quiz até o momento."
          />
        )}
        {rankingQuizList.length > 0 && (
          <>
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
          </>
        )}
      </RankingContainer>
    </>
  );
};

export default RankingClass;
