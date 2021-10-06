import { DefaultTheme } from '@react-navigation/native';
import { PixelRatio } from 'react-native';
import theming from 'styled-theming';

let FONT_BACK_LABEL = 14;

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
  black: { light: '#222222' },
  orange: { light: '#f99f4c' },
  lightGrey: { light: '#cecece' },
});

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 12;
}

const theme = {
  mode: 'light',
  fontSize: FONT_BACK_LABEL,
  color: {
    fill: fillColor,
    backgroundButton: backgroundColorButton,
    textButton: textColorButton,
    purple: '#4B24B1',
    white: '#fff',
    grey: '#d3d3d3',
    whiteGrey: '#DDDDDD',
    lightBlueGrey: '#eaeaf5',
    darkGrey: '#222222',
    blackRussian: '#171c26',
    red: '#FF6347',
    green: '#3CB371',
    blue: '#1e90FF',
    gradients: {
      orange: ['#fdb646', '#f99f4c'],
      purple: ['#4B24B1', '#3b1b96'],
    },
  },
  size: {
    padding: 20,
    margin: 20,
  },
};

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    black: '#222222',
    orange: '#f99f4c',
    purple: '#4B24B1',
    white: '#fff',
    background: '#eaeaf5',
  },
};

export default theme;
