import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Colors } from '../../constants/Colors';

export default function PredictScreen() {
  const [formData, setFormData] = useState({
    N: '', P: '', K: '', temperature: '', humidity: '', ph: '', rainfall: ''
  });
  const [result, setResult] = useState<string | null>(null);

  const handlePredict = () => {
    // Mock API call
    setResult('Wheat');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.description}>Enter soil and environmental parameters to get the best crop recommendation.</Text>
      
      <Card>
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Input label="Nitrogen (N)" keyboardType="numeric" value={formData.N} onChangeText={(t) => setFormData({...formData, N: t})} />
          </View>
          <View style={styles.halfWidth}>
            <Input label="Phosphorus (P)" keyboardType="numeric" value={formData.P} onChangeText={(t) => setFormData({...formData, P: t})} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Input label="Potassium (K)" keyboardType="numeric" value={formData.K} onChangeText={(t) => setFormData({...formData, K: t})} />
          </View>
          <View style={styles.halfWidth}>
            <Input label="pH Level" keyboardType="numeric" value={formData.ph} onChangeText={(t) => setFormData({...formData, ph: t})} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Input label="Temperature (°C)" keyboardType="numeric" value={formData.temperature} onChangeText={(t) => setFormData({...formData, temperature: t})} />
          </View>
          <View style={styles.halfWidth}>
            <Input label="Humidity (%)" keyboardType="numeric" value={formData.humidity} onChangeText={(t) => setFormData({...formData, humidity: t})} />
          </View>
        </View>
        <Input label="Rainfall (mm)" keyboardType="numeric" value={formData.rainfall} onChangeText={(t) => setFormData({...formData, rainfall: t})} />
        
        <Button title="Predict Crop" onPress={handlePredict} style={styles.button} />
      </Card>

      {result && (
        <Card style={styles.resultCard}>
          <Text style={styles.resultLabel}>Recommended Crop:</Text>
          <Text style={styles.resultText}>{result}</Text>
        </Card>
      )}
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
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  button: {
    marginTop: 16,
  },
  resultCard: {
    marginTop: 24,
    backgroundColor: Colors.accentLight,
    alignItems: 'center',
    padding: 24,
  },
  resultLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  resultText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginTop: 8,
  },
});
