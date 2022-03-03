import styled from 'styled-components/native';

// COMPONENTS
import { Container } from '@components/Container/style';

// DIMENSIONS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const ClassDetailsContainer = styled(Container)`
  background: ${({ theme }) => theme.color.fill};
  padding-left: ${widthPercentageToDp('8%')}px;
  padding-right: ${widthPercentageToDp('8%')}px;
  padding-top: ${heightPercentageToDp('3%')}px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium}px;
  font-family: 'PoppinsBold';
`;
