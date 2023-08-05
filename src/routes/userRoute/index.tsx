import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BidScreen from '../../pages/user/BidScreen';
import BidDetail from '../../pages/user/BidDetailScreen';

const Stack = createNativeStackNavigator();

function UserRoute() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Bid'>
                <Stack.Screen options={{ headerTitle: "Bid Screen" }} name="Bid" component={BidScreen} />
                <Stack.Screen name="Bid Detail" component={BidDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default UserRoute;