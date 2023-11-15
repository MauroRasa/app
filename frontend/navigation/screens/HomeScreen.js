import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, {useState, useEffect } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';  
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutButton from '../componentes/LogoutButton';
import ProfileComponent from '../componentes/ProfileComponent';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';


LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  today: 'Hoy',
};

LocaleConfig.defaultLocale = 'es';


const HomeScreen = ({ navigation }) => {
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



  const [markedDates, setMarkedDates] = useState({});
  const [selectedDates, setSelectedDates] = useState([]);

  // Cargar fechas marcadas al montar el componente
  useEffect(() => {
    loadMarkedDates();
  }, []);

  // Cargar fechas marcadas desde AsyncStorage
const loadMarkedDates = async () => {
  try {
    const storedDates = await AsyncStorage.getItem('markedDates');
    if (storedDates) {
      setMarkedDates(JSON.parse(storedDates));

      // Actualizar selectedDates con las fechas seleccionadas
      const selectedDatesArray = Object.keys(JSON.parse(storedDates)).filter(
        (date) => markedDates[date]?.selected
      );
      
      setSelectedDates(selectedDatesArray);
    }
  } catch (error) {
    console.error('Error loading marked dates:', error);
  }
};

// Marcar o desmarcar una fecha
const toggleDate = (date) => {
  const updatedMarkedDates = { ...markedDates };
  if (updatedMarkedDates[date]) {
    delete updatedMarkedDates[date];
  } else {
    updatedMarkedDates[date] = { selected: true, marked: true };
  }

  setMarkedDates(updatedMarkedDates);
  saveMarkedDates(updatedMarkedDates);

  // Actualizar selectedDates con las fechas seleccionadas después de guardar
  const selectedDatesArray = Object.keys(updatedMarkedDates).filter(
    (date) => updatedMarkedDates[date]?.selected
  );
  
  setSelectedDates(selectedDatesArray);
};

  // Guardar fechas marcadas en AsyncStorage
  const saveMarkedDates = async (dates) => {
    try {
      await AsyncStorage.setItem('markedDates', JSON.stringify(dates));
    } catch (error) {
      console.error('Error saving marked dates:', error);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#525252'}}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.leftContainer}>
            <Image
              source={require('../../assets/Logo_blanco.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity style={styles.logoutButton}>
              <LogoutButton />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: '40%', overflow: 'hidden'}}>
          <ProfileComponent />
          <Text style={{textAlign: 'center', fontSize: 20, color: 'white', marginBottom: 10}}>Calendario de Actividad</Text>
            <View style={{borderRadius: 10, overflow: 'hidden'}}>
              <Calendar
                onDayPress={(day) => {
                  toggleDate(day.dateString);
                }}
                markedDates={markedDates}
                theme={{
                  backgroundColor: 'white', // Este color puede afectar la barra superior del calendario
                  calendarBackground: 'black', // Este color debería afectar el fondo del calendario
                  textSectionTitleColor: 'white', // Color del texto de la barra superior
                  monthTextColor: 'white', // Color del texto del mes
                  selectedDayBackgroundColor: 'darkgray', // Color de fondo de los días seleccionados
                  selectedDayTextColor: 'white', // Color del texto de los días seleccionados
                  todayTextColor: 'pink', // Color del texto del día actual
                  arrowColor: 'white', // Color de las flechas de navegación
                  textDisabledColor: 'gray', //Color dias que no forman parte del mes
                  dayTextColor: 'white' //Color dias que si forman parte del mes
                }}
              />
            </View>
            {selectedDates.length > 0 && (
              <Text style={{ marginTop: 20, fontSize: 25, color: 'white', justifyContent: 'center', textAlign: 'center', fontWeight: 'bold'}}>
                Historial de Gimnasio:
                {selectedDates.map((date, index) => (
                  <Text key={index} style={{color: 'darkgray'}}>{`\n${format(parseISO(date), 'EEEE, MMMM d', { locale: es })}`}</Text>
                ))}
              </Text>
            )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#525252',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    marginHorizontal: 20,
    color: '#555',
  },
  appName: {
    fontWeight: 'bold',
    color: '#FF6347',
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  leftContainer: {
    paddingLeft: 20,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  presentationText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: '45%',
    marginHorizontal: 20,
    color: '#333',
  },
});

export default HomeScreen;
