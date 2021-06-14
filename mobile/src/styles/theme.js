import { PixelRatio } from 'react-native';
import theming from 'styled-theming';

let FONT_BACK_LABEL = 18;

const backgroundColor = theming.variants('mode', 'variant', {
  primary: { light: '#4B24B1' },
  secondary: { light: '#FFFFFF' },
});

const textColor = theming.variants('mode', 'variant', {
  primary: { light: '#FFFFFF' },
  secondary: { light: '#4B24B1' },
});

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 14;
}

const theme = {
  mode: 'light',
  fontSize: FONT_BACK_LABEL,
  color: {
    background: backgroundColor,
    text: textColor,
  },
  size: {
    padding: 20,
    margin: 20,
  },
};

console.log('Font', FONT_BACK_LABEL);

export default theme;
