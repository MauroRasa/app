import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, LogBox, TouchableOpacity, Text, Animated, Easing, Dimensions, FlatList  } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Icon from 'react-native-vector-icons/Ionicons';


LogBox.ignoreLogs(['new NativeEventEmitter']); 


const Screen1 = ({navigation}) => {

  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    const unlockScreenOrientation = async () => {
        await ScreenOrientation.unlockAsync();
    };

    const onFocus = navigation.addListener('focus', () => {
        unlockScreenOrientation();
    });

    return onFocus;
}, [navigation]);

    // COACHMARK
    const [opacity, setOpacity] = useState(0.7);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
  
    const handlePress = () => {
      setOpacity(0);
      setIsButtonVisible(false);
    };
  
    const translateY = useRef(new Animated.Value(0)).current;
    const [currentIcon, setCurrentIcon] = useState('barbell');
  
    useEffect(() => {
      const animate = () => {
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 100,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setCurrentIcon((prev) => {
            if (prev === 'barbell') {
              return 'restaurant';
            } else if (prev === 'restaurant') {
              return 'caret-forward-circle-outline';
            } else {
              return 'barbell';
            }
          });
          animate();
        });
      };
  
      animate();
    }, [translateY]);
    // FIN

    const commonDetails = "8-12 reps - 60-90 segundos - 3-4 Series";

    const DATA = [
      {
        day: 'LUNES',
        muscleGroup: 'Pecho, Triceps',
        exercises: [
          {
            name: 'Press de banca',
          },
          {
            name: 'Aperturas con mancuernas/maquina',
          },
          {
            name: 'Fondos en paralelas',
          },
          {
            name: 'Press inclinado con mancuernas',
          },
          {
            name: 'Extensiones de tríceps con polea',
          },
          {
            name: 'Patada de tríceps con mancuerna',
          },
        ],
      },
      {
        day: 'MARTES',
        muscleGroup: 'Espalda y Bíceps',
        exercises: [
          {
            name: 'Dominadas',
          },
          {
            name: 'Remo con barra',
          },
          {
            name: 'Remo con mancuernas',
          },
          {
            name: 'Curl de bíceps con barra',
          },
          {
            name: 'Curl de martillo',
          },
          {
            name: 'Dominadas con agarre inverso',
          },
        ],
      },
      {
        day: 'MIÉRCOLES',
        muscleGroup: 'Piernas y Hombros',
        exercises: [
          {
            name: 'Sentadillas',
          },
          {
            name: 'Prensa de piernas',
          },
          {
            name: 'Zancadas',
          },
          {
            name: 'Peso muerto rumano',
          },
          {
            name: 'Press militar con barra',
          },
          {
            name: 'Elevaciones laterales con mancuernas',
          },
          {
            name: 'Elevaciones frontales con mancuernas',
          },
        ],
      },
      {
        day: 'JUEVES',
        muscleGroup: 'Pecho, Triceps',
        exercises: [
          {
            name: 'Press de banca',
          },
          {
            name: 'Aperturas con mancuernas/maquina',
          },
          {
            name: 'Fondos en paralelas',
          },
          {
            name: 'Press inclinado con mancuernas',
          },
          {
            name: 'Extensiones de tríceps con polea',
          },
          {
            name: 'Patada de tríceps con mancuerna',
          },
        ],
      },
      {
        day: 'VIERNES',
        muscleGroup: 'Espalda y Bíceps',
        exercises: [
          {
            name: 'Dominadas',
          },
          {
            name: 'Remo con barra',
          },
          {
            name: 'Remo con mancuernas',
          },
          {
            name: 'Curl de bíceps con barra',
          },
          {
            name: 'Curl de martillo ',
          },
          {
            name: 'Dominadas con agarre inverso',
          },
        ],
      },
      {
        day: 'Sabado',
        muscleGroup: 'Piernas y Hombros',
        exercises: [
          {
            name: 'Sentadillas',
          },
          {
            name: 'Prensa de piernas',
          },
          {
            name: 'Zancadas',
          },
          {
            name: 'Peso muerto rumano',
          },
          {
            name: 'Press militar con barra',
          },
          {
            name: 'Elevaciones laterales con mancuernas',
          },
          {
            name: 'Elevaciones frontales con mancuernas',
          },
        ],
      },
      // Asegúrate de agregar los datos para el resto de los días de la semana de manera similar
    ];

    const Item = ({ item }) => (
      <View style={[styles.item, { width: windowWidth }]}>
        <Text style={styles.day}>{item.day}</Text>
        <Text style={styles.muscleGroup}>{item.muscleGroup}</Text>
        {item.exercises.map((exercise, index) => (
          <View key={index} style={styles.exercise}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDetails}>{commonDetails}</Text>
          </View>
        ))}
      </View>
    );
  
      const renderItem = ({ item }) => {
        if (!item) {
          return null; 
        }
        return (
          <Item
            item={item} // Pasar el objeto completo en lugar de acceder a sus propiedades directamente
          />
        );
      };


    return (
        <View style={styles.container}>
          <Text style={styles.title}>Rutinas Recomendadas</Text>
            {isButtonVisible && (
                <TouchableOpacity style={[styles.overlay, { opacity }]} activeOpacity={1} onPress={handlePress}>
                    <Text style={{textAlign:'center', marginTop: 300}}>Toque cualquier lado para continuar</Text>
                    <View style={{ position: 'absolute', bottom: 0, right: 0, marginBottom: '20%', marginRight: 20,alignItems: 'flex-end', }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 15, marginRight: 8 }}>
                            Deslice el icono para 
                        </Text>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 15 }}>
                            cambiar entre pantallas
                        </Text>
                        <Animated.View style={[styles.iconContainer, { transform: [{ translateY }] }]}>
                            <Icon name={currentIcon} size={50} />
                        </Animated.View>
                    </View>
                </TouchableOpacity>
            )}
          <ScrollView horizontal={true}>
            <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.day} // Asegúrate de usar una clave única para cada elemento de la lista
          />
          </ScrollView>
        </View>
      );
};

export default Screen1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#525252'
      },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 100
    },
    coachmark: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    coachmarkText: {
      marginRight: 5,
    },
    iconContainer: {
      width: 50,
      height: 50,
    },
    item: {
      backgroundColor: '#8b8b8b',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    day: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'white'
    },
    muscleGroup: {
      fontSize: 18,
      marginBottom: 10,
      color: '#f1f1f1'
    },
    exercise: {
      marginBottom: 5,
      color: '#e7e7e7'
    },
    exerciseName: {
      fontWeight: 'bold',
      color: '#e7e7e7'
    },
    exerciseDetails: {
      fontStyle: 'italic',
      color: '#dadada'
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 20,
      alignSelf: 'center',
      color: '#fff',
    },
  });