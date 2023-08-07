import React from 'react';
import { View, Text } from 'react-native';
import useApp from './useApp';

function App(): JSX.Element {
  const {latitude, longitude} = useApp();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>Latitude: {latitude}</Text>
        <Text>Longitude: {longitude}</Text>
      </View>
    </View>
  );
}

export default App;
