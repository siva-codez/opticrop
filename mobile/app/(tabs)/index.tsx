import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/ui/Card';

export default function HomeScreen() {
  const router = useRouter();

  const features = [
    { title: 'Crop Prediction', icon: '🌾', route: '/(tabs)/predict' },
    { title: 'Disease Detection', icon: '🔍', route: '/(tabs)/diagnose' },
    { title: 'AI Assistant', icon: '🤖', route: '/(tabs)/assistant' },
    { title: 'Fertilizer', icon: '🧪', route: '/(stack)/fertilizer' },
    { title: 'Irrigation', icon: '💧', route: '/(stack)/irrigation' },
    { title: 'Weather', icon: '⛅', route: '/(stack)/weather' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Good morning, Farmer!</Text>

      <Card style={styles.weatherCard}>
        <View style={styles.weatherInfo}>
          <Text style={styles.temp}>24°C</Text>
          <Text style={styles.weatherDesc}>Partly Cloudy</Text>
          <Text style={styles.location}>Coimbatore, Tamil Nadu</Text>
        </View>
        <Text style={styles.weatherIcon}>⛅</Text>
      </Card>

      <Text style={styles.sectionTitle}>Services</Text>
      <View style={styles.grid}>
        {features.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.gridItem}
            onPress={() => router.push(item.route as any)}
          >
            <Card style={styles.featureCard} padding="sm">
              <Text style={styles.featureIcon}>{item.icon}</Text>
              <Text style={styles.featureTitle}>{item.title}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <Card padding="md">
        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>🌾</Text>
          <View style={styles.activityDetails}>
            <Text style={styles.activityTitle}>Checked Crop Suitability</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>
        <View style={[styles.activityItem, styles.noBorder]}>
          <Text style={styles.activityIcon}>🔍</Text>
          <View style={styles.activityDetails}>
            <Text style={styles.activityTitle}>Diagnosed Tomato Blight</Text>
            <Text style={styles.activityTime}>Yesterday</Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  weatherCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
  },
  weatherInfo: {
    flex: 1,
  },
  temp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
  },
  weatherDesc: {
    fontSize: 16,
    color: Colors.white,
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: Colors.cream,
    marginTop: 8,
  },
  weatherIcon: {
    fontSize: 48,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 24,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
  },
  featureCard: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
    marginBottom: 0,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
