import styled from 'styled-components/native';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

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

export const StyledImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 35%;
  height: 100%;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background: ${({ theme }) => theme.color.purple};
`;

export const StyledView = styled.View`
  height: 100%;
  flex: 1;
`;

export const Description = styled.View`
  flex: 1;
`;

export const QuizTitle = styled.Text.attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
  adjustsFontSizeToFit: true,
})`
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  color: ${({ theme }) => theme.color.fill};
  font-family: 'PoppinsBold';
  margin-left: 10px;
  margin-top: 5px;
`;

export const StyledIconButton = styled.View`
  margin-right: ${({ theme }) => theme.size.padding}px;
`;
