import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from '../../node_modules/redux';

import rootReducer from './reducers/index';

// const store = createStore(rootReducer);

let store;
export default function configureStore() {
  if (store === undefined) {
    if (__DEV__) {
      const logger = createLogger({
        duration: true,
        timestamp: true,
        collapsed: true,
      });
      store = createStore(
        rootReducer,
        applyMiddleware(logger),
      );
    } else {
      store = createStore(
        rootReducer);
    }
  }
  return store;
}
