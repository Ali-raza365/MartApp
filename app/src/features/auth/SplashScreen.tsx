import React, { FC, useEffect } from 'react'
import { Colors } from '@utils/Constants'
import { screenHeight, screenWidth } from '@utils/Scaling'
import { Alert, Image, StyleSheet, View } from 'react-native'
import Logo from '@assets/images/splash_logo.jpeg'
import Geolocation from '@react-native-community/geolocation';
import useAuthStore from '@state/authStore'
import { tokenStorage } from '@state/storage'
import { preparNavigation, resetAndNavigate } from '@utils/NavigationUtils'


Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: "auto",

});


const SplashScreen: FC = () => {

  const { user, setUser } = useAuthStore();


  const checkToken = async () => {
    try {
    const accessToken = tokenStorage.getString("accessToken") as string;
    const refreshToken = tokenStorage.getString("refreshToken") as string;
  
   await preparNavigation()
   console.log("sdasd")

  resetAndNavigate("CustomerLogin") 
    return true
  } catch (error) {
    console.log(error)
    return true
  }
  }

  useEffect(() => {

     checkToken()
    const fetchLocation = async () => {
      try {
       await Geolocation.requestAuthorization()
      } catch (error) {
        Alert.alert("app need location permission to continue working")
      }
    }
    const timeoutId = setTimeout(() => { fetchLocation() }, 1000);
    return () => clearTimeout(timeoutId);

  }, [])


  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain'
  }
})

export default SplashScreen