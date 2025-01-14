import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from '../features/auth/SplashScreen';
import { navigationRef } from '@utils/NavigationUtils';
import CustomerLogin from '@features/auth/CustomerLogin';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();
const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName='splash'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="splash" component={SplashScreen} />
     
        <Stack.Screen
          options={{
            animation: "fade"
          }}
          name="DeliveryLogin" component={DeliveryLogin} />
             <Stack.Screen
          options={{
            animation: "fade"
          }}
          name="CustomerLogin" component={CustomerLogin} />

      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default Navigation