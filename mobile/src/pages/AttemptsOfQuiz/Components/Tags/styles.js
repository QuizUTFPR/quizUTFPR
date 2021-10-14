import styled from 'styled-components';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const StyledScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  width: ${widthPercentageToDp('100%')}px;
`;

export const TagContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${widthPercentageToDp('90%')}px;
  height: ${heightPercentageToDp('6%')}px;
  padding-left: 22px;
  padding-right: 22px;
  border-radius: 30px;
  margin-top: ${heightPercentageToDp('1%')}px;
  background: ${({ theme }) => theme.color.white};
`;

export const TagText = styled.Text`
  font-family: PoppinsSemiBold;
  font-size: ${({ theme }) => theme.fontSize + 2}px;
  color: ${({ theme }) => theme.color.purple};
  margin-bottom: ${heightPercentageToDp('-0.5%')}px;
`;

export const IconButtonWrapper = styled.Text``;
