import React, {FC} from 'react';
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '@features/auth/SplashScreen';
import {navigationRef} from '@utils/NavigationUtils';
import ProductDashboard from '@features/dashboard/ProductDashboard';
import DeliveryDashboard from '@features/dashboard/DeliveryDashboard';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import CustomerLogin from '@features/auth/CustomerLogin';
const Stack = createNativeStackNavigator();
const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="ProductDashboard" component={ProductDashboard} />
        <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboard} />

        <Stack.Screen
          options={{
            animation: 'fade',
          }}
          name="DeliveryLogin"
          component={DeliveryLogin}
        />
        <Stack.Screen
          options={{
            animation: 'fade',
          }}
          name="CustomerLogin"
          component={CustomerLogin}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
