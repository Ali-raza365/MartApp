import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {deliveryLogin} from '@services/authService';
import {resetAndNavigate} from '@utils/NavigationUtils';
import CustomSafeAreaView from '@components/gobal/CustomSafeAreaView';
import {screenHeight} from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import {AnimationsPaths, Fonts} from '@utils/Constants';
import CustomText from '@components/gobal/CustomText';
import CustomInput from '@components/gobal/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '@components/gobal/CustomButton';
const DeliveryLogin: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await deliveryLogin(email, password);
      resetAndNavigate('DeliveryDashboard');
    } catch (error) {
      Alert.alert('Login Error', error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <CustomSafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              style={styles.lottie}
              source={AnimationsPaths.delivery}
              autoPlay
              loop
            />
          </View>
          <CustomText variant="h3" fontFamily={Fonts.Bold}>
            Delivery Partner Portal
          </CustomText>
          <CustomText variant="h6" style={styles.text} fontFamily={Fonts.Bold}>
            Faster then flash
          </CustomText>
          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            left={
              <Icon
                name="mail"
                size={RFValue(18)}
                color="#f8890e"
                style={{marginLeft: 10}}
              />
            }
            rightIcon={false}
            inputMode="email"
          />
          <CustomInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            left={
              <Icon
                name="key-sharp"
                size={RFValue(18)}
                color="#f8890e"
                style={{marginLeft: 10}}
              />
            }
            rightIcon={false}
            inputMode="email"
          />
          <CustomButton
            title="Login"
            loading={loading}
            disabled={loading || email.length == 0 || password.length == 0}
            onPress={handleLogin}
          />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default DeliveryLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: '100%',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
});
