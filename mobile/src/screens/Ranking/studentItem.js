import React from 'react';

// Components
import ProgressBar from '@components/ProgressBar';

// Assets
import Medal1 from '@assets/icons/medal_1.png';
import Medal2 from '@assets/icons/medal_2.png';
import Medal3 from '@assets/icons/medal_3.png';

// Styles
import {
  Wrapper,
  WrapperStudent,
  StudentImage,
  WrapperProgress,
  PositionOnRank,
  PositionText,
  MedalImage,
} from './styleStudentItem';

const iconRank = {
  1: Medal1,
  2: Medal2,
  3: Medal3,
};

const ListOfStudents = ({ rank, isLoggedStudent }) => (
  <Wrapper>
    <WrapperStudent key={rank} isLoggedStudent={!!isLoggedStudent}>
      <PositionOnRank>
        {rank < 4 ? (
          <MedalImage source={iconRank[rank]} />
        ) : (
          <PositionText>#{rank}</PositionText>
        )}
      </PositionOnRank>
      <StudentImage
        source={{ uri: 'http://192.168.1.9:3333/avatars/avatar1.png' }}
      />
      <WrapperProgress>
        <ProgressBar width="100px" />
      </WrapperProgress>
    </WrapperStudent>
  </Wrapper>
);

export default ListOfStudents;
