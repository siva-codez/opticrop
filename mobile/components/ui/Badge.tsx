import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default' }) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary': return Colors.primaryLight;
      case 'success': return Colors.accent;
      case 'warning': return Colors.warning;
      case 'danger': return Colors.danger;
      case 'info': return Colors.info;
      case 'default':
      default: return Colors.border;
    }
  };

  const getTextColor = () => {
    return variant === 'default' ? Colors.text : Colors.white;
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <Text style={[styles.text, { color: getTextColor() }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
