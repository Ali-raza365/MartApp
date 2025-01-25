import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdCarousel from './AdCarousel'
import { adData, categories } from '@utils/dummyData'
import CustomText from '@components/gobal/CustomText'
import { Fonts } from '@utils/Constants'
import CategoryContainer from './CategoryContainer'

const Content = () => {
  return (
    <View style={styles.container}>
     <AdCarousel  adData={adData} />
     <CustomText variant='h5' fontFamily={Fonts.Bold}>Products</CustomText>
     <CategoryContainer data={categories}/>
     <CustomText variant='h5' fontFamily={Fonts.Bold}>Products</CustomText>
     <CategoryContainer data={categories}/>
     <CustomText variant='h5' fontFamily={Fonts.Bold}>Products</CustomText>
     <CategoryContainer data={categories}/>
     <CustomText variant='h5' fontFamily={Fonts.Bold}>Products</CustomText>
     <CategoryContainer data={categories}/>
    </View>
  )
}

export default Content

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 20,
  }
})