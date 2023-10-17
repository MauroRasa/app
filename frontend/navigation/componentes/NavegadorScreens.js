import React, {useState, useEffect} from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

function Componente1() {
  // DEFINICION DE VARIABLES
  const navigation = useNavigation();
  const [iconSize, setIconSize] = useState(Dimensions.get('window').height * 0.036);

  const [Ventana1, setVentana1] = useState(true);
  const [Ventana2, setVentana2] = useState(false);
  const [Ventana3, setVentana3] = useState(false);

  // FIN

  const updateIconSize = () => {
    const newSize = Dimensions.get('window').height * 0.07;
    setIconSize(newSize);
  };
  
  // FUNCION DE NAVEGACION POR SCREENS CON EL COMPONENTE
  const handleSwipeGesture = (event) => {
    if (Ventana1 && !Ventana2 && !Ventana3) {
      // POSICION Y RELATIVA DEL ICONO (CUADRADO)
      const relativeY = event.nativeEvent.translationY - 100; // 100 es la posición vertical del cuadrado

      if (relativeY < -10 && event.nativeEvent.velocityY < 0) {
        navigation.navigate('Screen2');
          setTimeout(() => {
            setVentana1(false);
            setVentana2(true);
          }, 500);
      } else if (relativeY > 10 && event.nativeEvent.velocityY > 0) {
        navigation.navigate('Screen3'); 
          setTimeout(() => {
            setVentana3(false);
            setVentana1(true);
          }, 500);
      }
    } else if (!Ventana1 && Ventana2 && !Ventana3) {
      const relativeY = event.nativeEvent.translationY - 100; // 100 es la posición vertical del cuadrado

      if (relativeY < -10 && event.nativeEvent.velocityY < 0) {
        navigation.navigate('Screen3');
        setTimeout(() => {
          setVentana2(false);
          setVentana3(true);
        }, 500);
      } else if (relativeY > 10 && event.nativeEvent.velocityY > 0) {
        navigation.navigate('Screen1'); 
        setTimeout(() => {
          setVentana1(false);
          setVentana2(true);
        }, 500);
      }

    } else if (!Ventana1 && !Ventana2 && Ventana3) {
      const relativeY = event.nativeEvent.translationY - 100; // 100 es la posición vertical del cuadrado

      if (relativeY < -10 && event.nativeEvent.velocityY < 0) {
        navigation.navigate('Screen1');
        setTimeout(() => {
          setVentana3(false);
          setVentana1(true);
        }, 500);
      } else if (relativeY > 10 && event.nativeEvent.velocityY > 0) {
        navigation.navigate('Screen2'); 
        setTimeout(() => {
          setVentana2(false);
          setVentana3(true);
        }, 500);
      }
    }
  };
  // FIN

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 30, height: 30, backgroundColor: 'white', alignItems: 'center' }}>
        <PanGestureHandler onGestureEvent={handleSwipeGesture} shouldCancelWhenOutside={false} activeOffsetY={[-5, 5]}>
          <View style={{ flex: 1}}>
            <Icon name= {Ventana1 ? "settings" : (Ventana2 ? "restaurant" : "sort")}  size={iconSize} color="gray" />
          </View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

export default Componente1;