import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import CircleComponent from '../componentes/Circle.js';

function LoginScreen() {
  return (
    <ImageBackground
      source={require('../assets/fondo_app.jpg')}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.circle}>
          <CircleComponent />
        </View>
      </View>
      <TouchableOpacity
          style={styles.login}
          onPress={() => {
            // Agrega aquí la navegación a la página de inicio de sesión
            // Puedes utilizar React Navigation u otra biblioteca de navegación
          }}
        >
          <Text style={styles.loginText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <Text style={styles.texto}>¿No tenés una cuenta?</Text>
        <TouchableOpacity
          style={styles.regis}
          onPress={() => {
            // Agrega aquí la navegación a la página de inicio de sesión
            // Puedes utilizar React Navigation u otra biblioteca de navegación
          }}
        >
          <Text style={styles.registText}>Registrarse</Text>
        </TouchableOpacity>
    </ImageBackground>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  login: {
    backgroundColor: 'blue', 
    width: '70%',
    paddingVertical: 15, 
    borderRadius: 30, 
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 18,
  },
  regis: {
    width: '70%',
    paddingVertical: 15, 
    borderRadius: 30, 
    alignItems: 'center',
  },
  registText: {
    color: 'red',
    fontSize: 18,
  },
  texto: {
    color: 'white',
    fontSize: 18
  }
});
