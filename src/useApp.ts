import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';

function useApp() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const postData = async () => {
    try {
      const res = await axios.post("https://nr5dc5-8000.csb.app/api/tag_new_location", { latitude, longitude });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  useEffect(() => {
    perm();
    requestLocationPermission();
    const interval = setInterval(() => {
      getCurrentLocation();
      postData();
    }, 60000); // 1 minute in milliseconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const requestLocationPermission = async () => {
    try {
      const permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
      await Geolocation.requestAuthorization('whenInUse');
      if (permissionStatus === 'granted') {
        getCurrentLocation();
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const perm = async () => {
    if (Platform.OS === 'ios') {
      getCurrentLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          ],
        );
        if (granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  return { latitude, longitude }
}

export default useApp;