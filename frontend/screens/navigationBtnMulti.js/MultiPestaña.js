import { createStackNavigator } from '@react-navigation/stack';
import Screen1 from '../../navigation/componentes/Componente1';
import Screen2 from '../../navigation/componentes/Componente2';
import Screen3 from '../../navigation/componentes/Componente3';

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