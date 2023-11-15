import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useEffect} from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';



const AlimentacionInicio = ({navigation}) => {
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

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>¡Bienvenido a FitPlanGains Comida y Nutricion!</Text>
            <Text style={styles.subHeaderText}>
              Tu destino para un cuerpo más fuerte y una mente más sana.
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.highlightedText}>
              Descubre una nueva forma de vivir una vida saludable y en forma.
            </Text>
            <Text style={styles.normalText}>¡Comienza hoy mismo y alcanza tus metas de fitness!</Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/comida.jpg')}
                style={styles.image}
              />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Alimentacion')}
            >
                <Text style={styles.buttonText}>Calcular calorias para consumir x día</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    const styles = {
      container: {
        flex: 1,
        backgroundColor: '#8b8b8b',
        padding: 20,
      },
      header: {
        marginBottom: 20,
      },
      headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff', 
        textAlign: 'center',
        marginTop: 30
      },
      subHeaderText: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
      },
      content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      highlightedText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
        textAlign: 'center',
      },
      normalText: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 20,
        textAlign: 'center',
      },
      imageContainer: {
        marginBottom: 20,
      },
      image: {
        width: 300,
        height: 200,
        borderRadius: 10,
      },
      button: {
        backgroundColor: '#4CAF50', 
        padding: 15,
        borderRadius: 10,
      },
      buttonText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
      },
    };
    
    export default AlimentacionInicio;