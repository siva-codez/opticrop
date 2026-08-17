import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings screen (language, notifications, theme).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: Colors.background }
});
