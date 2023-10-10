import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MultiPestaña from '../screens/MultiPestaña';
import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';
import Screen3 from '../screens/Screen3';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
    
    return (
        <Tab.Navigator
            screenOptions = { ({ route }) => ({
                // tabBarActiveTintColor: 'red',
                // tabBarActiveBackgroundColor: 'grey',
                // tabBarInactiveBackgroundColor: 'orange',
                tabBarIcon: ({ focused, color, size }) => {

                    let iconName = '';
                    let iconComponent = null;
                    switch ( route.name ) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'person-circle' : 'person-circle-outline';
                            break;
                        case 'Screen1':
                            iconName = focused ? <Screen1 /> : 'person-circle-outline';
                            break;
                        case 'Screen2':
                            iconName = focused ? <Screen2 /> : iconComponent;
                            break;
                        case 'Screen3':
                            iconName = focused ? <Screen3 /> : iconComponent;
                            break;

                    }


                    return <Icon name = { iconName } size = { size } color = { color } />
                }
            })}
            tabBarOptions={{
                showLabel: false, // Ocultar etiquetas
                style: {
                  // Establecer el backgroundColor de la pestaña a transparente para que los iconos ocupen todo el espacio
                  backgroundColor: 'transparent',
                },
              }}
        >
            <Tab.Screen name = 'Home' component = { HomeScreen } />
            <Tab.Screen name = 'Profile' component = { ProfileScreen } />
            <Tab.Screen name = 'Screen1' component = { Screen1 } />
            <Tab.Screen name = 'Screen2' component = { Screen2 } />
            <Tab.Screen name = 'Screen3' component = { Screen3 } />
        </Tab.Navigator>
    );

}