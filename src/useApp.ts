import { request, PERMISSIONS } from 'react-native-permissions';

// ...

const requestBackgroundLocationPermission = async () => {
  const result = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
  if (result === 'granted') {
    // Permission granted, proceed with location tracking
  } else {
    // Permission denied, handle accordingly
  }
};

export default requestBackgroundLocationPermission;