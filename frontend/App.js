import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './navigation/screens/HomeScreen';
import Inicio from './navigation/Inicio';
import { BottomTab } from './navigation/BottomTab';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AppPrincipal">
        <Stack.Screen name="inicio" component={Inicio} options={{ headerShown: false }}/>
        <Stack.Screen name="AppPrincipal" component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen name="home" component={Home} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;