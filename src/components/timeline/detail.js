import React from 'react';
import { View, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import appStyles from 'appStyles';
import CountdownCircle from 'common/countDownCircle';
import styles from './styles';
import PictureSwitch from './pictureSwitch';
import { TIME_STATUS } from '../../data';
import theme from '../../theme';

class Detail extends React.Component {
  state = {
    isOpen: false,
    animate: false,
  };

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.rowData.hasNotif) {
      this.setState((state) => ({
        ...state,
        isOpen: nextProps.rowData.hasNotif,
      }));
    }

    if (nextProps.animate !== this.props.animate && nextProps.animate) {
      Animated.delay(nextProps.rowId * 500).start(() => {
        this.setState(
          (state) => ({ ...state, animate: true }),
          () => {
            this.setState((state) => ({ ...state, animate: false }));
          },
        );
      });
    }
  }
  renderHourGlass() {
    if (this.props.nextEventIn > 0) {
      return (
        <Animated.View
          style={{
            flex: 1,
            paddingLeft: theme.size.screenWidth * 0.2,
          }}
        >
          <CountdownCircle
            seconds={this.props.nextEventIn}
            radius={35}
            borderWidth={10}
            color="#ff003f"
            bgColor={theme.colors.primaryDark}
            textStyle={styles.countDownInner}
            updateText={(elapsedSeconds, totalSeconds) =>
              Math.floor((totalSeconds - elapsedSeconds) / 60).toString()}
            onTimeElapsed={() => console.log('Elapsed!')}
          />
        </Animated.View>
      );
    }
    return null;
  }
  render() {
    const { rowData, setNotifForEvent } = this.props;
    const { isOpen, animate } = this.state;

    if (rowData.status === TIME_STATUS[1]) {
      return (
        <View style={appStyles.flexRow}>
          <Text
            style={[
              styles.title,
              {
                color: rowData.lineColor,
              },
            ]}
          >
            {rowData.title}
          </Text>
          {this.renderHourGlass()}
        </View>
      );
    }
    return (
      <View style={appStyles.flexOne}>
        <Text
          style={[
            styles.title,
            {
              color: rowData.lineColor,
            },
          ]}
        >
          {rowData.title}
        </Text>
        <PictureSwitch
          action={setNotifForEvent}
          picture={rowData.picture}
          isOpen={isOpen}
          value={rowData.key}
          enabled={rowData.status === TIME_STATUS[2]}
          animate={animate}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  nextEventIn: state.timeline.nextEventIn,
});

Detail.defaultProps = {
  animate: false,
};

Detail.propTypes = {
  rowData: PropTypes.shape({
    hasNotif: PropTypes.bool.isRequired,
  }).isRequired,
  rowId: PropTypes.number.isRequired,
  animate: PropTypes.bool,
  setNotifForEvent: PropTypes.func.isRequired,
  nextEventIn: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Detail);
