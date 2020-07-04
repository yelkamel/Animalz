import React from 'react';
import { View, Animated, Easing, AppState } from 'react-native';
import store from 'react-native-simple-store';
import { loadTimeLine, updateTimeLine } from 'actions/timeline';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';
import theme from 'theme';

import Menu from '../menu';
import Loading from './loading';
import TimeLine from '../timeline';
import Banner from './banner';
import MapStage from '../mapStage';
import NotifModal from './notifModal';
import appStyles from '../../appStyles';
import styles from './styles';

const TOP_MARGIN = 70;
const BANNER_HEIGHT = theme.size.bannerHeight;
const BOTTOM_POSITION = theme.size.screenHeight - BANNER_HEIGHT * 2 - TOP_MARGIN;
const TOP_POSITION = 0;

class Home extends React.Component {
  state = {
    animeLineUpPosition: new Animated.Value(TOP_POSITION),
    isLoading: true,
    isTop: true,
    isAnimate: false,
  };

  componentDidMount() {
    store.get('notifList').then((notifList) => {
      this.props.loadTimeLine(notifList);
    });
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading !== this.props.isLoading && !nextProps.isLoading) {
      this.props.updateTimeLine();
    }
    if (nextProps.isUpdated !== this.props.isUpdated && nextProps.isUpdated) {
      this.setState((state) => ({ ...state, isLoading: false }));
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  modal = null;

  handleAppStateChange = (nextAppState) => {
    // if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    // console.log('App has come to the foreground!');
    // }
  };

  selectedMenuItem = (type = 'notif') => {
    switch (type) {
      case 'notif':
        this.modal.open();
        break;

      default:
        break;
    }
  };

  animeLineUp = () => {
    this.setState(
      (state) => ({ ...state, isAnimate: true }),
      () => {
        if (this.state.isTop) {
          Animated.timing(this.state.animeLineUpPosition, {
            toValue: BOTTOM_POSITION,
            // easing: Easing.linear(),
          }).start(() => {
            this.setState((state) => ({
              ...state,
              isTop: false,
              isAnimate: false,
            }));
          });
        } else {
          Animated.timing(this.state.animeLineUpPosition, {
            toValue: TOP_POSITION,
            // easing: Easing.elastic(),
          }).start(() => {
            this.setState((state) => ({
              ...state,
              isTop: true,
              isAnimate: false,
            }));
          });
        }
      },
    );
  };

  render() {
    const { animeLineUpPosition, isLoading, isTop, isAnimate } = this.state;

    return (
      <View style={appStyles.flexOne}>
        <Animated.View
          style={[
            styles.absoluteBlack,
            {
              opacity: animeLineUpPosition.interpolate({
                inputRange: [TOP_POSITION, BOTTOM_POSITION],
                outputRange: [0.7, 0],
              }),
            },
          ]}
        />
        <MapStage onFinishAnimation={() => {}} isFirstTime={!isLoading} />
        <Menu onSelectItem={this.selectedMenuItem} />

        <Animated.View
          style={{
            marginTop: TOP_MARGIN,
            flex: 1,
            transform: [{ translateY: animeLineUpPosition }],
          }}
        >
          <Banner
            isTop={isTop}
            isAnimate={isAnimate}
            animeLineUp={this.animeLineUp}
            untilEvent={34545}
          />
          {!isLoading && <TimeLine isOpen={isTop} />}
        </Animated.View>
        <Loading onFinish={this.animeLineUp} isLoading={isLoading} />
        <Modal
          style={styles.topModal}
          entry="top"
          backdrop
          position="top"
          ref={(m) => (this.modal = m)}
        >
          <NotifModal />
        </Modal>
      </View>
    );
  }
}

Home.propTypes = {
  loadTimeLine: PropTypes.func.isRequired,
  updateTimeLine: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isUpdated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.timeline.isLoading,
  isUpdated: state.timeline.isUpdated,
});

const mapDispatchToProps = (dispatch) => ({
  loadTimeLine: (notifList) => {
    dispatch(loadTimeLine(notifList));
  },
  updateTimeLine: () => {
    dispatch(updateTimeLine());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
