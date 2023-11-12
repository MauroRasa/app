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
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {LinearGradient} from 'expo-linear-gradient';
import KeepKeyboardOpenTextInput from './KeepKeyboardOpenTextInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Audio } from 'expo-av';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


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


  return (
    <View style={styles.container}>
      {/* Contenedor para la sección de tiempo */}
      <View style={styles.timeContainer}>
      <Text style={{ fontSize: 120, textAlign: 'center', top: 240, color: isFirstTimerVisible ? 'white' : '#FFD700' }}>
          {minutes <= 9 ? (seconds <= 9 ? `0${minutes}:0${seconds}` : `0${minutes}:${seconds}`) : `${minutes}:${seconds}`}
        </Text>
        {/* Boton reset */}
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
            top: 500
          }}
        >
          <Text style={{ backgroundColor: '#6C757D', padding: 10, borderRadius: 10, textAlign: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'white'  }}>
            <Icon name="refresh" size={iconSize} color="white" />
          </Text>
        </TouchableOpacity>
        {/* Boton +60 */}
        <TouchableOpacity
          onPress={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + (60 + totalSeconds));
            setSeSumoTiempo(true);
            setSumarTiempo(totalSeconds + 60);
            restart(time, isRunning ? true : false);
          }}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            left: '41%',
            top: 500
          }}
        >
          <Text style={{ backgroundColor: '#6C757D', padding: 10, borderRadius: 10, textAlign: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'white', fontSize: 30, color: 'white'  }}>
            +60
          </Text>
        </TouchableOpacity>
        {/* Boton +10 */}
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
            left: '77%',
            top: 500
          }}
        >
          <Text style={{ backgroundColor: '#6C757D', padding: 10, borderRadius: 10, textAlign: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'white', fontSize: 30, color: 'white'  }}>
              +10
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ top: '53%', alignItems: 'center', backgroundColor: 'gray', flex: 1}}>
        <AnimatedCircularProgress
          style={{ marginTop: 40 }}  
          size={200}
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
            shadowOpacity: isPressed ? 0.9 : 0.9, // Ajustar la opacidad de la sombra según sea necesario
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
            top: '13%',
            right: 20
          }}
        >
          <Text style={{ backgroundColor: 'gray', padding: 10, borderRadius: 10, textAlign: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'white'  }}>
            <Icon name="check" size={iconSize} color="white" />
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




export default function TemporizadorAjustable({navigation}) {

  const [timers, setTimers] = useState([]);
  const [newTimerId, setNewTimerId] = useState(1); // Iniciar en 2 ya que el temporizador 1 ya existe

  const Tab = createMaterialTopTabNavigator();

  const windowHeight = Dimensions.get('window').height;
  const iconSize = windowHeight * 0.05;

  const storageKey = 'timersFromTemporizadorAjustable'; // Clave única para identificar los temporizadores de esta pantalla

  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [selectedSeconds, setSelectedSeconds] = useState(0);

  const [selectedSecondsDescanso, setSelectedSecondsDescanso] = useState(0);

  const handleSecondsDescansoChange = (itemValue) => {
    setSelectedSecondsDescanso(itemValue);
  };

  const [selectedReps, setSelectedReps] = useState(false);

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

  const handleGesture = ({ nativeEvent }) => {
    if (nativeEvent.translationY < -80) {
      // Si el gesto es hacia arriba
      navigation.navigate('Temporizador');
    } else if (nativeEvent.translationY > 80) {
      // Si el gesto es hacia abajo
      navigation.navigate('Temporizador');
    }
  };

  useEffect(() => {
    loadTimersFromStorage(); // Carga los temporizadores desde AsyncStorage al inicio
  }, []);

  const saveTimersToStorage = async (timers) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(timers));
    } catch (error) {
      console.error('Error al guardar en AsyncStorage:', error);
    }
  };
  
  const loadTimersFromStorage = async () => {
    try {
      const storedTimers = await AsyncStorage.getItem(storageKey);
      if (storedTimers) {
        const parsedTimers = JSON.parse(storedTimers);
        setTimers(parsedTimers);
        if (parsedTimers.length > 0) {
          const maxId = Math.max(...parsedTimers.map((timer) => timer.id));
          setNewTimerId(maxId + 1); // Establecer el nuevo ID en función del temporizador con el ID más alto
        }
      }
    } catch (error) {
      console.error('Error al cargar desde AsyncStorage:', error);
    }
  };



  const removeTimer = (timerId) => {
    const updatedTimers = timers.filter((timer) => timer.id !== timerId);
    setTimers(updatedTimers);
    saveTimersToStorage(updatedTimers); // Guarda los temporizadores en AsyncStorage
  };
  
  const AddTimerScreen = () => {
    const [name, setName] = useState('');
  
    const handleNameChange = (text) => {
      setName(text);
    };

    const handleMinutesChange = (itemValue) => {
      setSelectedMinutes(itemValue);
    };
  
    const handleSecondsChange = (itemValue) => {
      setSelectedSeconds(itemValue);
    };

  
    const addTimer = () => {
      const newName = name ? name : `Temporizador ${newTimerId}`;
      const totalSeconds = selectedMinutes * 60 + selectedSeconds;
      const updatedTimers = [...timers, { id: newTimerId, name: newName, initialDuration: totalSeconds }];
      setTimers(updatedTimers);
      saveTimersToStorage(updatedTimers); // Guarda los temporizadores en AsyncStorage
      setName('');
      setNewTimerId(newTimerId + 1);

    };

    return (
      <LinearGradient
        colors={['gray', 'black']}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: 50 }}>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ marginRight: 50 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 10 }}>Seleccionar minutos:</Text>
              <Picker
                selectedValue={selectedMinutes}
                onValueChange={handleMinutesChange}
                style={{ height: 50, width: 100, color: 'white' }}
                itemStyle={{ backgroundColor: 'black', color: 'white', fontSize: 20 }}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <Picker.Item key={i} label={i.toString()} value={i} />
                ))}
              </Picker>
            </View>
            <View>
              <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 10 }}>Seleccionar segundos:</Text>
              <Picker
                selectedValue={selectedSeconds}
                onValueChange={handleSecondsChange}
                style={{ height: 50, width: 100, color: 'white' }}
                itemStyle={{ backgroundColor: 'black', color: 'white', fontSize: 20 }}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <Picker.Item key={i} label={i.toString()} value={i} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={{ marginTop: 120, width: '100%', alignItems: 'center' }}>
            <KeepKeyboardOpenTextInput
              style={{ height: 40, borderColor: 'white', borderWidth: 1, color: 'white', paddingHorizontal: 10, width: '100%', textAlign: 'center' }}
              onChangeText={handleNameChange}
              value={name}
              placeholder="Ingrese el nombre del temporizador"
              placeholderTextColor="white"
            />
          </View>
          <TouchableOpacity onPress={addTimer} style={{ marginTop: 30 }}>
            <Text style={{color: 'white', backgroundColor: 'gray', fontWeight:'bold', fontSize: 18, borderRadius: 50, width: 200, textAlign:'center', padding: 10 }}>Agregar Temporizador</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };




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

  setSelectedReps(selectedReps === 0 ? 0 : (selectedReps - 1));
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



  return (
  <PanGestureHandler 
  onGestureEvent={handleGesture}
  activeOffsetY={[-10, 10]}
  >
    <SafeAreaView style={{ flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarStyle: { marginTop: 0, position: 'absolute', top: 30, left: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 0)', elevation: 0, margin: 30},
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
                  <View style={{zIndex: 1, top: '15%', width: '19%'}}>
                    <Text style={{left: 15, color: 'white', bottom: 10, position: 'absolute'}}>Descanso</Text>
                    <Picker
                      id={timer.id}
                      selectedValue={selectedSecondsDescanso}
                      onValueChange={handleSecondsDescansoChange}
                      style={{ height: 50, width: 100, color: 'white', position:'absolute', top: '15%', zIndex: 1}}
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
                        selectedSecondsDescanso={selectedSecondsDescanso}
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
                      <View style={{ height: 50, width: 100, position:'absolute', bottom: '14%', left: 0, zIndex: 1}}>
                      <Text style={{textAlign: 'center', color: 'white'}}>Repeticiones</Text>
                      <Picker
                        selectedValue={selectedReps}
                        onValueChange={handleRepsChange}
                        style={{ color: 'white',}}
                        itemStyle={{ backgroundColor: 'black', color: 'white', fontSize: 20 }}
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