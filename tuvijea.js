import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { AsyncStorage } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const checkLoginStatus = async () => {
      const authToken = await AsyncStorage.getItem('authToken');
      if (authToken === '0') {
        // Si el token es igual a '0', navega a la pantalla de inicio de sesión
        navigation.navigate('Login');
      } else if (authToken === '1') {
        // Si el token es igual a '1', navega a la pantalla principal
        navigation.navigate('Login');
      } else {
        // Si el token no coincide con ninguno de los valores anteriores, puedes manejarlo según tu lógica
        // Por defecto, puedes navegar a la pantalla de inicio de sesión
        navigation.navigate('Login');
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={LoginScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}