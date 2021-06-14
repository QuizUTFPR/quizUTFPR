import { PixelRatio } from 'react-native';

let FONT_BACK_LABEL = 18;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 14;
}

const theme = {
  fontSize: FONT_BACK_LABEL,
  text: {
    primary: '#4B24B1',
    accent: 'yellow',
  },
  color: {
    background: '#4B24B1',
  },
  size: {
    padding: 20,
    margin: 20,
  },
};

console.log('Font', FONT_BACK_LABEL);

export default theme;
