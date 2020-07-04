import { StackNavigator } from 'react-navigation';
import { Home, Artist } from './pages';

const navigationOptions = {
  headerMode: 'none',
  initialRouteName: 'Home',
};

export default StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Artist: {
      screen: Artist,
    },
  },
  navigationOptions
);
