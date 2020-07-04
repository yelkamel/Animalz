import React from 'react';
import { Image, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';

import theme from 'theme';

import styles from './styles';

class PictureSwitch extends React.Component {
  state = {
    isAnimate: false,
  };

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen && nextProps.isOpen) {
      this.animateToMiddle();
    } else if (nextProps.animate !== this.props.animate && nextProps.animate) {
      this.setState(
        (state) => ({ ...state, isAnimate: true }),
        () => {
          this.scroll._component.scrollTo({
            x: 30,
            y: 0,
            Animated: true,
          });
          Animated.delay(200).start(() => {
            this.scroll._component.scrollTo({
              x: 0,
              y: 0,
              Animated: true,
            });
            Animated.delay(5000).start(() => {
              this.setState((state) => ({ ...state, isAnimate: false }));
            });
          });
        },
      );
    }
  }

  notifAndAnimate = () => {
    if (this.props.enabled) {
      if (!this.state.isAnimate) this.props.action(this.props.value);
      this.animateToMiddle();
    }
  };
  animateToMiddle = () => {
    this.setState((state) => ({ ...state, isOpen: !this.state.isOpen }));
  };

  scrollValue = new Animated.Value(0);
  scroll = null;
  render() {
    const { picture, enabled } = this.props;
    const { isOpen } = this.state;
    const borderAnimated = isOpen
      ? 1
      : this.scrollValue.interpolate({
        inputRange: [0, theme.size.screenWidth / 6],
        outputRange: [0, 1],
      });

    return (
      <Animated.ScrollView
        scrollEventThrottle={5}
        ref={(scroll) => (this.scroll = scroll)}
        horizontal
        bounces
        style={{ flex: 1, paddingLeft: theme.size.screenWidth * 0.2 }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollValue } } }], {
          useNativeDriver: true,
        })}
        onMomentumScrollEnd={this.notifAndAnimate}
        directionalLockEnabled
        scrollEnabled={enabled}
      >
        {enabled && (
          <Animated.View
            style={[
              styles.borderOpen,
              {
                transform: [{ translateX: this.scrollValue }],
              },
            ]}
          >
            <Animated.View
              style={[
                styles.lightShow,
                {
                  transform: [{ scale: borderAnimated }],
                },
              ]}
            />
          </Animated.View>
        )}
        <Image source={picture} style={styles.image} />
      </Animated.ScrollView>
    );
  }
}

PictureSwitch.defaultProps = {
  picture: null,
  animate: false,
};

PictureSwitch.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  picture: PropTypes.number,
  enabled: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  animate: PropTypes.bool,
};

export default PictureSwitch;
