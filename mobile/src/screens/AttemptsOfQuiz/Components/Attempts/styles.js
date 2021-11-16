import styled from 'styled-components/native';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const AttemptCard = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.white};
  height: ${heightPercentageToDp('14%')}px;
  width: ${widthPercentageToDp('90%')}px;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: ${heightPercentageToDp('2%')}px;
`;

export const Score = styled.Text`
  font-size: ${({ theme }) => theme.fontSize + 5}px;
  font-family: PoppinsSemiBold;
  color: ${({ theme }) => theme.color.purple};
`;

export const StyledHashtag = styled.Text`
  font-size: ${({ theme }) => theme.fontSize + 15}px;
  font-family: PoppinsBold;
  color: ${({ theme }) => theme.color.lightPurple};
  margin-bottom: ${heightPercentageToDp('-1%')}px;
  margin-top: ${heightPercentageToDp('1%')}px;
`;

export const SytledDateTime = styled.Text`
  font-family: PoppinsSemiBold;
  font-size: ${({ theme }) => theme.fontSize - 3}px;
  color: ${({ theme }) => theme.color.lightGrey};
`;

export const AttemptNumberWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: ${widthPercentageToDp('20%')}px;
`;

export const AttemptNumber = styled.Text`
  font-size: ${({ theme }) => theme.fontSize + 30}px;
  font-family: PoppinsBold;
  color: ${({ theme }) => theme.color.lightPurple};
  margin-bottom: ${heightPercentageToDp('-1%')}px;
`;

export const AttemptInformations = styled.View`
  width: ${widthPercentageToDp('60%')}px;
  height: 80%;
  justify-content: space-between;
`;

export const QuizProgressBarBackground = styled.View`
  width: 100%;
  height: 15px;
  background: ${({ theme }) => theme.color.fill};
  border-radius: 30px;
`;

export const QuizProgressBar = styled.View`
  background: ${({ theme }) => theme.color.fill};
  width: ${({ porcentage }) => porcentage}%;
  height: 100%;
  border-radius: 30px;
`;

export const QuizProgressText = styled.Text`
  color: ${({ theme }) => theme.color.fill};
  font-size: ${({ theme }) => theme.fontSize + 2}px;
  font-family: 'PoppinsBold';
  margin-right: 5px;
  margin-bottom: ${heightPercentageToDp('-2%')}px;
`;

export const AttemptDateAndHits = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
