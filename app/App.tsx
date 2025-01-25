import { View, Text } from 'react-native'
import React from 'react'
import Navigation from './src/navigation/Navigation'
import { enableLayoutAnimations } from 'react-native-reanimated';

enableLayoutAnimations(true); 
const App = () => {
  return (
    <Navigation/>
  )
}

export default App