import styled from 'styled-components/native';

// ASSETS
import HeaderBackground from '@assets/patterns/sunburst.png';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const HeaderWrapper = styled.SafeAreaView``;

export const BackgroundHeader = styled.ImageBackground.attrs({
  source: HeaderBackground,
  resizeMode: 'cover',
  imageStyle: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
})`
  justify-content: center;
  width: ${widthPercentageToDp('100%')}px;
  height: ${heightPercentageToDp('30%')}px;
`;

export const HeaderInformations = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const HeaderWelcomeTextView = styled.View`
  justify-content: center;
  align-items: center;
`;

export const HeaderButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

export const InputWrapper = styled.View.attrs({ elevation: 10 })`
  background: white;
  flex-direction: row;
  border-radius: 20px;
  height: 50px;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: ${({ theme }) => theme.size.padding}px;
  margin-left: ${({ theme }) => theme.size.padding}px;
  margin-right: ${({ theme }) => theme.size.padding}px;
  margin-top: ${({ theme }) => theme.size.padding}px;
`;

export const SearchInput = styled.TextInput.attrs({})`
  padding-left: 10px;
  border-radius: 10px;
  height: 40px;
  flex: 1;
  font-family: 'PoppinsRegular';
`;

export const StyledTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize + 12}px;
  font-family: 'PoppinsBlack';
  color: ${({ theme }) => theme.color.fill};
`;

export const StyledParagraph = styled.Text`
  margin-top: -10px;
  font-family: 'PoppinsRegular';
  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme }) => theme.color.fill};
`;

export const QuizTitle = styled.Text`
  align-self: flex-start;
  margin-top: ${heightPercentageToDp('2%')}px;
  color: ${({ theme }) => theme.color.purple};
  font-size: ${({ theme }) => theme.fontSize + 3}px;
  font-family: 'PoppinsBold';
`;

export const QuizCard = styled.TouchableOpacity`
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  justify-content: space-between;
  width: ${widthPercentageToDp('85%')}px;
  height: ${heightPercentageToDp('12%')}px;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: ${heightPercentageToDp('2%')}px;
  background: ${({ theme }) => theme.color.white};
`;

export const Description = styled.View`
  height: 90%;
  justify-content: space-between;
`;

export const StyledImage = styled.Image`
  width: ${widthPercentageToDp('18%')}px;
  height: ${heightPercentageToDp('9%')}px;
  border-radius: 5px;
`;

export const StyledText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize - 2}px;
  font-family: 'PoppinsRegular';
  margin-left: 10px;
`;

export const StyledIconButton = styled.Text``;

export const StyledView = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
`;

export const StyledScrollView = styled.ScrollView`
  width: ${widthPercentageToDp('100%')}px;
`;

export const QuizContainer = styled.View`
  width: 100%;
  padding-left: ${heightPercentageToDp('4%')}px;
`;
