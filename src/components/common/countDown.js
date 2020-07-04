import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { sprintf } from 'sprintf-js';
import styles from './styles';

const DEFAULT_BG_COLOR = '#FAB913';
const DEFAULT_TIME_TXT_COLOR = '#000';
const DEFAULT_DIGIT_TXT_COLOR = '#000';
const DEFAULT_TIME_TO_SHOW = ['D', 'H', 'M', 'S'];

export default class CountDown extends React.Component {
  state = {
    until: this.props.until,
  };

  componentDidMount() {
    if (this.props.onFinish) {
      this.onFinish = _.once(this.props.onFinish);
    }
    this.timer = setInterval(this.updateTimer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getTimeLeft = () => {
    const { until } = this.state;
    return {
      seconds: until % 60,
      minutes: parseInt(until / 60, 10) % 60,
      hours: parseInt(until / (60 * 60), 10) % 24,
      days: parseInt(until / (60 * 60 * 24), 10),
    };
  };

  updateTimer = () => {
    const { until } = this.state;

    if (until <= 1) {
      clearInterval(this.timer);
      if (this.onFinish) {
        this.onFinish();
      }
    }

    this.setState({ until: until - 1 });
  };

  renderDigit = (label, d) => {
    const { digitBgColor, digitTxtColor, timeTxtColor, size } = this.props;
    return (
      <View
        style={[
          styles.digitCont,
          { backgroundColor: digitBgColor },
          { width: size * 2.3, height: size * 2.6 },
        ]}
      >
        <Text style={[styles.digitTxt, { fontSize: size }, { color: digitTxtColor }]}>{d}</Text>
        <Text
          style={[
            styles.timeTxt,
            {
              fontSize: size / 1.8,
              color: timeTxtColor,
            },
          ]}
        >
          {label}
        </Text>
      </View>
    );
  };

  renderDoubleDigits = (label, digits) => (
    <View key={label} style={styles.doubleDigitCont}>
      <View style={styles.timeInnerCont}>{this.renderDigit(label, digits)}</View>
    </View>
  );

  renderCountDown = () => {
    const { timeToShow } = this.props;
    const { days, hours, minutes, seconds } = this.getTimeLeft();
    const newTime = sprintf('%02d:%02d:%02d:%02d', days, hours, minutes, seconds).split(':');
    const Component = this.props.onPress ? TouchableOpacity : View;

    return (
      <Component style={styles.timeCont} onPress={this.props.onPress}>
        {_.includes(timeToShow, 'D')
          ? this.renderDoubleDigits(this.props.daysLabel, newTime[0])
          : null}
        {_.includes(timeToShow, 'H')
          ? this.renderDoubleDigits(this.props.hoursLabel, newTime[1])
          : null}
        {_.includes(timeToShow, 'M')
          ? this.renderDoubleDigits(this.props.minLabel, newTime[2])
          : null}
        {_.includes(timeToShow, 'S')
          ? this.renderDoubleDigits(this.props.secLabel, newTime[3])
          : null}
      </Component>
    );
  };

  render() {
    return <View style={this.props.style}>{this.renderCountDown()}</View>;
  }
}

CountDown.propTypes = {
  digitBgColor: PropTypes.string,
  digitTxtColor: PropTypes.string,
  timeTxtColor: PropTypes.string,
  timeToShow: PropTypes.array,
  size: PropTypes.number,
  until: PropTypes.number,
  onFinish: PropTypes.func,
  onPress: PropTypes.func,
  style: PropTypes.any,
  daysLabel: PropTypes.string,
  hoursLabel: PropTypes.string,
  minLabel: PropTypes.string,
  secLabel: PropTypes.string,
};

CountDown.defaultProps = {
  digitBgColor: DEFAULT_BG_COLOR,
  digitTxtColor: DEFAULT_DIGIT_TXT_COLOR,
  timeTxtColor: DEFAULT_TIME_TXT_COLOR,
  timeToShow: DEFAULT_TIME_TO_SHOW,
  daysLabel: 'days',
  hoursLabel: 'hours',
  minLabel: 'minutes',
  secLabel: 'secondes',
  until: 0,
  size: 15,
  onFinish: () => {},
  onPress: () => {},
  style: {},
};
