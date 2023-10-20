import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AlimentacionInicio from './AlimentacionInicio';
import Alimentacion from './Alimentación';

const Stack = createStackNavigator();

const Screen2 = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="AlimentacionInicio" component={AlimentacionInicio} />
      <Stack.Screen name="Alimentacion" component={Alimentacion} />
    </Stack.Navigator>
  );
};

export default Screen2;
