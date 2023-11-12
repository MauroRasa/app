import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';


const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://192.168.43.67:3000/api/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // La sesión se ha cerrado correctamente
        // Limpiar el token almacenado en AsyncStorage
        await AsyncStorage.removeItem('userToken');
        // Redirigir a la pantalla de inicio
        navigation.navigate('Inicio');
      } else {
        throw new Error('La solicitud no fue exitosa');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // Manejar errores en el cierre de sesión aquí
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Icon name= "exit" size={40} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'red',
    fontSize: 20,
  },
});

export default LogoutButton;
