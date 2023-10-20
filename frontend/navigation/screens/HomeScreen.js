import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import LogoutButton from '../componentes/LogoutButton';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };

    const onFocus = () => {
      lockScreenOrientation();
    };

    const unsubscribe = navigation.addListener('focus', onFocus);

    return () => {
      unsubscribe();
      ScreenOrientation.unlockAsync();
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.leftContainer}>
          <Image
            source={require('../../assets/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogoutButton />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.presentationText}>
        Bienvenido a{' '}
        <Text style={styles.appName}>FitPlanGains</Text>
      </Text>
      <Text style={styles.description}>
        Una aplicación para entusiastas del ejercicio. Experimenta el
        siguiente nivel en tu rutina de ejercicios con nuestro temporizador
        personalizable y descubre nuevos desafíos con nuestra colección de
        videos de rutinas. Obtén consejos de nutrición personalizados y
        conversa con nuestra IA en el chat integrado. ¡Con{' '}
        <Text style={styles.appName}>FitPlanGains</Text>, alcanzar tus metas de
        bienestar nunca ha sido tan sencillo!
      </Text>
      <Text style={styles.title}>¡Comienza tu viaje hoy!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    marginHorizontal: 20,
    color: '#555',
  },
  appName: {
    fontWeight: 'bold',
    color: '#FF6347',
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  leftContainer: {
    paddingLeft: 20,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  presentationText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: '45%',
    marginHorizontal: 20,
    color: '#333',
  },
});

export default HomeScreen;
