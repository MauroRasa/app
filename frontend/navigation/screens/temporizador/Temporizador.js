import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StyleSheet, 
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { useTimer } from 'react-timer-hook';
import { PanGestureHandler} from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {LinearGradient} from 'expo-linear-gradient';
import KeepKeyboardOpenTextInput from './KeepKeyboardOpenTextInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icono from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import { BackHandler } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Picker } from '@react-native-picker/picker';




function Timer({duration, onExpire, autoStart, isFirstTimerVisible}) {


  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + duration);

  const {
    seconds,
    minutes,
    isRunning,
    totalSeconds,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, autoStart, onExpire});


  const [isPressed, setIsPressed] = useState(false);

  const [sumarTiempo, setSumarTiempo] = useState(totalSeconds);
  const [seSumoTiempo, setSeSumoTiempo] = useState(false);

  const windowHeight = Dimensions.get('window').height;
  const iconSize = windowHeight * 0.04;
  const iconSizeSeconds = windowHeight * 0.055;
  const barHeight = windowHeight * 0.52;
  const buttonHeight = windowHeight * 0.6;
  const tempoHeight = windowHeight * 0.27;


  const windowWidth = Dimensions.get('window').width;
  const barWidth = windowWidth * 0.46;





  return (
    <View style={styles.container}>
      {/* Contenedor para la sección de tiempo */}
      <View style={styles.timeContainer}>
        <Text style={{ fontSize: 120, textAlign: 'center', top: tempoHeight, color: isFirstTimerVisible ? 'white' : '#FFD700' }}>
          {minutes <= 9 ? (seconds <= 9 ? `0${minutes}:0${seconds}` : `0${minutes}:${seconds}`) : `${minutes}:${seconds}`}
        </Text>
        <TouchableOpacity
          onPress={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + duration);
            setSeSumoTiempo(false);
            restart(time, false);
          }}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            left: '6%',
            top: buttonHeight
          }}
        >
          <Text style={{ backgroundColor: '#6C757D', padding: 10, borderRadius: 10, textAlign: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'white'  }}>
            <Icon name="refresh" size={iconSizeSeconds} color="white" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + (10 + totalSeconds));
            setSeSumoTiempo(true);
            setSumarTiempo(totalSeconds + 10);
            restart(time, isRunning ? true : false);
          }}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            left: '41%',
            top: buttonHeight
          }}
        >
          <Text style={{ backgroundColor: '#6C757D', padding: 10, borderRadius: 10, textAlign: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'white', fontSize: 30, color: 'white'  }}>
            <Icon name="forward-10" size={iconSizeSeconds} color="white" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + (30 + totalSeconds));
            setSeSumoTiempo(true);
            setSumarTiempo(totalSeconds + 30);
            restart(time, isRunning ? true : false);
          }}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            left: '77%',
            top: buttonHeight
          }}
        >
          <Text style={{ backgroundColor: '#6C757D', padding: 10, borderRadius: 10, textAlign: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'white', fontSize: 30, color: 'white'  }}>
            <Icon name="forward-30" size={iconSizeSeconds} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
  
      {/* Contenedor para la sección del círculo */}
      <View style={{ top: barHeight, alignItems: 'center', backgroundColor: 'gray', flex: 1}}>
        <AnimatedCircularProgress
          style={{ marginTop: 40 }}  
          size={barWidth}
          width={10}
          fill={seSumoTiempo === false ? ((duration - totalSeconds) / duration * 100) : ((sumarTiempo - totalSeconds) / sumarTiempo * 100)}
          tintColor="#6C757D"
          backgroundColor="white"
        >
          {(fill) => (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isFirstTimerVisible ? '#CED4DA' : '#CED4DA',
                borderRadius: 999,
                borderColor: 'gray',
                borderWidth: 3,
                height: '72%',
                width: '72%',
                shadowColor: 'black',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: isPressed ? 0.9 : 0.9,
                shadowRadius: 3.84,
                elevation: 5,
                overflow: 'hidden',
              }}
              onPress={isRunning ? pause : (pause ? resume : start)}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
            >
              <Text style={{ fontSize: 20, textAlign: 'center' }}>
                {isFirstTimerVisible ? (isRunning ? 'Rutina en curso...' : 'Empezar') : 'Descanso!'}
              </Text>
            </TouchableOpacity>
          )}
        </AnimatedCircularProgress>
          <TouchableOpacity
          onPress={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + 0);
            restart(time, false);
          }}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            top: '15%',
            right: 20
          }}
        >
          <Text style={{ backgroundColor: 'gray', padding: 6, borderRadius: 10, textAlign: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'white'  }}>
            <Icon name="alarm-on" size={iconSize} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
      }  


const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#6C757D'
  },
});




export default function Temporizador({navigation, route }) {
  // DECLARACIONES
  const [timers, setTimers] = useState([]);
  const [newTimerId, setNewTimerId] = useState(1); 

  const Tab = createMaterialTopTabNavigator();

  const windowHeight = Dimensions.get('window').height;
  const iconSize = windowHeight * 0.05;

  const [stopTime, setStopTime] = useState(null);
  const storageKey = 'timersFromTemporizador';

  const [selectedSecondsDescanso, setSelectedSecondsDescanso] = useState(0);

  const handleSecondsChange = (itemValue) => {
    setSelectedSecondsDescanso(itemValue);
  };

    const [selectedReps, setSelectedReps] = useState(0);

  const handleRepsChange = (itemValue) => {
    setSelectedReps(itemValue);
  };


  useBackHandler(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AppPrincipal' }], 
    });
    return true; 
  });


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

// COACHMARK
const [isShowing, setIsShowing] = useState(true);

  const moveAnim = new Animated.Value(0);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: windowHeight * 0.03,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [moveAnim]);
// FIN


// FUNCION ENCARGADA DE LA NAVEGACION ENTRE TEMPORIZADORES CON DESLIZAMIENTO PARA ARRIBA/ABAJO
const handleGesture = ({ nativeEvent }) => {
  if (nativeEvent.translationY < -80) {
    // Si el gesto es hacia arriba
    navigation.navigate('TemporizadorAjustable');
    setIsShowing(false);
  } else if (nativeEvent.translationY > 80) {
    // Si el gesto es hacia abajo
    navigation.navigate('TemporizadorAjustable');
    setIsShowing(false);
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
        if (parsedTimers.length > 0) {
          const maxId = Math.max(...parsedTimers.map((timer) => timer.id));
          setNewTimerId(maxId + 1); // Establecer el nuevo ID en función del temporizador con el ID más alto
          const firstTimer = parsedTimers[0];
          setStopTime(firstTimer.initialDuration); // Actualizar stopTime con el valor del primer temporizador
        }
      }
    } catch (error) {
      console.error('Error al cargar desde AsyncStorage:', error);
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

  const addTimer = () => {
    const newName = name ? name : `Temporizador ${newTimerId}`;
    const updatedTimers = [
      ...timers,
      { id: newTimerId, name: newName, initialDuration: stopTime },
    ];
    setTimers(updatedTimers);
    saveTimersToStorage(updatedTimers); // Guarda los temporizadores en AsyncStorage
    setName('');
    setNewTimerId(newTimerId + 1); // Incrementa newTimerId para el siguiente temporizador
  };

    return (
      <LinearGradient
        colors={['gray', 'black']}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'  }}>
        {isShowing && (
            <View style={stylesCoach.coachmarkContainer}>
              <Animated.View
                style={[
                  stylesCoach.coachmark,
                  {
                    transform: [{ translateY: moveAnim }],
                  },
                ]}
              >
                <Text style={stylesCoach.coachmarkText}>Temporizador por tiempo</Text>
                <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
              </Animated.View>
            </View>
          )}
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
              bottom: 150,
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

// ESTILOS COACHMARK
const stylesCoach = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  coachmarkContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  coachmark: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  coachmarkText: {
    marginRight: 5,
    color: 'white'
  },
});
// FIN
  
// BOTON DELETE
const TimerWithRemove = ({ id}) => {  
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
      top: '15%',
      left: '40%'
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
  playSound();

  setIsFirstTimerVisible(false);
  setIsSecondTimerVisible(true);

  setSelectedReps(selectedReps === 0 ? 0 : (selectedReps - 1));
};

const handleStartSecondTimer = () => {
  setIsSecondTimerVisible(true);
  setIsFirstTimerVisible(false); 
};

const handleSecondTimerExpire = () => {
  playDescansoSound();

  setIsSecondTimerVisible(false);
  setIsFirstTimerVisible(true);
};
// FIN

// MOSTRAR TEMPORIZADOR
  return (
  <PanGestureHandler
  onGestureEvent={handleGesture}
  activeOffsetY={[-10, 10]}
  >
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
                  <View style={{zIndex: 10, top: '14%', width: '19%', position: 'absolute'}}>
                    <Text style={{left: 15, color: 'white', bottom: 0}}>Descanso</Text>
                  <Picker
                    id={timer.id}
                    selectedValue={selectedSecondsDescanso}
                    onValueChange={handleSecondsChange}
                    style={{ height: 50, width: 100, color: 'white', top: '0%', zIndex: 1}}
                    itemStyle={{ backgroundColor: 'black', color: 'white', fontSize: 20 }}
                  >
                    {Array.from({ length: 400 }, (_, i) => (
                      <Picker.Item key={i} label={i.toString()} value={i} />
                    ))}
                  </Picker>
                  </View>
                    {isFirstTimerVisible && (
                      <Timer
                        duration={timer.initialDuration !== null ? timer.initialDuration : 2} 
                        onExpire={handleFirstTimerExpire}
                        autoStart={selectedReps !== 0 ? true : false}
                        isFirstTimerVisible={isFirstTimerVisible}
                    />
                    )}
                    {isSecondTimerVisible && (
                      <View>
                        <TouchableOpacity onPress={handleStartFirstTimer} style={{}}>
                          {/* contenido del TouchableOpacity */}
                        </TouchableOpacity>
                        <Timer duration={selectedSecondsDescanso} onExpire={handleSecondTimerExpire} />
                      </View>
                    )}
                    <View style={{ height: 50, width: 90, position:'absolute', bottom: '14%', left: 0, zIndex: 1}}>
                      <Text style={{textAlign: 'center', color: 'white'}}>Repeticiones</Text>
                      <Picker
                        selectedValue={selectedReps}
                        onValueChange={handleRepsChange}
                        style={{ color: 'white',}}
                        
                      >
                        {Array.from({ length: 11 }, (_, i) => (
                          <Picker.Item key={i} label={i.toString()} value={i} />
                        ))}
                      </Picker>
                    </View>
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
