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

const Ranking = () => {
  const refList = useRef(null);
  const {
    studentInfo: { student },
  } = useStudentAuth();
  const [bestScore, setBestScore] = useState(1);
  const [rankingList, setRankingList] = useState([]);
  let myIdxToScroll = -1;
  const [loading, setLoading] = useState(true);

  const getGlobalRanking = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/studentRanking/getGlobalRanking');

      const {
        rankStudentQuiz: { score },
      } = data[0];

      setBestScore(score);
      setRankingList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGlobalRanking();

    return () => {
      setRankingList([]);
      setBestScore(1);
      setLoading(true);
    };
  }, []);

  return (
    <>
      <StyledContainer fill="white">
        {!loading && rankingList.length === 0 ? (
          <NoContent
            title="Opps..."
            subtitle="Nenhuma tentativa de resposta para os quizzes foi encontrada."
          />
        ) : null}
        <StyledFlatList
          ref={refList}
          data={rankingList}
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
        {rankingList.length > 0 ? (
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
        ) : null}
      </StyledContainer>
    </>
  );
};

export default Ranking;
