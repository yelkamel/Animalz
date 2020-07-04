import React from 'react';
import { Animated, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import PulseAnimation from 'common/pulseAnimation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import theme from 'theme';

import AnimationVideo from '../common/animationVideo';
import MapStyle from '../../mapStyle.json';
import { styles, VIDEO_TOP_POS, VIDEO_WIDTH, VIDEO_HEIGHT } from './styles';

const AREA_LOC_GPS = {
  longitudeDelta: 0.0026429008518391583 * 0.6,
  latitudeDelta: 0.0012644995249289082 * 0.6,
  longitude: 2.3651310669234653,
  latitude: 48.90347782160455,
};

class MapStage extends React.Component {
  state = {
    animatedPulse: false,
  };

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFirstTime !== this.props.isFirstTime) {
      Animated.delay(500).start(() => {
        this.map.animateToRegion(AREA_LOC_GPS, 1000);

        Animated.delay(1500).start(() => {
          this.map.animateToViewingAngle(45, 800);

          Animated.delay(1000).start(() => {
            this.map.animateToViewingAngle(0, 800);
            this.map.animateToBearing(280, 1000);

            Animated.delay(1500).start(() => {
              this.map.animateToViewingAngle(0, 800);
              this.map.animateToBearing(280, 1000);

              Animated.delay(1500).start(() => {
                this.props.onFinishAnimation();
                Animated.timing(this.pictureOpacity, {
                  toValue: 1,
                }).start(() => {
                  if (true) {
                    // TODO  this.props.eventInfo.picture
                    this.animatePulse(30);
                  }
                });
              });
            });
          });
        });
      });
    }
  }

  modalNotif = null;
  map = null;
  pictureOpacity = new Animated.Value(0);

  animatePulse = (durationInSeconds) => {
    this.setState(
      (state) => ({ ...state, animatedPulse: true }),
      () => {
        Animated.delay(1000 * durationInSeconds).start(() => {
          this.setState((state) => ({ ...state, animatedPulse: false }));
        });
      },
    );
  };

  renderPicture() {
    const { eventInfo: { picture } } = this.props;

    if (picture) {
      return (
        <View style={styles.animationVideoContainer}>
          <Animated.Image
            source={picture}
            style={[
              styles.djImage,
              {
                opacity: this.pictureOpacity,
              },
            ]}
          />
        </View>
      );
    }

    return (
      <View style={styles.videoContainer}>
        <AnimationVideo
          heightSize={VIDEO_HEIGHT}
          widthSize={VIDEO_WIDTH}
          animatedStyle={{
            opacity: this.pictureOpacity,
          }}
        />
      </View>
    );
  }

  render() {
    const { isFirstTime } = this.props;
    const { animatedPulse } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          ref={(mapView) => (this.map = mapView)}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          showsUserLocation
          cacheEnabled={!isFirstTime}
          scrollEnabled={false}
          rotateEnabled={false}
          zoomControlEnabled={false}
          zoomEnabled={false}
          showsScale={false}
        />
        {animatedPulse && (
          <PulseAnimation
            color={theme.colors.primary}
            numPulses={2}
            diameter={250}
            top={VIDEO_TOP_POS + 30}
            speed={30}
            marginTop={30}
            duration={2000}
          />
        )}
        {this.renderPicture()}
      </View>
    );
  }
}

MapStage.defaultProps = {};

MapStage.propTypes = {
  onFinishAnimation: PropTypes.func.isRequired,
  isFirstTime: PropTypes.bool.isRequired,
  eventInfo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  eventInfo: state.timeline.currentEvent,
});

export default connect(mapStateToProps)(MapStage);
