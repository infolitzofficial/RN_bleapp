import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import requestBackgroundLocationPermission from './useApp';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    requestBackgroundLocationPermission();
  }, []);
  

  // <a href="https://gps-coordinates.org/my-location.php?lat=10.0526937&lng=76.3521401" target="_blank">(10.0526937,76.3521401)</a>

  return (
    <SafeAreaView style={backgroundStyle}>
      <MapView
        style={{ flex: 1 }}
      >
        <Marker coordinate={{
          latitude: 10.0526937,
          longitude: 76.3521401
        }} />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
