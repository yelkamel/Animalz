import React from 'react';
import { Animated, Text } from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme';
import BigSlider from 'react-native-big-slider';

import styles from './styles';

class NotifModal extends React.Component {
  state = {
    minBefore: 10,
  };
  componentDidMount() {}
  componentWillUnmount() {}

  renderText = () => {
    const { minBefore } = this.state;
    return <Text style={styles.sliderText}>{`${Math.floor(minBefore)} min`}</Text>;
  };
  render() {
    const { minBefore } = this.state;
    return (
      <BigSlider
        horizontal
        value={minBefore}
        onValueChange={(val) => {
          this.setState((state) => ({ ...state, minBefore: val }));
        }}
        style={styles.sliderNotif}
        renderLabel={this.renderText}
        trackStyle={{ backgroundColor: theme.colors.primaryLight }}
        minimumValue={0}
        maximumValue={20}
      />
    );
  }
}

NotifModal.propTypes = {
  // onRef: PropTypes.func.isRequired,
};

export default NotifModal;
