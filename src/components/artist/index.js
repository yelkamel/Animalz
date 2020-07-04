import React from 'react';
import { View, Text, Button } from 'react-native';

class Artist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: this.props.navigation.state.params
        ? this.props.navigation.state.params.artistName
        : 'artiste',
    };
  }

  render() {
    const { artist } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Artist Screen</Text>
        <Text>{artist}</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default Artist;
