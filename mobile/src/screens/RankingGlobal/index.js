import React, { useRef, useState, useEffect } from 'react';
import api from '@api';

// Components
import RankingStudentItem from '@components/RankingLine';
import FabButton from '@components/FabButton';
import Toast from '@components/Toast';

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

  const [showToast, setShowToast] = useState({
    open: false,
    message: '',
    type: 'success',
  });

  const handleCloseToast = () => {
    setShowToast({
      open: false,
      message: '',
    });
  };

  const getGlobalRanking = async () => {
    try {
      const { data } = await api.get('/ranking/getGlobalRanking');

      const {
        rankStudentQuiz: { score },
      } = data[0];

      setBestScore(score);
      setRankingList(data);
    } catch (error) {
      setShowToast({
        open: true,
        message: error.response.data.response,
        type: 'error',
      });
    }
  };

  useEffect(() => {
    getGlobalRanking();

    return () => {
      setRankingList([]);
      setBestScore(1);
    };
  }, []);

  return (
    <>
      <StyledContainer fill="white">
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
      <Toast
        type={showToast.type}
        handleClose={handleCloseToast}
        open={showToast.open}
        timeToErase={1000}
      >
        {showToast.message}
      </Toast>
    </>
  );
};

export default Ranking;
