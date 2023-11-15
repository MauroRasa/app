import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const calculateCalories = (gender, weight, height, age, activityLevel, setResult) => {
  let bmr = 0;
  if (gender === 'male') {
    bmr = 66 + 13.7 * parseFloat(weight) + 5 * parseFloat(height) - 6.8 * parseFloat(age);
  } else {
    bmr = 655 + 9.6 * parseFloat(weight) + 1.8 * parseFloat(height) - 4.7 * parseFloat(age);
  }
  const totalCalories = bmr * activityLevel;
  setResult(totalCalories);
};

const App = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [result, setResult] = useState(null);

  const handleCalories = useCallback(() => {
    calculateCalories(gender, weight, height, age, activityLevel, setResult);
  }, [gender, weight, height, age, activityLevel]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de calorías</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Edad"
          placeholderTextColor="#fff"
          keyboardType="numeric"
          value={age}
          onChangeText={(text) => setAge(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          placeholderTextColor="#fff"
          keyboardType="numeric"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Altura (cm)"
          placeholderTextColor="#fff"
          keyboardType="numeric"
          value={height}
          onChangeText={(text) => setHeight(text)}
        />
        <Text style={styles.label}>Género:</Text>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Masculino" value="male" />
          <Picker.Item label="Femenino" value="female" />
        </Picker>
        <Text style={styles.label}>Nivel de actividad física:</Text>
        <Picker
          selectedValue={activityLevel}
          style={styles.picker}
          onValueChange={(itemValue) => setActivityLevel(itemValue)}
        >
          <Picker.Item label="Sedentario" value={1.2} />
          <Picker.Item label="Ligera actividad" value={1.375} />
          <Picker.Item label="Actividad moderada" value={1.55} />
          <Picker.Item label="Activo" value={1.725} />
          <Picker.Item label="Muy activo" value={1.9} />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Calcular" onPress={handleCalories} color="#4CAF50"/>
      </View>
      {result !== null && (
        <Text style={styles.resultText}>Calorías diarias recomendadas: {result.toFixed(2)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8b8b8b',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white'
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'white'
  },
  buttonContainer: {
    width: '60%',
  },
  resultText: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default App;
