import React, { useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/brand/Logo';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../hooks/useAuth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      login('dummy_token');
      setLoading(false);
    }, 1000);
  };

  const handleDemo = () => {
    login('demo_token');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Logo />
          <Text style={styles.subtitle}>Smarter Farming. Better Decisions.</Text>
        </View>

        <View style={styles.formContainer}>
          <Input 
            label="Email" 
            placeholder="Enter your email" 
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input 
            label="Password" 
            placeholder="Enter your password" 
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <Button 
            title="Sign In" 
            onPress={handleLogin} 
            loading={loading}
            style={styles.button}
          />
          
          <Button 
            title="Continue as Demo User" 
            variant="outline"
            onPress={handleDemo}
            style={styles.button}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Text style={styles.link} onPress={() => router.push('/(auth)/register')}>
            Register
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
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  subtitle: {
    marginTop: 8,
    color: Colors.textSecondary,
    fontSize: 16,
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
