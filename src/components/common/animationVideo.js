

import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import Video from 'react-native-video';
import intro from 'assets/video/intro.mp4';
import theme from 'theme';
import PropTypes from 'prop-types';

class AnimationVideo extends React.Component {
  render() {
    return (
      <Animated.View style={this.props.animatedStyle}>
        <Video
          source={intro}
          rate={1.0}
          paused={false}
          resizeMode="cover"
          repeat
          playInBackground={false}
          style={[styles.videoStyle, {
            height: this.props.heightSize,
            width: this.props.widthSize,
          }]}
        />
      </Animated.View>
    );
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: theme.size.screenHeight,
    width: theme.size.screenWidth,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',

  },
  videoStyle: {
    height: 105,
    width: 133,
    borderWidth: 3,
    borderColor: theme.colors.primary,

  },
});


AnimationVideo.defaultProps = {
  animatedStyle: {},
  heightSize: 105,
  widthSize: 133,
};

AnimationVideo.propTypes = {
  animatedStyle: PropTypes.any,
  widthSize: PropTypes.number,
  heightSize: PropTypes.number,

};


export default AnimationVideo;
