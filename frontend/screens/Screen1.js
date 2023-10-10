import React from 'react';
import { View, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

function Screen1() {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get('window').height;
  const iconSize = windowHeight * 0.08;

  function handleSwipeGesture(event) {
    // Obtén la posición Y relativa al cuadrado
    const relativeY = event.nativeEvent.translationY - 100; // 100 es la posición vertical del cuadrado

    if (relativeY < -50 && event.nativeEvent.velocityY < 0) {
      navigation.navigate('Screen2');
    } else if (relativeY > 50 && event.nativeEvent.velocityY > 0) {
      navigation.navigate('Screen3'); // Cambia a Screen2 en el deslizamiento hacia abajo
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 60, height: 60, backgroundColor: 'lightblue' }}>
        <PanGestureHandler onGestureEvent={handleSwipeGesture}>
          <View style={{ flex: 1 }}>
            <Icon name="favorite" size={iconSize} color="white" />
          </View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

export default Screen1;