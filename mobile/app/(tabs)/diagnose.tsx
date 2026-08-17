import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Colors } from '../../constants/Colors';

export default function DiagnoseScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setResult(null);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    // Mock API
    setTimeout(() => {
      setResult('Early Blight detected. Action required.');
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.imageCard}>
        {image ? (
          <Image source={{ uri: image }} style={styles.preview} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>📸</Text>
            <Text style={styles.placeholderText}>Upload a clear photo of the affected leaf</Text>
          </View>
        )}
      </Card>

      <View style={styles.actions}>
        <Button title="Take Photo" onPress={takePhoto} style={styles.actionBtn} icon="camera" />
        <Button title="Choose from Gallery" onPress={pickImage} variant="outline" style={styles.actionBtn} />
      </View>

      {image && (
        <Button title="Analyze Image" onPress={handleAnalyze} style={styles.analyzeBtn} size="lg" />
      )}

      {result && (
        <Card style={styles.resultCard}>
          <Text style={styles.resultTitle}>Diagnosis Result</Text>
          <Badge label="Attention Needed" variant="warning" />
          <Text style={styles.resultText}>{result}</Text>
          <Button title="View Treatment Plan" variant="secondary" style={styles.treatmentBtn} />
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
  imageCard: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 0,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
    padding: 24,
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  actions: {
    marginTop: 16,
    gap: 12,
  },
  actionBtn: {
    width: '100%',
  },
  analyzeBtn: {
    marginTop: 24,
  },
  resultCard: {
    marginTop: 24,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  resultText: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 16,
    color: Colors.text,
  },
  treatmentBtn: {
    marginTop: 8,
  },
});
