import {View, Text, Animated as RNAnimated, SafeAreaView} from 'react-native';
import React, {useEffect, useRef} from 'react';
import NoticeAnimation from './NoticeAnimation';
import {NOTICE_HEIGHT, NoticeHeight} from '@utils/Scaling';
import Visuals from '@components/dashboard/Visuals';

const ProductDashboard = () => {
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;
  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeId = setTimeout(() => {
      slideUp();
    }, 3000);
    return () => clearTimeout(timeId);
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
    <Visuals />
    <SafeAreaView>
        {/* <CollapsibleContainer style={styles.panelContainer}>
            <CollapsibleHeaderContainer containerStyle={styles.transparent}>
                <AnimatedHeader showNotice={showNotice} />
            </CollapsibleHeaderContainer>
        </CollapsibleContainer> */}
    </SafeAreaView>
      </>
</NoticeAnimation>
  );
};

export default ProductDashboard;
