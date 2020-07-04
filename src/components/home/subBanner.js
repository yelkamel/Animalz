import React from 'react';
import { View } from 'react-native';
import CountDown from 'common/countDown';
import { TIME_UNTIL_PARTY } from 'data';
import I18n from 'i18n';
import theme from 'theme';
import styles from './styles';

class SubBanner extends React.Component {
  state = {};

  render() {
    return (
      <View pointerEvents="none" style={styles.globalCountDownContainer}>
        <CountDown
          digitTxtColor={theme.colors.primaryDark}
          digitBgColor={theme.colors.primaryLight}
          daysLabel={I18n.t('days')}
          hoursLabel={I18n.t('hours')}
          minLabel={I18n.t('minutes')}
          until={TIME_UNTIL_PARTY}
          timeToShow={['D', 'H', 'M']}
        />
      </View>
    );
  }
}

SubBanner.propTypes = {};

export default SubBanner;
