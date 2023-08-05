/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navigations from './navigation';

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <Navigations />
    </Provider>
  );
}


export default App;
