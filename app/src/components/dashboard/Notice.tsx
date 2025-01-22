import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {NoticeHeight} from '@utils/Scaling';
import CustomText from '@components/gobal/CustomText';
import {Fonts} from '@utils/Constants';
import Wave from './WaveSVG';
import { wavyData } from '@utils/dummyData';

const Notice: FC = () => {
  return (
    <View style={{height: NoticeHeight}}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView style={{padding: 10}}>
            <CustomText
              style={styles.heading}
              variant="h8"
              fontFamily={Fonts.SemiBold}>
              It's raining near this location
            </CustomText>
            <CustomText variant="h9" style={styles.textCenter}>
              Our delivery partners may take longer to reach you
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
        <Wave wavyData={wavyData}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCD5E4',
  },
  noticeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCD5E4',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 8,
  },
  heading: {
    color: '#2D3875',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default Notice;
