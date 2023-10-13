import React from 'react';
import { View, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { setCurrentComponent } from './navigationUtils';


function Componente3() {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get('window').height;
  const iconSize = windowHeight * 0.036;

  function handleSwipeGesture(event) {
    // Detecta si el usuario ha deslizado hacia arriba o hacia abajo y navega a la pantalla correspondiente
    const relativeY = event.nativeEvent.translationY - 100; // 100 es la posición vertical del cuadrado

    if (relativeY > 50 && event.nativeEvent.velocityY > 0) {
      navigation.navigate('Componente2');
      setCurrentComponent('Componente2');
    } else if (relativeY < -50 && event.nativeEvent.velocityY < 0) {
      navigation.navigate('Componente1');
      setCurrentComponent('Componente1');
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{width: 30, height: 30, backgroundColor: 'white', alignItems: 'center'}}>
        <PanGestureHandler onGestureEvent={handleSwipeGesture}>
          <View style={{ flex: 1, justifyContent: 'center', }}>
            <Icon name="sort" size={iconSize} color="gray" />
          </View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

export default Componente3;
