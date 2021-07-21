import styled from 'styled-components/native';

// ASSETS
import HeaderBackground from '@assets/patterns/sunburst.png';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const HeaderWrapper = styled.View``;

export const BackgroundHeader = styled.ImageBackground.attrs({
  source: HeaderBackground,
  resizeMode: 'cover',
  imageStyle: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
})`
  justify-content: center;
  width: ${widthPercentageToDp('100%')}px;
  height: ${heightPercentageToDp('30%')}px;
`;

export const HeaderInformations = styled.View`
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

export const StyledWelcome = styled.Text`
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

export const QuizContainer = styled.View``;

export const QuizProgressBarBackground = styled.View`
  width: 100%;
  height: 15px;
  margin-left: 5px;
  margin-bottom: 5px;
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
  position: absolute;
  right: 5px;
  bottom: 0;
  color: ${({ theme }) => theme.color.fill};
  font-size: ${({ theme }) => theme.fontSize - 5}px;
  font-family: 'PoppinsBold';
`;
