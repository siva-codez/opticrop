import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function ProfileScreen() {
  const { logout } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.phone}>+1 234 567 8900</Text>
        <Text style={styles.email}>john@example.com</Text>
        <Button title="Edit Profile" variant="outline" size="sm" style={styles.editBtn} onPress={() => {}} />
      </Card>

      <Text style={styles.sectionTitle}>Farm Details</Text>
      <Card>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Farm Size</Text>
          <Text style={styles.detailValue}>5 Acres</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Soil Type</Text>
          <Text style={styles.detailValue}>Loamy</Text>
        </View>
        <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.detailLabel}>Main Crops</Text>
          <Text style={styles.detailValue}>Wheat, Corn</Text>
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Settings</Text>
      <Card padding="none">
        <Button title="App Settings" variant="outline" onPress={() => {}} style={styles.menuBtn} textStyle={styles.menuText} />
        <Button title="Help & Support" variant="outline" onPress={() => {}} style={styles.menuBtn} textStyle={styles.menuText} />
        <Button title="Log Out" variant="secondary" onPress={logout} style={styles.logoutBtn} />
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
  profileCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    color: Colors.white,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  phone: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  editBtn: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 24,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  menuBtn: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  menuText: {
    color: Colors.text,
  },
  logoutBtn: {
    margin: 16,
    backgroundColor: Colors.danger,
  }
});
