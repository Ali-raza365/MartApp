import {
  View,
  Text,
  Animated as RNAnimated,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import NoticeAnimation from './NoticeAnimation';
import {NOTICE_HEIGHT, NoticeHeight, screenHeight} from '@utils/Scaling';
import Visuals from '@components/dashboard/Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from '@features/dashboard/AnimatedHeader';
import StickSearchBar from '@features/dashboard/StickSearchBar';
import CustomText from '@components/gobal/CustomText';
import Content from './Content';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from '@utils/Constants';

const ProductDashboard = () => {
  const {scrollY, expand} = useCollapsibleContext();
  const previousScroll = useRef<number>(0);

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 1 : 0, {duration: 300});
    const translateY = withTiming(isScrollingUp ? 0 : 70, {duration: 300});

    previousScroll.current = scrollY.value;

    return {
      opacity,
      transform: [{translateY}],
    };
  });
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const showNotice = () => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => clearTimeout(timeoutId);
  };

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

  // useEffect(() => {
  //   slideDown();
  //   const timeId = setTimeout(() => {
  //     slideUp();
  //   }, 3000);
  //   return () => clearTimeout(timeId);
  // }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />
        <Animated.View 
        style={[styles.backToTop, backToTopStyle]}
        >
          <TouchableOpacity
          onPress={()=>{
            scrollY.value = 0
            expand()
          }}
          style={{flexDirection:'row',alignItems:'center',gap:6}}>
            <Icon name='arrow-up-circle-outline' color='#fff' size={RFValue(12)} />
            <CustomText variant='h9' style={{color:"#fff"}} fontFamily={Fonts.SemiBold} > Back to top</CustomText>
          </TouchableOpacity>
        </Animated.View>
        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <View>
              <CustomText>fasfasaf</CustomText>
            </View>
            <AnimatedHeader showNotice={showNotice} />
            <StickSearchBar />
          </CollapsibleHeaderContainer>
          <CollapsibleScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            style={styles.panelContainer}>
            <Content />
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backToTop:{
    position:'absolute',
    alignSelf:'center',
    top:Platform.OS === 'ios' ? screenHeight*0.18 : 100,
    flexDirection:'row',
    alignItems:'center',
    gap:4,
    backgroundColor:"#000",
    borderRadius:20,
    paddingHorizontal:10,
    paddingVertical:5,
    zIndex:1000
  }
});

export default withCollapsibleContext(ProductDashboard);
