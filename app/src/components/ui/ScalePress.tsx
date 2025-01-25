import React, {FC} from 'react';
import {TouchableOpacity, ViewStyle, Animated} from 'react-native';

interface ScalePressProps {
  onPress?: () => void;
  style?: ViewStyle;
  children: React.ReactNode;
}

const ScalePress: FC<ScalePressProps> = ({onPress, children, style}) => {
  const scaleValue = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      activeOpacity={1}
      style={style} // Simplified style prop usage
    >
      <Animated.View>{children}</Animated.View>
    </TouchableOpacity>
  );
};

export default ScalePress;
