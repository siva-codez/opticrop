import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/ui/Card';

export default function HomeScreen() {
  const router = useRouter();

  const features = [
    { title: 'Crop Recommendation', desc: 'Find best crop for your soil', icon: '🌾', route: '/(tabs)/predict', action: 'Get Started' },
    { title: 'Disease Diagnosis', desc: 'Diagnose plant leaves', icon: '🍃', route: '/(tabs)/diagnose', action: 'Scan Leaf' },
    { title: 'AI Assistant', desc: 'Ask farming questions', icon: '🤖', route: '/(tabs)/assistant', action: 'Chat Now' },
    { title: 'Weather & Climate', desc: 'Hyperlocal farm weather', icon: '⛅', route: '/(stack)/weather', action: 'Forecast' },
    { title: 'Fertilizer Guidance', desc: 'NPK nutrient dosage plan', icon: '🧪', route: '/(stack)/fertilizer', action: 'Get Guide' },
    { title: 'Reports & Logs', desc: 'Advisory and crop audit logs', icon: '📄', route: '/(stack)/reports', action: 'View' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Good morning, Farmer 👋</Text>
          <Text style={styles.subGreeting}>Let's make today's farming decisions smarter.</Text>
        </View>
      </View>

      {/* Weather Pill */}
      <Card style={styles.weatherCard} padding="sm">
        <View style={styles.weatherInfo}>
          <Text style={styles.weatherPillText}>⛅ 28°C, Partly Cloudy · Humidity 65%</Text>
        </View>
      </Card>

      {/* Feature Action Cards Grid */}
      <Text style={styles.sectionTitle}>CORE TOOLS</Text>
      <View style={styles.grid}>
        {features.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.gridItem}
            onPress={() => router.push(item.route as any)}
            activeOpacity={0.8}
          >
            <View style={styles.featureCard}>
              <View style={styles.iconBox}>
                <Text style={styles.featureIcon}>{item.icon}</Text>
              </View>
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text style={styles.featureDesc}>{item.desc}</Text>
              <Text style={styles.featureAction}>{item.action} →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats Bar */}
      <Text style={styles.sectionTitle}>QUICK STATS</Text>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Predictions</Text>
          <Text style={styles.statValue}>12</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Disease Checks</Text>
          <Text style={styles.statValue}>5</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Saved Reports</Text>
          <Text style={styles.statValue}>8</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Activity</Text>
          <Text style={styles.statValue}>3 today</Text>
        </View>
      </View>

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
      <Card padding="md" style={styles.activityCard}>
        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>🌾</Text>
          <View style={styles.activityDetails}>
            <Text style={styles.activityTitle}>Crop prediction: Rice (96.4%)</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>🍃</Text>
          <View style={styles.activityDetails}>
            <Text style={styles.activityTitle}>Disease check: Healthy leaf</Text>
            <Text style={styles.activityTime}>5 hours ago</Text>
          </View>
        </View>
        <View style={[styles.activityItem, styles.noBorder]}>
          <Text style={styles.activityIcon}>🤖</Text>
          <View style={styles.activityDetails}>
            <Text style={styles.activityTitle}>AI chat: Tomato fertilizer</Text>
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
    paddingBottom: 40,
  },
  headerRow: {
    marginBottom: 14,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  subGreeting: {
    fontSize: 12,
    color: Colors.muted,
    marginTop: 2,
  },
  weatherCard: {
    backgroundColor: Colors.surface,
    borderColor: '#162438',
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 20,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherPillText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.white,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.primary,
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 12,
  },
  featureCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.35)',
    borderRadius: 16,
    padding: 12,
    minHeight: 130,
    justifyContent: 'space-between',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    fontSize: 18,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 10,
    color: Colors.muted,
    marginBottom: 8,
  },
  featureAction: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: '#162438',
    borderRadius: 12,
    padding: 10,
    width: '23%',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 9,
    color: Colors.muted,
    textAlign: 'center',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  activityCard: {
    backgroundColor: Colors.surface,
    borderColor: '#162438',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#162438',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  activityIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 10,
    color: Colors.muted,
    marginTop: 2,
  },
});

