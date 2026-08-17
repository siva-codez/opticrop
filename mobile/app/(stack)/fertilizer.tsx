import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function FertilizerScreen() {
  return (
    <View style={styles.container}>
      <Text>Fertilizer recommendation form and results.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: Colors.background }
});
