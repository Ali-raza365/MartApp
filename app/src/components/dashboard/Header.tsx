import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import CustomText from '@components/gobal/CustomText';
import {Fonts} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import useAuthStore from '@state/authStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Header: FC<{showNotice: () => void}> = ({showNotice}) => {
  const {user} = useAuthStore();
  return (
    <View style={styles.subContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={showNotice}>
        <CustomText fontFamily={Fonts.Bold} variant="h6" style={styles.text}>
          Delivery in
        </CustomText>
        <View style={styles.flexRowGap}>
          <CustomText
            fontFamily={Fonts.SemiBold}
            variant="h1"
            style={styles.text}>
            10 minutes
          </CustomText>
          <TouchableOpacity style={styles.noticeBTN} onPress={showNotice}>
            <CustomText
              variant="h3"
              fontFamily={Fonts.SemiBold}
              fontSize={RFValue(5)}>
              ☁️ Rain
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          <CustomText
            variant="h8"
            style={[styles.text, {marginLeft: 0}]}
            numberOfLines={1}
            fontFamily={Fonts.Medium}>
            {user?.address || 'Knowhere, Somewhere 😃'}
          </CustomText>
          <Icon
            name="menu-down"
            color="#fff"
            size={RFValue(20)}
            style={{bottom: -1}}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="account-circle-outline" size={RFValue(36)} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? 10 : 15,
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
  },
  text2: {
    color: 'white',
    width: '90%',
    textAlign: 'center',
  },
  flexRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    width: '80%',
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  noticeBTN: {
    backgroundColor: '#E8EAF5',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    bottom: -2,
  },
});
