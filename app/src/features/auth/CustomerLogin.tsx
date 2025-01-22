import {
  View,
  StyleSheet,
  Animated,
  Image,
  SafeAreaView,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/gobal/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import {resetAndNavigate} from '@utils/NavigationUtils';
import CustomText from '@components/gobal/CustomText';

import {Colors, Fonts, ImagesPaths, lightColors} from '@utils/Constants';
import CustomInput from '@components/gobal/CustomInput';
import CustomButton from '@components/gobal/CustomButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {customerLogin} from '@services/authService';

const LinearColors = [...lightColors].reverse();

const CustomerLogin = () => {
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  const keyboardAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log({keyboardOffsetHeight});
    if (keyboardOffsetHeight == 0) {
      Animated.timing(keyboardAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(keyboardAnimatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);

  const handleGesture = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.END) {
      const {translationX, translationY} = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }

      console.log(translationX, translationY, direction);
      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);

      if (newSequence.join(' ') === 'up up down left right') {
        setGestureSequence([]);
        resetAndNavigate('DeliveryLogin');
      }
    }
  };

  const handleAuth = async () => {
    if (loading) return;
    console.log('first');
    Keyboard.dismiss();
    setLoading(true);
    try {
      await customerLogin(phoneNo);
      resetAndNavigate('ProductDashboard');
    } catch (error) {
      console.log(error);
      Alert.alert('login Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <CustomSafeAreaView>
          {/* <ProductSlider /> */}
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              bounces={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              style={{transform: [{translateY: keyboardAnimatedValue}]}}
              contentContainerStyle={styles.subContainer}>
              <LinearGradient colors={LinearColors} style={styles.gradient} />
              <View style={styles.content}>
                <Image source={ImagesPaths.logo} style={styles.logo} />
                <CustomText variant="h3" fontFamily={Fonts.Bold}>
                  Shop Fast, Live Smart.
                </CustomText>
                <CustomText
                  variant="h5"
                  fontFamily={Fonts.SemiBold}
                  style={styles.text}>
                  Log in or sign up
                </CustomText>
                <CustomInput
                  onChangeText={text => {
                    setPhoneNo(text.slice(0, 10));
                  }}
                  onClear={() => {
                    setPhoneNo('');
                  }}
                  value={phoneNo}
                  left={
                    <CustomText
                      style={styles.phoneText}
                      variant="h7"
                      fontFamily={Fonts.SemiBold}>
                      +92
                    </CustomText>
                  }
                  placeholder="Enter mobile number"
                  inputMode="numeric"
                  rightIcon={true}
                />
                <CustomButton
                  onPress={handleAuth}
                  title="Continue"
                  disabled={phoneNo?.length != 10}
                  loading={loading}
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
        <View style={styles.footer}>
          <SafeAreaView>
            <CustomText style={styles.footerText} fontSize={RFValue(6)}>
              By Continuing, you are agree to our terms of services and Privacy
              Policy
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 2,
    marginRight: 20,
    opacity: 0.8,
  },
  phoneText: {
    marginLeft: 10,
    marginRight: 4,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fc',
    width: '100%',
  },
  footerText: {
    textAlign: 'center',
    width: '100%',
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue(7),
  },
  gradient: {
    padding: 60,
    width: '100%',
  },
});

export default CustomerLogin;
