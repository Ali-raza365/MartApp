import React from 'react';
import {Svg, Path, Defs, G, Use} from 'react-native-svg';
import {StyleSheet} from 'react-native';

const Wave = ({wavyData}: {wavyData: any}) => {
  // Added wavyData prop
  return (
    <Svg
      width="100%"
      height="35"
      fill="#CCD5E4"
      viewBox="0 0 4000 1000"
      preserveAspectRatio="none"
      style={styles.wave}>
      <Defs>
        <Path id="wavepath" d={wavyData} />
      </Defs>
      <G>
        <Use href="#wavepath" y="321" />
      </G>
    </Svg>
  );
};

const styles = StyleSheet.create({
  wave: {
    width: '100%',
    transform: [{rotate: '180deg'}],
  },
});

export default Wave;
