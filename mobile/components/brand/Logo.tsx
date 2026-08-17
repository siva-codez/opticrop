import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import Svg, { Path } from 'react-native-svg';

export const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={Colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 22c4-4 8-9.5 8-14a8 8 0 0 0-16 0c0 4.5 4 10 8 14z" />
        <Path d="M12 22V12" />
        <Path d="M12 16a4 4 0 0 0 4-4" />
      </Svg>
      <Text style={styles.text}>OptiCrop</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginLeft: 8,
  },
});
