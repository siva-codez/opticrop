import React from 'react';
import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
// import { Feather } from '@expo/vector-icons'; // Assuming feather is available, otherwise use Ionicons
// Fallback to simple icon function since vector-icons might need explicit setup
import { Text } from 'react-native';

function TabBarIcon(props: { name: string; color: string }) {
  // Fallback to text emoji for now since we didn't explicitly install @expo/vector-icons in package.json
  const emojiMap: Record<string, string> = {
    'home': '🏠',
    'leaf': '🌱',
    'camera': '📷',
    'message-circle': '💬',
    'user': '👤'
  };
  return <Text style={{ fontSize: 24, color: props.color }}>{emojiMap[props.name] || '?'}</Text>;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.muted,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#162438',
          backgroundColor: '#060b13',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerStyle: {
          backgroundColor: '#070c14',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#162438',
        },
        headerTitleStyle: {
          color: Colors.white,
          fontWeight: 'bold',
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="predict"
        options={{
          title: 'Predict',
          tabBarIcon: ({ color }) => <TabBarIcon name="leaf" color={color} />,
        }}
      />
      <Tabs.Screen
        name="diagnose"
        options={{
          title: 'Diagnose',
          tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: 'Assistant',
          tabBarIcon: ({ color }) => <TabBarIcon name="message-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
