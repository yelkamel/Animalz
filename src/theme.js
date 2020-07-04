/* eslint global-require: 0 */
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  maxTextSize: 70,
  colors: {
    white: '#FFF',
    black: '#000',
    red: '#FF676C',
    blackLogo: '#11020D',

    // couleur du theme
    primaryLight: '#C58BAC',
    primary: '#4C2F41',
    primaryDark: '#20050E',
    accent: '#27FFFF',
    grey: '#867274',
  },
  time: {
    splashScreenDelay: 2500,
    bannerShowIconDelay: 10000,
  },
  textSizes: {
    xxxsmall: 10,
    xxsmall: 13,
    notif: 15,
    xsmall: 16,
    small: 18,
    regular: 22,
    normal: 24,
    xnormal: 26,
    big: 36,
    xbig: 50,
    xxbig: 58,
  },
  fontFamily: {
    rubikRegular: 'Rubik-Regular',
    rubikMedium: 'Rubik-Medium',
    rubikLight: 'Rubik-Light',
  },
  size: {
    screenWidth: width,
    screenHeight: height,
    bannerHeight: 50,
    hideElasticSize: 50,
  },
};
