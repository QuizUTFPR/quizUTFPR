import React, { useRef, useState, useEffect } from 'react';
import api from '@api';

// Components
import RankingStudentItem from '@components/RankingLine';
import FabButton from '@components/FabButton';
import Toast from '@components/Toast';
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
      setShowToast({
        open: true,
        message: error.response.data.response,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllClassRanking();

    return () => {
      setRankingClassList([]);
      setBestScore(1);
      setLoading(true);
    };
  }, []);

  return (
    <>
      <RankingContainer fill="white">
        {!loading && rankingQuizList.length === 0 && (
          <NoContent
            title="Opps..."
            subtitle="Você não se inscreveu em nenhuma turma."
          />
        )}
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
        {rankingQuizList.length > 0 && (
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
        )}
      </RankingContainer>
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

export default RankingClass;
