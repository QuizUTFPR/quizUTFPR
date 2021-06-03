import { PixelRatio } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

let FONT_BACK_LABEL = 18;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 14;
}

const theme = {
  ...DefaultTheme,
  label: {
    fontSize: FONT_BACK_LABEL,
  },
  colors: {
    ...DefaultTheme.colors,
    primary: '#333D54',
    accent: 'yellow',
  },
};
console.log(theme.label.fontSize);

export default theme;
