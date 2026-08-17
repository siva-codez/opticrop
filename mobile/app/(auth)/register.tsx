import React, { useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/brand/Logo';
import { Colors } from '../../constants/Colors';
import { LanguageSelector } from '../../components/common/LanguageSelector';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
  });
  const router = useRouter();

  const handleRegister = () => {
    // API logic goes here
    router.replace('/(auth)/login');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Logo />
          <View style={styles.langContainer}>
            <LanguageSelector />
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Input 
            label="Full Name" 
            placeholder="John Doe" 
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
          />
          <Input 
            label="Email" 
            placeholder="john@example.com" 
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
          />
          <Input 
            label="Phone" 
            placeholder="+1 234 567 8900" 
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => setFormData({...formData, phone: text})}
          />
          <Input 
            label="Location (Farm)" 
            placeholder="City, Region" 
            value={formData.location}
            onChangeText={(text) => setFormData({...formData, location: text})}
          />
          <Input 
            label="Password" 
            placeholder="********" 
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
          />
          <Input 
            label="Confirm Password" 
            placeholder="********" 
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
          />
          
          <Button 
            title="Register" 
            onPress={handleRegister} 
            style={styles.button}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Text style={styles.link} onPress={() => router.push('/(auth)/login')}>
            Sign In
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  langContainer: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 24,
  },
  formContainer: {
    width: '100%',
  },
  button: {
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
  link: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
