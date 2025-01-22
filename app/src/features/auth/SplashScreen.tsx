import React, {FC, useEffect} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import {Colors, ImagesPaths} from '@utils/Constants';
import {preparNavigation, resetAndNavigate} from '@utils/NavigationUtils';
import {tokenStorage} from '@state/storage';
import useAuthStore from '@state/authStore';
import {jwtDecode} from 'jwt-decode';
import {screenHeight, screenWidth} from '@utils/Scaling';
import {refetchUser, refresh_tokens} from '@services/authService';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

interface DecodedToken {
  exp: number;
}

const SplashScreen: FC = () => {
  const {user, setUser} = useAuthStore();

  const checkToken = async () => {
    try {
      const accessToken = tokenStorage.getString('accessToken') as string;
      const refreshToken = tokenStorage.getString('refreshToken') as string;
      console.log({accessToken, refreshToken});
      if (accessToken) {
        const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
        const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

        const currentTime = Date.now() / 1000;

        if (decodedRefreshToken?.exp < currentTime) {
          resetAndNavigate('CustomerLogin');
          Alert.alert('Session Expired', 'Please login again');
          return false;
        }

        if (decodedAccessToken?.exp > currentTime) {
          try {
            await refresh_tokens();
            await refetchUser(setUser);
          } catch (error) {
            console.log(error);
            Alert.alert('There was an error refreshing token!');
            return false;
          }
        }
        console.log(user);
        await preparNavigation();
        if (user?.role === 'Customer') {
          resetAndNavigate('ProductDashboard');
        } else if (user?.role === 'DeliveryPerson') {
          resetAndNavigate('DeliveryDashboard');
        }
        return true;
      }
      await preparNavigation();
      resetAndNavigate('CustomerLogin');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      preparNavigation();
      checkToken();
      try {
        await Geolocation.requestAuthorization();
      } catch (error) {
        Alert.alert('app need location permission to continue working');
      }
    };
    const timeoutId = setTimeout(() => {
      fetchLocation();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={ImagesPaths.logo} style={styles.logoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
