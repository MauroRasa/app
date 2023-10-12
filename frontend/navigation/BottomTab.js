import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import Componente1 from './componentes/Componente1';
import Componente2 from './componentes/Componente2';
import Componente3 from './componentes/Componente3';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import { getCurrentComponent } from './componentes/navigationUtils';


import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const BottomTab = () => {
    const [currentComponent, setCurrentComponent] = useState(getCurrentComponent());


    function logCurrentComponent() {
        const currentComponent = getCurrentComponent();
        console.log(`Estás en el componente: ${currentComponent}`);
    }
    
    logCurrentComponent();
    const interval = setInterval(logCurrentComponent, 5000);


    let componentToRender;

    if (currentComponent === 'Componente1') {
        componentToRender = <Componente1 />;
    } else if (currentComponent === 'Componente2') {
        componentToRender = <Componente2 />;
    } else if (currentComponent === 'Componente3') {
        componentToRender = <Componente3 />;
    } else {
        componentToRender = <p>Componente no encontrado</p>;
    }

    useEffect(() => {
        const updateComponent = () => {
        setCurrentComponent(getCurrentComponent());
        };

        updateComponent();

        return () => { 
        };
    }, []);
    
    return (
        <Tab.Navigator
            screenOptions = { ({ route }) => ({
                // tabBarActiveTintColor: 'red',
                // tabBarActiveBackgroundColor: 'grey',
                // tabBarInactiveBackgroundColor: 'orange',
                showLabel: false, // Ocultar etiquetas
                tabBarIcon: ({ focused, color, size }) => {

                    let iconName = '';
                    switch ( route.name ) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'person-circle' : 'person-circle-outline';
                            break;
                    }
                    if (route.name === 'Componente1') {
                        return (
                          <View style={{ flex: 1 }}>
                            {componentToRender} 
                          </View>
                        );
                    }

                    return <Icon name = { iconName } size = { size } color = { color } />
                }
            })} 
        >
            <Tab.Screen name = 'Home' component = { HomeScreen } />
            <Tab.Screen name = 'Profile' component = { ProfileScreen } />
            <Tab.Screen name = 'Componente1' options={{ headerShown: false }}>
                {() => (
                <Stack.Navigator>
                    <Stack.Screen name="Componente1" component={Screen1} options={{ headerShown: false }} />
                    <Stack.Screen name="Componente2" component={Screen2} options={{ headerShown: false }} />
                    <Stack.Screen name="Componente3" component={Screen3} options={{ headerShown: false }} />
                </Stack.Navigator>
            )}
            
            </Tab.Screen>

        </Tab.Navigator>
    );

}
