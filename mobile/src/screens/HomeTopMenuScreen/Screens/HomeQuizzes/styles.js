import styled from 'styled-components/native';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const QuizTitle = styled.Text`
  align-self: flex-start;
  margin-top: ${heightPercentageToDp('2%')}px;
  color: ${({ theme }) => theme.color.purple};
  font-size: ${({ theme }) => theme.fontSize + 3}px;
  font-family: 'PoppinsBold';
`;

export const QuizCard = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  justify-content: space-between;
  width: ${widthPercentageToDp('85%')}px;
  height: ${heightPercentageToDp('12%')}px;
  border-radius: 10px;
  margin-bottom: ${heightPercentageToDp('2%')}px;
  background: ${({ theme }) => theme.color.white};
`;

export const Description = styled.View`
  flex: 1;
`;

export const StyledView = styled.View`
  height: 100%;
  flex: 1;
`;

export const StyledImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 35%;
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background: ${({ theme }) => theme.color.purple};
`;

export const StyledTitle = styled.Text.attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  font-size: ${({ theme }) => theme.fontSize - 2}px;
  color: ${({ theme }) => theme.color.fill};
  font-family: 'PoppinsBold';
  margin-left: 10px;
  margin-top: 5px;
`;

export const StyledText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize - 2}px;
  font-family: 'PoppinsRegular';
  margin-left: 10px;
`;

export const StyledIconButton = styled.View`
  margin-right: ${({ theme }) => theme.size.padding}px;
`;

export const StyledScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  width: ${widthPercentageToDp('100%')}px;
`;

export const QuizContainer = styled.View`
  margin-top: 10px;
`;

export const SeeMore = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background: red;
  height: 30px;
  width: 100px;
  border-radius: 5px;
  margin-top: 10px;
  align-self: flex-end;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color.purple};
`;

export const SeeMoreText = styled.Text`
  color: ${({ theme }) => theme.color.fill};
  font-family: 'PoppinsBold';
`;
