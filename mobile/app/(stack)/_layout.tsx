import { Stack } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.surface,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="weather" options={{ title: 'Weather' }} />
      <Stack.Screen name="fertilizer" options={{ title: 'Fertilizer' }} />
      <Stack.Screen name="history" options={{ title: 'History' }} />
      <Stack.Screen name="reports" options={{ title: 'Reports' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
