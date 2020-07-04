import React from 'react';
import RootStack from 'routes/Router';
import { Provider } from 'react-redux';
import configureStore from './redux';

const store = configureStore();


class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>);
  }
}

export default Root;
