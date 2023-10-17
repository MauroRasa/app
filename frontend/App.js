import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './navigation/Inicio';
import { BottomTab } from './navigation/BottomTab';
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
    lockScreenOrientation();
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const checkAuthenticationStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        setIsAuthenticated(true);
      } else {
        // Limpia el token almacenado en AsyncStorage
        await AsyncStorage.removeItem('userToken');
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener información de inicio de sesión desde AsyncStorage:', error);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  if (isLoading) {
    return null; // Puedes mostrar una pantalla de carga aquí si lo deseas
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'AppPrincipal' : 'Inicio'}>
        <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
        <Stack.Screen name="AppPrincipal" component={BottomTab} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;