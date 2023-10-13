import React from 'react';
import { View, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { setCurrentComponent } from './navigationUtils';

function Componente1() {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get('window').height;
  const iconSize = windowHeight * 0.036;

  function handleSwipeGesture(event) {
    // Obtén la posición Y relativa al cuadrado
    const relativeY = event.nativeEvent.translationY - 100; // 100 es la posición vertical del cuadrado

    if (relativeY < -50 && event.nativeEvent.velocityY < 0) {
      setCurrentComponent('Componente2');
      navigation.navigate('Componente2');
    } else if (relativeY > 50 && event.nativeEvent.velocityY > 0) {
      navigation.navigate('Componente3');
      navigation.navigate('Componente3'); // Cambia a Screen2 en el deslizamiento hacia abajo
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 30, height: 30, backgroundColor: 'white', alignItems: 'center' }}>
        <PanGestureHandler onGestureEvent={handleSwipeGesture}>
          <View style={{ flex: 1}}>
            <Icon name="restaurant" size={iconSize} color="gray" />
          </View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

export default Componente1;