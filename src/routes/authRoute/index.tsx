import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions, NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import ROUTE, { RootStackParamList } from '../../route';
import Register from '../../pages/auth/register';
import Login from '../../pages/auth/login';
import BidScreen from '../../pages/user/BidScreen';
import BidDetailScreen from '../../pages/user/BidDetailScreen';

const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();

export function navigate(name: keyof RootStackParamList, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never);
  }
}

export function onAuthSuccess() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: ROUTE.BID,
          },
        ],
      }),
    );
  }
}

export function onLogout() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: ROUTE.LOGIN,
          },
        ],
      }),
    );
  }
}
function AuthRoute() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ROUTE.BID}>
        <Stack.Screen name={ROUTE.LOGIN} component={Login} />
        <Stack.Screen name={ROUTE.REGISTER} component={Register} />
        <Stack.Screen options={{ headerTitle: "Bid Screen" }} name={ROUTE.BID} component={BidScreen} />
        <Stack.Screen name={ROUTE.BIDDETAIL} component={BidDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthRoute;