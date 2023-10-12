import { createStackNavigator } from '@react-navigation/stack';
import Componente1 from '../../navigation/componentes/Componente1';
import Componente2 from '../../navigation/componentes/Componente2';
import Componente3 from '../../navigation/componentes/Componente3';

const Stack = createStackNavigator();

const MultiPestaña = () => {
    return (
        <Stack.Navigator initialRouteName="Componente1">
          <Stack.Screen name="Componente1" component={Componente1} options={{ headerShown: false }}/>
          <Stack.Screen name="Componente2" component={Componente2} options={{ headerShown: false }}/>
          <Stack.Screen name="Componente3" component={Componente3} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
};

export default MultiPestaña;