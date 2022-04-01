import React, { useRef } from 'react';

// Components
import RankingStudentItem from '@screens/Ranking/studentItem';
import FabButton from '@components/FabButton';

// Styles
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RankingContainer, StyledFlatList } from './style';

// Assets

const RankingClass = () => {
  const students = [
    { rank: 1 },
    { rank: 2 },
    { rank: 3 },
    { rank: 4 },
    { rank: 5 },
    { rank: 6 },
    { rank: 7 },
    { rank: 8 },
    { rank: 9 },
    { rank: 10 },
  ];
  const refList = useRef(null);

  const myIdx = 4;

  return (
    <RankingContainer fill="white">
      <StyledFlatList
        ref={refList}
        data={students}
        renderItem={({ item, index }) => (
          <RankingStudentItem
            isLoggedStudent={index === myIdx}
            rank={item.rank}
          />
        )}
        keyExtractor={({ rank }) => rank}
      />
      <FabButton
        icon={<MaterialCommunityIcons name="target" size={28} color="white" />}
        variant="primary"
        onPress={() =>
          refList.current.scrollToIndex({
            animated: true,
            index: myIdx,
          })
        }
      />
    </RankingContainer>
  );
};

export default RankingClass;
