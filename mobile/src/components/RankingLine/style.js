import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
`;

export const WrapperStudent = styled.View`
  flex-direction: row;
  align-items: center;
  background: ${({ theme }) => theme.color.white};
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  border: ${({ isLoggedStudent }) => (isLoggedStudent ? '2px' : '0px')} dashed
    black;

  border-radius: 4px;

  margin-bottom: 20px;
`;

export const StudentImage = styled.Image.attrs({
  borderRadius: 5,
})`
  height: 60px;
  width: 60px;
`;

export const MedalImage = styled.Image.attrs({
  borderRadius: 5,
})`
  height: 50px;
  width: 50px;
`;

export const WrapperProgress = styled.View`
  flex: 1;
  margin: 0 5px;
`;

export const PositionOnRank = styled.View`
  align-items: center;
  justify-content: center;
`;

export const PositionOnRankText = styled(PositionOnRank)`
  margin-bottom: -15px; // Colocado porque a fonte Poppins tem uma margem em baixo
`;

export const PositionText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium}px;
  font-family: 'PoppinsExtraBold';
  color: ${({ theme }) => theme.color.lightGrey};
  text-align: center;
  height: 50px;
  width: 50px;
`;

export const NameOfPlayer = styled.Text.attrs({ numberOfLines: 1 })`
  font-family: 'PoppinsBold';
`;

export const PontuationOfPlayer = styled.Text.attrs({ numberOfLines: 1 })`
  font-family: 'PoppinsBold';
  align-self: flex-end;
`;
