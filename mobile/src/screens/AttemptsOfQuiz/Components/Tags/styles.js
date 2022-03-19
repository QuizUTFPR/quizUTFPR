import styled from 'styled-components';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const TagContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${widthPercentageToDp('90%')}px;
  height: ${heightPercentageToDp('6%')}px;
  padding-left: 22px;
  padding-right: 22px;
  border-radius: 30px;
  margin-bottom: ${heightPercentageToDp('2%')}px;
  background: ${({ theme }) => theme.color.white};
`;

export const TagText = styled.Text`
  font-family: PoppinsSemiBold;
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  color: ${({ theme }) => theme.color.purple};
  margin-bottom: ${heightPercentageToDp('-0.5%')}px;
`;

export const IconButtonWrapper = styled.Text``;
