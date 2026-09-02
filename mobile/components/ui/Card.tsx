import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Colors } from '../../constants/Colors';

interface CardProps extends ViewProps {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ children, style, padding = 'md', ...props }) => {
  const getPadding = () => {
    switch (padding) {
      case 'none': return 0;
      case 'sm': return 12;
      case 'lg': return 24;
      case 'md':
      default: return 16;
    }
  };

  return (
    <View style={[styles.card, { padding: getPadding() }, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#162438',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
});

