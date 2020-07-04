import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import RoundedMenu from 'common/roundedMenu';
import theme from 'theme';

import styles from './styles';

export default class Menu extends Component {
  state = {};
  renderRoot() {
    return (
      <View style={[styles.item, styles.root]}>
        <Text>MENU</Text>
      </View>
    );
  }

  render() {
    const { onSelectItem } = this.props;
    return (
      <View style={styles.menuContainer}>
        <RoundedMenu
          spreadAngle={120}
          startAngle={-20}
          itemRadius={30}
          menuRadius={100}
          onOpen={() => {}}
          onClose={() => {}}
        >
          {this.renderRoot()}
          <View
            onSelect={() => {
              onSelectItem('share');
            }}
            style={styles.shareView}
          >
            <View style={styles.sharePoint} />
            <Text>Share POS</Text>
          </View>
          <View
            style={styles.notifSettingView}
            onSelect={() => {
              onSelectItem('notif');
            }}
          >
            <View style={styles.notifPoint} />
            <Text>Manag Notif</Text>
          </View>
          <View
            style={styles.safeBatteryView}
            onSelect={() => {
              onSelectItem('batery');
            }}
          >
            <View style={styles.batteryPoint} />
            <Text>Safe Battery</Text>
          </View>
        </RoundedMenu>
      </View>
    );
  }
}

Menu.defaultProps = {};

Menu.propTypes = {
  onSelectItem: PropTypes.func.isRequired,
};
