import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CustomSafeAreaView from '@components/gobal/CustomSafeAreaView'
import ProductSlider from '@components/login/ProductSlider'

const CustomerLogin = () => {
  return (
    <GestureHandlerRootView>  
      <View style={styles.container}>
        <CustomSafeAreaView>
          <View><Text>dsadasdas</Text></View>
          <ProductSlider />
        </CustomSafeAreaView>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default CustomerLogin