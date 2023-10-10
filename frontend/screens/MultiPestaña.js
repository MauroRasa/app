import { createStackNavigator } from '@react-navigation/stack';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';

const Stack = createStackNavigator();

const MultiPestaña = () => {
    return (
        <Stack.Navigator initialRouteName="Screen1">
          <Stack.Screen name="Screen1" component={Screen1} options={{ headerShown: false }}/>
          <Stack.Screen name="Screen2" component={Screen2} options={{ headerShown: false }}/>
          <Stack.Screen name="Screen3" component={Screen3} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
};

export default MultiPestaña;