import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme';
import styles from './styles';

class Loading extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading !== this.props.isLoading
      && nextProps.isLoading === false) {
      Animated.timing(this.animHeight, {
        toValue: 0,
        duration: 1000,
      }).start(() => {
        this.props.onFinish();
      });
    }
  }

  animHeight = new Animated.Value(theme.size.screenHeight)

  render() {
    return (
      <Animated.View style={[styles.loadingView, { height: this.animHeight }]} />
    );
  }
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onFinish: PropTypes.func.isRequired,
};


export default Loading;
