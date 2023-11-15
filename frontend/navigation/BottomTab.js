import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ChatFPG from './screens/ChatFPG';
import NavegadorScreens from './componentes/NavegadorScreens';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import Cronometro from './screens/temporizador/Cronometro';
import Temporizador from './screens/temporizador/Temporizador';
import TemporizadorAjustable from './screens/temporizador/TemporizadorAjustable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import Icon from 'react-native-vector-icons/Ionicons';

// CREAR NAVEGADORES
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const StackTemporizador = createStackNavigator();
// FIN

export const BottomTab = () => {
    // TRANSICION ENTRE LAS SCREENS DEL BOTON NAVEGADORSCREENS
    const verticalCardStyleInterpolator = ({ current, layouts }) => {
        return {
          cardStyle: {
            transform: [
              {
                translateY: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.height, 0],
                }),
              },
            ],
          },
        };
      };
    // FIN
    

    return (
        <Tab.Navigator
            screenOptions = { ({ route }) => ({
                tabBarActiveTintColor: 'white',
                // tabBarActiveBackgroundColor: 'grey',
                // tabBarInactiveBackgroundColor: 'orange',
                showLabel: false, // Ocultar etiquetas
                tabBarStyle: {
                    display: route.name === 'Temporizadores' ? 'none' : 'flex', // Oculta la tabBar si la ruta es 'Tempo'
                    height: route.name === 'Temporizadores' ? 0 : 55, // Ajusta la altura de la tabBar según la ruta
                    transition: 'height 0.3s', // Agrega una transición suave de 0.3 segundos
                    backgroundColor: 'black'
                  },
                  tabBarHideOnKeyboard: true,
                tabBarIcon: ({ focused, color, size }) => {

                    // ICONOS NORMALES
                    let iconName = '';
                    switch ( route.name ) {
                        case 'Home': 
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'ChatFPG':
                            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                            break;
                        case 'Temporizadores':
                            iconName = focused ? 'timer' : 'timer-outline';
                            break;
                        case 'Escalera':
                            if (focused) {
                                return (
                                  <View style={{ flex: 1 }}>
                                    <NavegadorScreens />
                                  </View>
                                );
                              } else {
                                iconName = 'code-working';
                              }
                        break;
                    }
                    // FIN

                    // ASIGNAR VALORES A LOS ICONOS NORMALES
                    return <Icon name = { iconName } size = { size } color = { 'white' } />
                }
            })} 
            animationEnabled={true}
        >
            {/* NAVEGACION */}
            <Tab.Screen name = 'Home' component = { HomeScreen } options={{ headerShown: false }} />
            <Tab.Screen name = 'ChatFPG' component = { ChatFPG } options={{ headerShown: false }} />
            <Tab.Screen name = "Temporizadores" options={{ headerShown: false }}>
                {() => (
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <StackTemporizador.Navigator initialRouteName="Temporizador">
                            <StackTemporizador.Screen name="Cronometro" component={Cronometro} options={{ headerShown: false }} />
                            <StackTemporizador.Screen name="Temporizador" component={Temporizador} options={{ headerShown: false }} />
                            <StackTemporizador.Screen name="TemporizadorAjustable" component={TemporizadorAjustable} options={{ headerShown: false }} />
                        </StackTemporizador.Navigator>
                    </SafeAreaView>
                </GestureHandlerRootView> 
                )}
            </Tab.Screen>
            <Tab.Screen name = 'Escalera' options={{ headerShown: false }}>
                {() => (
                <SafeAreaView style={{ flex: 1 }}>
                    <Stack.Navigator initialRouteName="Screen1" 
                        screenOptions={{
                            headerShown: false,
                            cardStyleInterpolator: verticalCardStyleInterpolator,
                        }}>
                        <Stack.Screen name="Screen1" component={Screen1}/>
                        <Stack.Screen name="Screen2" component={Screen2}/>
                        <Stack.Screen name="Screen3" component={Screen3}/>
                    </Stack.Navigator>
                </SafeAreaView>
            )}
            
            </Tab.Screen>

        </Tab.Navigator>
    );

}
