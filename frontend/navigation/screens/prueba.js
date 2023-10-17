// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text,
//   Button, 
//   TouchableOpacity,
//   SafeAreaView,
//   ImageBackground,
//   StyleSheet, 
//   Dimensions
// } from 'react-native';
// import { useTimer } from 'react-timer-hook';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import {LinearGradient} from 'expo-linear-gradient';
// import KeepKeyboardOpenTextInput from './KeepKeyboardOpenTextInput';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Audio } from 'expo-av';
// import { Picker } from '@react-native-picker/picker';

// function Timer({  duration, onExpire}) {
//   const expiryTimestamp = new Date();
//   expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + duration);
// // ALARMA CUANDO TERMINA EL TEMPORIZADOR

//   const [sound, setSound] = useState();

//   useEffect(() => {
//     return sound
//       ? () => {
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [sound]);

//   const playSound = async () => {
//     const { sound } = await Audio.Sound.createAsync(require('./assets/CambioTempo.mp3'));
//     setSound(sound);

//     await sound.playAsync();
//   };


    
//   const {
//     totalSeconds,
//     seconds,
//     minutes,
//     hours,
//     days,
//     isRunning,
//     start,
//     pause,
//     resume,
//     restart,
//   } = useTimer({ expiryTimestamp,
//     onExpire
//   });


//   const [isPressed, setIsPressed] = useState(false);



//   return (
//     <View style={{ alignItems: 'center', marginTop: 150 }}>
//       <Text style={{ fontSize: 20 }}>Timer: {seconds}</Text>
//     </View>
//   );  
// }


// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//   },
// });




// export default function Temporizador({navigation, route }) {
//   const [isFirstTimerVisible, setIsFirstTimerVisible] = useState(false);
//   const [isSecondTimerVisible, setIsSecondTimerVisible] = useState(false);

//   const handleStartFirstTimer = () => {
//     setIsFirstTimerVisible(true);
//     setIsSecondTimerVisible(false); // Reset the second timer visibility
//   };

//   const handleFirstTimerExpire = () => {
//     console.log('Timer 1 expired. Starting Timer 2.');
//     setIsFirstTimerVisible(false);
//     setIsSecondTimerVisible(true);
//   };

//   const handleStartSecondTimer = () => {
//     setIsSecondTimerVisible(true);
//     setIsFirstTimerVisible(false); // Hide the first timer when the second timer starts
//   };

//   const handleSecondTimerExpire = () => {
//     console.log('Timer 2 expired. Showing Timer 1.');
//     setIsSecondTimerVisible(false);
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {!isFirstTimerVisible && !isSecondTimerVisible && (
//         <View style={{ alignItems: 'center', margin: 20 }}>
//           <Text style={{ fontSize: 20 }}>Timer 1</Text>
//           <Button title="Start Timer 1" onPress={handleStartFirstTimer} />
//         </View>
//       )}

//       {isFirstTimerVisible && (
//         <Timer duration={3} onExpire={handleFirstTimerExpire} />
//       )}

//       {isSecondTimerVisible && (
//         <View style={{ alignItems: 'center', margin: 20 }}>
//           <Text style={{ fontSize: 20 }}>Timer 2</Text>
//           <Button
//             title="Start Timer 2"
//             onPress={handleStartSecondTimer}
//             disabled={isFirstTimerVisible}
//           />
//         </View>
//       )}

//       {isSecondTimerVisible && (
//         <Timer duration={5} onExpire={handleSecondTimerExpire} />
//       )}
//     </View>
//   );
// }



















// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   TouchableOpacity,
//   SafeAreaView,
//   ImageBackground,
//   StyleSheet, 
//   Dimensions
// } from 'react-native';
// import { useTimer } from 'react-timer-hook';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import {LinearGradient} from 'expo-linear-gradient';
// import KeepKeyboardOpenTextInput from './KeepKeyboardOpenTextInput';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Audio } from 'expo-av';
// import { Picker } from '@react-native-picker/picker';

// function Timer({ expiryTimestamp}) {

// // ALARMA CUANDO TERMINA EL TEMPORIZADOR

//   const [sound, setSound] = useState();

//   useEffect(() => {
//     return sound
//       ? () => {
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [sound]);

//   const playSound = async () => {
//     const { sound } = await Audio.Sound.createAsync(require('./assets/Alarma.mp3'));
//     setSound(sound);

//     await sound.playAsync();
//   };



    
//   const {
//     totalSeconds,
//     seconds,
//     minutes,
//     hours,
//     days,
//     isRunning,
//     start,
//     pause,
//     resume,
//     restart,
//   } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => playSound() });


//   const [isPressed, setIsPressed] = useState(false);



//   return (
//     <ImageBackground
//       source={require('./assets/pesas_tempo.jpg')}
//       style={styles.container}
//     >
//       <View style={{ marginTop: '45%', alignItems: 'center'}}>
//         <TouchableOpacity
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: '#B22222',
//             borderRadius: 999,
//             borderColor: 'gray', 
//             borderWidth: 3,
//             height: '72%',
//             width: '85%',
//             shadowColor: 'black',
//             shadowOffset: {
//               width: 0,
//               height: 2,
//             },
//             shadowOpacity: isPressed ? 0.9 : 0.9, // Ajustar la opacidad de la sombra según sea necesario
//             shadowRadius: 3.84,
//             elevation: 5,
//             overflow: 'hidden',
//           }}
//           onPress={isRunning ? pause : (pause ? resume : start)}
//           onPressIn={() => setIsPressed(true)}
//           onPressOut={() => setIsPressed(false)}
//         >
//           <Text style={{fontSize: 50}}>{`${minutes}:${seconds}`}</Text>
//           <Text style={{fontSize: 30}}>{`Duración: ${totalSeconds} segundos`}</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );  
// }


// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//   },
// });




// export default function Temporizador({navigation, route }) {
//   let stopTime;
//   if (route.params && route.params.stopTime) {
//     stopTime = route.params.stopTime;
//   }
//   const [timers, setTimers] = useState([{ id: 1, name: 'Temporizador 1', initialDuration: stopTime ? stopTime : 100 }]);
//   const [newTimerId, setNewTimerId] = useState(2); // Iniciar en 2 ya que el temporizador 1 ya existe

//   const Tab = createMaterialTopTabNavigator();

//   const windowHeight = Dimensions.get('window').height;
//   const iconSize = windowHeight * 0.05;


//   const handleGesture = ({ nativeEvent }) => {
//     if (nativeEvent.translationY < -80) {
//       // Si el gesto es hacia arriba
//       navigation.navigate('TemporizadorAjustable');
//     } else if (nativeEvent.translationY > 80) {
//       // Si el gesto es hacia abajo
//       navigation.navigate('TemporizadorAjustable');
//     }
//   };








//   const removeTimer = (timerId) => {
//     const updatedTimers = timers.filter((timer) => timer.id !== timerId);
//     setTimers(updatedTimers);
//   };
  
//   const AddTimerScreen = () => {
//     const [name, setName] = useState('');
  
//     const handleNameChange = (text) => {
//       setName(text);
//     };
  
//     const [globalStopTime, setGlobalStopTime] = useState(0);

//     const addTimer = () => {
//       const newName = name ? name : `Temporizador ${newTimerId}`;
//       setTimers([...timers, { id: newTimerId, name: newName, initialDuration: stopTime }]);
//       setGlobalStopTime(stopTime)
//       setName('');
//       setNewTimerId(newTimerId + 1);

//     };

//     return (
//       <LinearGradient
//         colors={['gray', 'black']}
//         style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}
//       >
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'  }}>
//           <KeepKeyboardOpenTextInput
//             style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
//             onChangeText={handleNameChange}
//             value={name}
//             placeholder="Ingrese el nombre del temporizador"
//           />
//           <TouchableOpacity onPress={addTimer}>
//             <Text style={{color: 'white'}}>Agregar Temporizador</Text>
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>
//     );
//   };




//   const TimerWithRemove = ({ id, initialDuration }) => {  
//     const [timerExpiry, setTimerExpiry] = useState(new Date());
//     timerExpiry.setSeconds(timerExpiry.getSeconds() + initialDuration);

//     const handleRestart = () => {
//       const time = new Date();
//       time.setSeconds(time.getSeconds() + initialDuration);
//       setTimerExpiry(time);
//   };

//     return (
//       <View style={styles.timerContainer}>
//       <Timer expiryTimestamp={timerExpiry} />
//       <TouchableOpacity style={styles.deleteButton} onPress={() => removeTimer(id)}>
//         <Text style={styles.deleteText}>
//           <Icon name="delete" size={iconSize} color="gray" />
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={handleRestart} style={styles.restartButton}>
//         <Text style={styles.restartText}>Restart</Text>
//       </TouchableOpacity>
//     </View>
//     );
//   };
//   const styles = StyleSheet.create({
//     timerContainer: {
//       position: 'relative',
//     },
//     deleteButton: {
//       position: 'absolute',
//       bottom: 20,
//       right: 20,
//       backgroundColor: 'rgba(255, 255, 255, 0)', 
//       elevation: 0 ,
//       padding: 10,
//       borderRadius: 5,
//     },
//     deleteText: {
//       color: 'white',
//     },
//     restartButton: {
//       position: 'absolute',
//       bottom: 20,
//       left: 20,
//       backgroundColor: 'blue',
//       padding: 10,
//       borderRadius: 5,
//     },
//     restartText: {
//       color: 'white',
//     },
//   });


//   return (
//   <PanGestureHandler onGestureEvent={handleGesture}>
//     <SafeAreaView style={{ flex: 1}}>
//       <Tab.Navigator
//         screenOptions={{
//           tabBarScrollEnabled: true,
//           tabBarStyle: { marginTop: 0, position: 'absolute', top: 30, left: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 0)', elevation: 0, margin: 30},
//           swipeEnabled: true,
//           tabBarActiveTintColor: 'white', // Para cambiar el color del texto de la pestaña
//           tabBarIndicatorStyle: { backgroundColor:'gray' },
//           tabBarLabelStyle: {
//             textShadowColor: 'rgba(0, 0, 0, 0.75)', // Agregar sombra al texto
//             textShadowOffset: { width: 0, height: 1 }, // Ajustar el desplazamiento de la sombra si es necesario
//             textShadowRadius: 2, // Ajustar el radio de la sombra si es necesario
//             fontWeight: 'bold', // Hacer el texto en negrita
//           },
//         }}>
//         {timers.map((timer) => (
//           <Tab.Screen
//           key={timer.id}
//           name={timer.name}
//         >
//           {() => <TimerWithRemove id={timer.id} initialDuration={timer.initialDuration} />}
//         </Tab.Screen>
//         ))}
//         <Tab.Screen name="Agregar" component={AddTimerScreen} />
//       </Tab.Navigator>
//       <TouchableOpacity
//       onPress={() => navigation.navigate('Cronometro')}
//       style={{
//         position: 'absolute',
//         bottom: 20,
//         alignSelf: 'center',
//         backgroundColor: 'blue',
//         padding: 20,
//         borderRadius: 100,
//         justifyContent: 'center',
//       }}
//     >
//       <Text style={{ color: 'white', textAlign: 'center' }}>Ir a Cronometro</Text>
//     </TouchableOpacity>
//     </SafeAreaView>
//   </PanGestureHandler>
  









// import React, { useState, useEffect } from 'react';
// import { useStopwatch } from 'react-timer-hook';
// import { 
//   View, 
//   Text, 
//   Button, 
//   TouchableOpacity,
//   ImageBackground , 
//   StyleSheet
//   } from 'react-native';
// import { Audio } from 'expo-av';
// import { Picker } from '@react-native-picker/picker';
// import * as Notifications from 'expo-notifications';
// import AnimatedCircularProgress from 'react-native-circular-progress-indicator';

// export default function Tempo() {
//   const {
//     totalSeconds,
//     seconds,
//     minutes,
//     isRunning,
//     start,
//     pause,
//     reset,
//   } = useStopwatch();

//   // TIEMPO ELEGIDO POR EL USUARIO
//   const [selectedTime, setSelectedTime] = useState(10);
//   const [sound, setSound] = useState();
//   const [notificationId, setNotificationId] = useState(null);

//   // BARRA DE PROGRESO

//   // Progreso de la barra
//   const [progress, setProgress] = useState(0);
//    // Estado para controlar la activación de la barra de progreso
//    const [progressReset, setProgressReset] = useState(false);

//    const [valorBarra, setValorBarra] = useState(0);
  
//   const handlePress = () => {
//     if (isRunning) {
//       pause();
//     } else {
//       start();
//     }
//   };

//   const handleReset = () => {
    
//     reset();
//   };


//   return (
//     <ImageBackground
//       source={require('../assets/pesas_tempo.jpg')}
//       style={styles.container}
//     >
//       <View style={{}}>
        
//         <TouchableOpacity
//           style={{
//           marginTop: '45%',
//           justifyContent: 'center',
//           alignItems: 'center',
//           alignSelf: 'center',
//           backgroundColor: 'red',
//           borderRadius: 999,
//           height: '50%',
//           width: '85%',
//           shadowColor: 'black',
//           shadowOffset: {
//             width: 0,
//             height: 2,
//           },
//           shadowOpacity: 0.3,
//           shadowRadius: 3.84,
//           elevation: 5,
//           overflow: 'hidden',
//           }}
//           onPress={handlePress}
//         >
//         <View style={{ fontSize: 80, fontWeight: 'bold', zIndex: 2}}>
//           <Text style={{ fontSize: 100 }}>{minutes}:{seconds}</Text>
//         </View>
//         {/* <View style={{position: 'absolute', alignSelf: 'center', justifyContent: 'center', flex: 1, alignItems: 'center',}}>
//                   <View style={{ position: 'absolute', zIndex: 1, height: 100, width: 100, alignSelf: 'center', backgroundColor: 'red', marginBottom: 10 }}>
//                   </View> */}
//                   {/* <AnimatedCircularProgress
//                     radius={125}
//                     value={progressReset ? 0 : progress}
//                     textColor= '#222'
//                     fontSize={20}
//                     inActiveStrokeColor={'gray'}
//                     inActiveStrokeOpacity={0.4}
//                     inActiveStrokeWidth={6}
//                     duration={progressReset ? 1 : 1000}
                    
//                     /> */}
//               {/* </View> */}
//         </TouchableOpacity>
//           <TouchableOpacity
//               style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: 'blue',
//               padding: 10,
//               marginTop: 20,
//               alignSelf: 'center', // Alinea el botón horizontalmente en el centro
//               }}
//               onPress={handleReset}
//           >
//           <Text style={{ fontSize: 20, color: 'white' }}>Reset</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',

//   },
// });








































// import React, { useState, useEffect } from 'react';
// import { 
// View, 
// Text, 
// Button, 
// TouchableOpacity,
// StyleSheet,
// ImageBackground 
// } from 'react-native';
// import { Audio } from 'expo-av';
// import { Picker } from '@react-native-picker/picker';
// import * as Notifications from 'expo-notifications';
// import AnimatedCircularProgress from 'react-native-circular-progress-indicator';


// const Tempo = () => {
//   // CONTADOR DEL TEMPORIZADOR
//   const [seconds, setSeconds] = useState(0);
//   // TIEMPO ELEGIDO POR EL USUARIO
//   const [selectedTime, setSelectedTime] = useState(10);
//   const [isRunning, setIsRunning] = useState(false);
//   const [sound, setSound] = useState();
//   const [notificationId, setNotificationId] = useState(null);

//   // BARRA DE PROGRESO

//   // Progreso de la barra
//   const [progress, setProgress] = useState(0);
//    // Estado para controlar la activación de la barra de progreso
//    const [progressReset, setProgressReset] = useState(false);

//    const [valorBarra, setValorBarra] = useState(0);

//    useEffect(() => {
//       setValorBarra((valorBarra) => 100 / selectedTime);
//   }, [selectedTime]);

//   // ALARMA CUANDO TERMINA EL TEMPORIZADOR
//   useEffect(() => {
//     return sound
//       ? () => {
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [sound]);

//   const playSound = async () => {
//     const { sound } = await Audio.Sound.createAsync(require('./Alarma.mp3'));
//     setSound(sound);

//     await sound.playAsync();
//   };

//   // LOGICA TEMPORIZADOR
//   const formatTime = (time) => {
//     return time < 10 ? `0${time}` : `${time}`;
//   };

//   useEffect(() => {
//     let interval = null;
//     if (isRunning) {
//       if (seconds === selectedTime) {
//         playSound();
//         sendNotification();
//         setIsRunning(false);
//       }
//       if (seconds < selectedTime) {
//         interval = setInterval(() => {
//           setSeconds((seconds) => seconds + 1);
//         }, 1000);
//       }
//     }
//     return () => {
//       clearInterval(interval);
//     //   Notifications.dismissNotificationAsync(notificationId); // Descartar la notificación al detener el temporizador
//     };
//   }, [isRunning, seconds, selectedTime, notificationId]);

//   useEffect(() => {
//     if(seconds !== 0 && progress !== 100){
//       setProgress((progress) => progress + valorBarra);
//     }
//   }, [seconds]);



//   const resetTimer = () => {
//     setSeconds(0);
//     setIsRunning(false);
//     setProgressReset(true)
//     setProgress(() => 0);
//     setProgressReset(false);
//   };

//   // ENVIAR NOTIFICACION CUANDO EL TEMPORIZADOR TERMINE
//   const sendNotification = async () => {
//     try {
//       Notifications.setNotificationHandler({
//         handleNotification: async () => ({
//           shouldShowAlert: true,
//           shouldPlaySound: false,
//           shouldSetBadge: false,
//         }),
//       });

//     //   if (notificationId) {
//     //     await Notifications.dismissNotificationAsync(notificationId);
//     //   }

//       const notification = await Notifications.scheduleNotificationAsync({
//         content: {
//           title: 'Temporizador finalizado',
//           body: '¡El temporizador ha finalizado!',
//         },
//         trigger: null,
//       });

//       setNotificationId(notification.identifier);

//       // Temporizador para descartar la notificación después de 3 segundos
//     //   setTimeout(() => {
//     //     dismissNotification();
//     //   }, 3000);
//     } catch (error) {
//       console.error('Error al enviar la notificación:', error);
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../imagenes/pesas_tempo.jpg')}
//       style={styles.container}
//     >
//         <View style={{}}>
//             <Picker
//                 selectedValue={selectedTime}
//                 style={{ height: 50, width: 100, alignSelf: 'center', backgroundColor: 'gray', marginBottom: 10 }}
//                 onValueChange={(itemValue) => setSelectedTime(itemValue)}
//                 >
//                 <Picker.Item label="10" value={10} />
//                 <Picker.Item label="20" value={20} />
//                 <Picker.Item label="30" value={30} />
//                 <Picker.Item label="40" value={40} />
//                 <Picker.Item label="50" value={50} />
//                 <Picker.Item label="60" value={60} />
//             </Picker>
//             <TouchableOpacity
//                 style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: 'red',
//                 borderRadius: 999,
//                 height: '62%',
//                 shadowColor: 'black',
//                 shadowOffset: {
//                     width: 0,
//                     height: 2,
//                 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 3.84,
//                 elevation: 5,
//                 overflow: 'hidden',
//                 }}
//                 onPress={() => {
//                   setIsRunning(!isRunning); 
//                   if(seconds === 0){
//                     setProgress((progress) => progress + valorBarra);
//                   }
//                 }}
//             >
//                 <Text style={{ fontSize: 80, fontWeight: 'bold', zIndex: 2}}>
//                 {formatTime(Math.floor(seconds / 60)).padStart(2, '0')}:{formatTime(seconds % 60).padStart(2, '0')}
//                 </Text>
//                 <View style={{position: 'absolute', alignSelf: 'center', justifyContent: 'center', flex: 1, alignItems: 'center',}}>
//                   <View style={{ position: 'absolute', zIndex: 1, height: 100, width: 100, alignSelf: 'center', backgroundColor: 'red', marginBottom: 10 }}>
//                   </View>
//                   <AnimatedCircularProgress
//                     radius={125}
//                     value={progressReset ? 0 : progress}
//                     textColor= '#222'
//                     fontSize={20}
//                     inActiveStrokeColor={'gray'}
//                     inActiveStrokeOpacity={0.4}
//                     inActiveStrokeWidth={6}
//                     duration={progressReset ? 1 : 1000}
                    
//                     />
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity
//                 style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: 'blue',
//                 padding: 10,
//                 marginTop: 20,
//                 alignSelf: 'center', // Alinea el botón horizontalmente en el centro
//                 }}
//                 onPress= {resetTimer}
//             >
//                 <Text style={{ fontSize: 20, color: 'white' }}>{progress}Reset</Text>
//             </TouchableOpacity>
//         </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',

//     },
// });
// export default Tempo;
