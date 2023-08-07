import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import useApp from './useApp';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const { latitude, longitude } = useApp();
  console.log(latitude, longitude);
  // <a href="https://gps-coordinates.org/my-location.php?lat=10.0526937&lng=76.3521401" target="_blank">(10.0526937,76.3521401)</a>

  return (
    <View>
      <MapView
        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        // ref={ref => map = ref}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={{
          latitude: latitude || 10.5276,
          longitude: longitude || 76.2144,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: latitude ? latitude : 10.5276,
            longitude: longitude ? longitude : 76.21,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    marginTop: 20,
    height: 200,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default App;
