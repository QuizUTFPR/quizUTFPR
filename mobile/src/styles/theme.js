import { DefaultTheme } from '@react-navigation/native';
import { PixelRatio, Dimensions, Platform } from 'react-native';
import theming from 'styled-theming';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function normalize(size) {
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  }
  return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
}
let FONT_BACK_LABEL = normalize(14);

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
  FONT_BACK_LABEL = normalize(12);
} else {
  FONT_BACK_LABEL = normalize(13);
}

console.log('SCREEN_HEIGHT', SCREEN_HEIGHT);
console.log('SCREEN_WIDTH', SCREEN_WIDTH);

// FONTES
const FONT_SIZE_NORMAL = normalize(FONT_BACK_LABEL + 5);
let FONT_SIZE_MEDIUM = normalize(FONT_BACK_LABEL + 5);
let FONT_SIZE_LARGE = normalize(FONT_BACK_LABEL + 10);
const FONT_SIZE_EXTRA_LARGE = normalize(FONT_BACK_LABEL + 20);

if (SCREEN_HEIGHT < 1000 && SCREEN_WIDTH > 400) {
  FONT_SIZE_MEDIUM = normalize(FONT_BACK_LABEL + 7);
  FONT_SIZE_LARGE = normalize(FONT_BACK_LABEL + 20);
} else if (SCREEN_HEIGHT < 1000) {
  FONT_SIZE_MEDIUM = normalize(FONT_BACK_LABEL + 7);
  FONT_SIZE_LARGE = normalize(FONT_BACK_LABEL + 20);
} else {
  FONT_SIZE_MEDIUM = normalize(FONT_BACK_LABEL + 15);
  FONT_SIZE_LARGE = normalize(FONT_BACK_LABEL + 40);
}

const theme = {
  mode: 'light',
  fontSize: {
    normal: FONT_SIZE_NORMAL,
    medium: FONT_SIZE_MEDIUM,
    large: FONT_SIZE_LARGE,
    extraLarge: FONT_SIZE_EXTRA_LARGE,
  },
  color: {
    fill: fillColor,
    backgroundButton: backgroundColorButton,
    textButton: textColorButton,
    purple: '#4B24B1',
    lightPurple: '#4c24b22f',
    white: '#fff',
    grey: '#d3d3d3',
    whiteGrey: '#DDDDDD',
    lightBlueGrey: '#eaeaf5',
    lightGrey: '#a6a6a6',
    darkGrey: '#222222',
    blackRussian: '#171c26',
    black: '#3b3b3b',
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
