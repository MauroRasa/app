import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StyleSheet, 
  Dimensions
} from 'react-native';
import { useTimer } from 'react-timer-hook';
import { PanGestureHandler} from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {LinearGradient} from 'expo-linear-gradient';
import KeepKeyboardOpenTextInput from './KeepKeyboardOpenTextInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';


function Timer({duration, onExpire, autoStart, isFirstTimerVisible}) {


  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + duration);


    
  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, autoStart, onExpire
  });


  const [isPressed, setIsPressed] = useState(false);



  return (
    <ImageBackground
      source={require('./assets/pesas_tempo.jpg')}
      style={styles.container}
    >
      <View style={{ marginTop: '45%', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isFirstTimerVisible ? '#B22222' : 'yellow',
            borderRadius: 999,
            borderColor: 'gray', 
            borderWidth: 3,
            height: '72%',
            width: '85%',
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: isPressed ? 0.9 : 0.9, // Ajustar la opacidad de la sombra
            shadowRadius: 3.84,
            elevation: 5,
            overflow: 'hidden',
          }}
          onPress={isRunning ? pause : (pause ? resume : start)}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          <Text style={{fontSize: 30}}>{isFirstTimerVisible ? 'Rutina en curso...' : 'Descanso!'}</Text>
          <Text style={{fontSize: 50}}>{`${minutes}:${seconds}`}</Text>
        </TouchableOpacity>
      </View>
  
      <TouchableOpacity 
        onPress={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + 3);
          restart(time, false);
        }}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: 120,
        }}
      >
        <Text style={{ backgroundColor: 'blue', padding: 20, borderRadius: 100, textAlign: 'center', justifyContent: 'center',}}>
          Restart
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );  
}


const styles = StyleSheet.create({
  container: {
    height: '100%',

  },
});




export default function Temporizador({navigation, route }) {
  // DECLARACIONES
  const [timers, setTimers] = useState([]);
  const [newTimerId, setNewTimerId] = useState(1); // Iniciar en 1

  const Tab = createMaterialTopTabNavigator();

  const windowHeight = Dimensions.get('window').height;
  const iconSize = windowHeight * 0.05;

  const [stopTime, setStopTime] = useState(null);
  const storageKey = 'timersFromTemporizador';

  useEffect(() => {
    if (route.params && route.params.stopTime) {
      setStopTime(route.params.stopTime);
    }
  }, [route.params]);
  // FIN

  // CARGA LOS TEMPORAZIDAROES DESDE ASYNCSTORAGE AL INICIO
  useEffect(() => {
    loadTimersFromStorage();
  }, []);
  // FIN


  // FUNCION ENCARGADA DE FORZAR LA POSICIÓN VERTICAL EN ESTA PANTALLA
  useEffect(() => {
    const lockScreenOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };

    const onFocus = () => {
        lockScreenOrientation();
    };

    const unsubscribe = navigation.addListener('focus', onFocus);

    return () => {
        unsubscribe();
        ScreenOrientation.unlockAsync();
    };
}, [navigation]);
// FIN


// FUNCION ENCARGADA DE LA NAVEGACION ENTRE TEMPORIZADORES CON DESLIZAMIENTO PARA ARRIBA/ABAJO
const handleGesture = ({ nativeEvent }) => {
  if (nativeEvent.translationY < -80) {
    // Si el gesto es hacia arriba
    navigation.navigate('TemporizadorAjustable');
  } else if (nativeEvent.translationY > 80) {
    // Si el gesto es hacia abajo
    navigation.navigate('TemporizadorAjustable');
  }
};
// FIN


// GUARDAR EN EL ASYNCSTORAGE LA CANTIDAD DE TEMPORIZADORES AÑADIDOS 
  const saveTimersToStorage = async (timers) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(timers));
    } catch (error) {
      console.error('Error al guardar en AsyncStorage:', error);
    }
  };
  // FIN
  
  // BUSCA LOS TEMPORIZADORES EN EL ASYNCSTORAGE PARA MOSTRARLOS AL REINICIAR APP 
  const loadTimersFromStorage = async () => {
    try {
      const storedTimers = await AsyncStorage.getItem(storageKey);
      if (storedTimers) {
        const parsedTimers = JSON.parse(storedTimers);
        setTimers(parsedTimers);
        parsedTimers.forEach((timer, index) => {
          if (timer.initialDuration) {
            const duration = timer.initialDuration; // Utiliza la duración específica del temporizador desde AsyncStorage
            const updatedTimers = timers.map((t) =>
              t.id === timer.id ? { ...t, duration: duration } : t
            );
            setTimers(updatedTimers);
          }
        });
      }
    } catch (error) {
      console.error('Error al cargar desde AsyncStorage:', error);
    }
  };
// FIN

// ACTUALIZAR LA DURACIÓN DEL TEMPORIZADOR EN AsyncStorage
const updateTimerDuration = async (timerId, duration) => {
  try {
    const updatedTimers = timers.map((timer) =>
      timer.id === timerId ? { ...timer, initialDuration: duration } : timer
    );
    setTimers(updatedTimers);
    await saveTimersToStorage(updatedTimers);
  } catch (error) {
    console.error('Error al actualizar la duración del temporizador:', error);
  }
};
// FIN

// ELIMINAR UN TEMPORIZADOR
const removeTimer = (timerId) => {
  const updatedTimers = timers.filter((timer) => timer.id !== timerId);
  setTimers(updatedTimers);
  saveTimersToStorage(updatedTimers); // Guarda actualizacion en AsyncStorage
};
// FIN
  
// AÑADIR UN TEMPORIZADOR
const AddTimerScreen = () => {
  const [name, setName] = useState('');

  const handleNameChange = (text) => {
    setName(text);
  };

  const [globalStopTime, setGlobalStopTime] = useState('');

  const addTimer = async () => {
    try {
      const newName = name ? name : `Temporizador ${newTimerId}`;
      setGlobalStopTime(stopTime);
      const updatedTimers = [
        ...timers,
        { id: newTimerId, name: newName, initialDuration: globalStopTime },
      ];
      setTimers(updatedTimers);
      await saveTimersToStorage(updatedTimers);
      setGlobalStopTime(stopTime);
      setName('');
      setNewTimerId(newTimerId + 1);
    } catch (error) {
      console.error('Error al agregar el temporizador:', error);
    }
  };

    return (
      <LinearGradient
        colors={['gray', 'black']}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'  }}>
          <KeepKeyboardOpenTextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={handleNameChange}
            value={name}
            placeholder="Ingrese el nombre del temporizador"
          />
          <TouchableOpacity onPress={addTimer}>
            <Text style={{color: 'white', backgroundColor: 'gray', fontWeight:'bold', fontSize: 18, borderRadius: 50, width: 150, textAlign:'center'}}>Agregar Temporizador</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cronometro')}
            style={{
              position: 'absolute',
              bottom: 20,
              alignSelf: 'center',
              backgroundColor: 'blue',
              padding: 20,
              borderRadius: 100,
              justifyContent: 'center',
            }}
          >
      <Text style={{ color: 'white', textAlign: 'center' }}>Ir a Cronometro</Text>
    </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };
// FIN
  
// BOTON DELETE
const TimerWithRemove = ({ id, initialDuration }) => {  
  return (
    <View style={styles.timerContainer}>
    <TouchableOpacity style={styles.deleteButton} onPress={() => removeTimer(id)}>
      <Text style={styles.deleteText}>
        <Icon name="delete" size={iconSize} color="gray" />
      </Text>
    </TouchableOpacity>
  </View>
  );
};
  const styles = StyleSheet.create({
    timerContainer: {
      top: '90%',
    },
    deleteButton: {
      position: 'absolute',
      alignSelf: 'center',
      zIndex:100
    },
    deleteText: {
      color: 'white',
    },
  });
// FIN





// ALARMA CUANDO TERMINA EL TEMPORIZADOR
const [sound, setSound] = useState();

useEffect(() => {
  return sound
    ? () => {
        sound.unloadAsync();
      }
    : undefined;
}, [sound]);

    // FIN DE TIEMPO DE ENTRENAMIENTO
const playSound = async () => {
  const { sound } = await Audio.Sound.createAsync(require('./assets/CambioTempo.mp3'));
  setSound(sound);

  await sound.playAsync();
};
    // FIN DEL DESCANSO
const playDescansoSound = async () => {
  const { sound } = await Audio.Sound.createAsync(require('./assets/Alarma.mp3'));
  setSound(sound);

  await sound.playAsync();
};
// FIN

// MOSTRAR TEMPORIZADOR DE ENTRENAMIENTO O DE DESCANSO
const [isFirstTimerVisible, setIsFirstTimerVisible] = useState(true);
const [isSecondTimerVisible, setIsSecondTimerVisible] = useState(false);

const handleStartFirstTimer = () => {
  setIsFirstTimerVisible(true);
  setIsSecondTimerVisible(false); 
};

const handleFirstTimerExpire = () => {
  playSound()
  setIsFirstTimerVisible(false);
  setIsSecondTimerVisible(true);
};

const handleStartSecondTimer = () => {
  setIsSecondTimerVisible(true);
  setIsFirstTimerVisible(false); 
};

const handleSecondTimerExpire = () => {
  playDescansoSound()
  setIsSecondTimerVisible(false);
  setIsFirstTimerVisible(true);
};
// FIN

// MOSTRAR TEMPORIZADOR
  return (
  <PanGestureHandler onGestureEvent={handleGesture}>
    <SafeAreaView style={{ flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarStyle: { marginTop: 0, position: 'absolute', top: 30, left: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 0)', elevation: 0, margin: 30, },
          swipeEnabled: true,
          tabBarActiveTintColor: 'white', // Para cambiar el color del texto de la pestaña
          tabBarIndicatorStyle: { backgroundColor:'gray' },
          tabBarLabelStyle: {
            textShadowColor: 'rgba(0, 0, 0, 0.75)', // Agregar sombra al texto
            textShadowOffset: { width: 0, height: 1 }, // desplazamiento de la sombra 
            textShadowRadius: 2, // radio de la sombra 
            fontWeight: 'bold', // Hacer el texto en negrita
          },
        }}>
          {timers.map((timer) => (
            <Tab.Screen key={timer.id} name={timer.name}>
              {() => (
                <View style={{}}>
                  <TimerWithRemove id={timer.id} style={{}}/>
                  {isFirstTimerVisible && (
                    <Timer
                    duration={stopTime !== null ? stopTime : 2} 
                    onExpire={handleFirstTimerExpire}
                    autoStart={false}
                    isFirstTimerVisible={isFirstTimerVisible}
                  />
                  )}
                  {isSecondTimerVisible && (
                    <View>
                      <TouchableOpacity onPress={handleStartFirstTimer} style={{}}>
                        {/* contenido del TouchableOpacity */}
                      </TouchableOpacity>
                      <Timer duration={40} onExpire={handleSecondTimerExpire} />
                    </View>
                  )}
                </View>
              )}
            </Tab.Screen>
          ))}
        <Tab.Screen name="Agregar" component={AddTimerScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  </PanGestureHandler>
  );
}