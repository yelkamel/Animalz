import { StyleSheet } from 'react-native';
import theme from 'theme';

export const VIDEO_TOP_POS = theme.size.screenHeight * 0.1;
export const VIDEO_LEFT_POS = theme.size.screenWidth * 0.34;
export const VIDEO_WIDTH = theme.size.screenWidth * 0.36;
export const VIDEO_HEIGHT = theme.size.screenHeight * 0.16;

export const styles = StyleSheet.create({
  // MAP
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  djImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: theme.colors.primary,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  animationVideoContainer: {
    position: 'absolute',
    top: 60,
    left: 150,
    height: 100,
    width: 100,
  },

  // Video
  videoContainer: {
    position: 'absolute',
    top: VIDEO_TOP_POS,
    left: VIDEO_LEFT_POS,
    height: 210,
    width: 210,
  },
});
