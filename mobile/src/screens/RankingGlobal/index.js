import React, { useRef } from 'react';

// Components
import RankingStudentItem from '@components/RankingLine';
import FabButton from '@components/FabButton';

// Style
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyledContainer, StyledFlatList } from './style';

const Ranking = () => {
  const students = [
    { rank: 1, name: 'Lala' },
    { rank: 2, name: 'Lala' },
    { rank: 3, name: 'Lala' },
    { rank: 4, name: 'Lala' },
    { rank: 5, name: 'Lala' },
    { rank: 6, name: 'Lala' },
    { rank: 7, name: 'Lala' },
    { rank: 8, name: 'Lala' },
    { rank: 9, name: 'Lala' },
    { rank: 10, name: 'Lala' },
  ];

  const refList = useRef(null);

  const myIdx = 4;

  return (
    <StyledContainer fill="white">
      <StyledFlatList
        ref={refList}
        data={students}
        renderItem={({ item, index }) => (
          <RankingStudentItem isLoggedStudent={index === myIdx} {...item} />
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
    </StyledContainer>
  );
};

export default Ranking;
