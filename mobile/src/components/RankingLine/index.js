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
  PositionOnRankText,
  NameOfPlayer,
  PontuationOfPlayer,
} from './style';

const iconRank = {
  1: Medal1,
  2: Medal2,
  3: Medal3,
};

const ListOfStudents = ({
  rank,
  isLoggedStudent,
  name,
  pontuation,
  imageUrl,
  porcentage,
}) => (
  <Wrapper>
    <WrapperStudent key={rank} isLoggedStudent={!!isLoggedStudent}>
      {rank < 4 ? (
        <PositionOnRank>
          <MedalImage source={iconRank[rank]} />
        </PositionOnRank>
      ) : (
        <PositionOnRankText>
          <PositionText>#{rank}</PositionText>
        </PositionOnRankText>
      )}
      <StudentImage source={{ uri: imageUrl }} />
      <WrapperProgress>
        <NameOfPlayer>{name}</NameOfPlayer>
        <ProgressBar porcentage={porcentage} />
        <PontuationOfPlayer>{pontuation} pts.</PontuationOfPlayer>
      </WrapperProgress>
    </WrapperStudent>
  </Wrapper>
);

ListOfStudents.defaultProps = {
  rank: 0,
  isLoggedStudent: false,
  name: '',
  pontuation: 0,
  porcentage: 10,
  imageUrl: 'http://192.168.1.9:3333/avatars/avatar1.png',
};

export default ListOfStudents;
