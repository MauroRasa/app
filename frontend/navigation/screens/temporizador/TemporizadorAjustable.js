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


function Timer({ expiryTimestamp }) {


// ALARMA CUANDO TERMINA EL TEMPORIZADOR

  const [sound, setSound] = useState();

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('./assets/Alarma.mp3'));
    setSound(sound);

    await sound.playAsync();
  };



    
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => playSound() });


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
            backgroundColor: '#B22222',
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
            shadowOpacity: isPressed ? 0.9 : 0.9, // Ajustar la opacidad de la sombra según sea necesario
            shadowRadius: 3.84,
            elevation: 5,
            overflow: 'hidden',
          }}
          onPress={isRunning ? pause : (pause ? resume : start)}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          <Text style={{fontSize: 50}}>{`${minutes}:${seconds}`}</Text>
          <Text style={{fontSize: 30}}>{`Duración: ${totalSeconds} segundos`}</Text>
        </TouchableOpacity>
      </View>
  
      <TouchableOpacity 
        onPress={() => {
          // Restarts to user-selected minutes and seconds
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




export default function TemporizadorAjustable({navigation}) {

  const [timers, setTimers] = useState([{ id: 1, name: 'Temporizador 1', initialDuration: 60 }]);
  const [newTimerId, setNewTimerId] = useState(2); // Iniciar en 2 ya que el temporizador 1 ya existe

  const Tab = createMaterialTopTabNavigator();

  const windowHeight = Dimensions.get('window').height;
  const iconSize = windowHeight * 0.05;


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


  const storageKey = 'timersFromTemporizadorAjustable'; // Clave única para identificar los temporizadores de esta pantalla


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
        setTimers(JSON.parse(storedTimers));
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
    const [selectedMinutes, setSelectedMinutes] = useState(0);
    const [selectedSeconds, setSelectedSeconds] = useState(0);
  
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
            <Text style={{color: 'white'}}>Agregar Temporizador</Text>
          </TouchableOpacity>
          <View>
            <Text style={{ color: 'white' }}>Seleccionar minutos:</Text>
            <Picker
              selectedValue={selectedMinutes}
              onValueChange={handleMinutesChange}
            >
              {Array.from({ length: 60 }, (_, i) => (
                <Picker.Item key={i} label={i.toString()} value={i} />
              ))}
            </Picker>

            <Text style={{ color: 'white' }}>Seleccionar segundos:</Text>
            <Picker
              selectedValue={selectedSeconds}
              onValueChange={handleSecondsChange}
            >
              {Array.from({ length: 60 }, (_, i) => (
                <Picker.Item key={i} label={i.toString()} value={i} />
              ))}
            </Picker>
          </View>
        </View>
      </LinearGradient>
    );
  };




  const TimerWithRemove = ({ id, initialDuration }) => {  
    const time = new Date();
    time.setSeconds(time.getSeconds() + initialDuration);

    return (
     <View style={styles.timerContainer}>
      <Timer expiryTimestamp={time} />
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
      position: 'relative',
    },
    deleteButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: 'rgba(255, 255, 255, 0)', 
      elevation: 0 ,
      padding: 10,
      borderRadius: 5,
    },
    deleteText: {
      color: 'white',
    },
  });



  return (
  <PanGestureHandler onGestureEvent={handleGesture}>
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
            textShadowOffset: { width: 0, height: 1 }, // Ajustar el desplazamiento de la sombra si es necesario
            textShadowRadius: 2, // Ajustar el radio de la sombra si es necesario
            fontWeight: 'bold', // Hacer el texto en negrita
          },
        }}>
        {timers.map((timer) => (
          <Tab.Screen
          key={timer.id}
          name={timer.name}
        >
          {() => <TimerWithRemove id={timer.id} initialDuration={timer.initialDuration} />}
        </Tab.Screen>
        ))}
        <Tab.Screen name="Agregar" component={AddTimerScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  </PanGestureHandler>
  );
}