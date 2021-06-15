import { PixelRatio } from 'react-native';
import theming from 'styled-theming';

let FONT_BACK_LABEL = 18;

const backgroundColorButton = theming.variants('mode', 'variant', {
  primary: { light: '#4B24B1' },
  secondary: { light: '#FFFFFF' },
});

const textColorButton = theming.variants('mode', 'variant', {
  primary: { light: '#FFFFFF' },
  secondary: { light: 'black' },
});

const fillColor = theming.variants('mode', 'fill', {
  white: { light: '#FFFFFF' },
  purple: { light: '#4B24B1' },
});

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 14;
}

const theme = {
  mode: 'light',
  fontSize: FONT_BACK_LABEL,
  color: {
    fill: fillColor,
    backgroundButton: backgroundColorButton,
    textButton: textColorButton,
    purple: '#4B24B1',
  },
  size: {
    padding: 20,
    margin: 20,
  },
};

export default theme;
