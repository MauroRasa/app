import { View, Text, Image, StyleSheet } from 'react-native';
import React, {useEffect} from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';



const Screen2 = ({navigation}) => {
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
            <Text style={styles.headerText}>¡Bienvenido a FitPlanGains!</Text>
            <Text style={styles.subHeaderText}>
              Tu destino para un cuerpo más fuerte y una mente más sana.
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.highlightedText}>
              Descubre una nueva forma de vivir una vida saludable y en forma.
            </Text>
            <Text style={styles.normalText}>
              Ofrecemos una amplia gama de entrenamientos personalizados, programas de dieta y consejos de salud para ayudarte en tu viaje de fitness.
            </Text>
            <Text style={styles.normalText}>¡Comienza hoy mismo y alcanza tus metas de fitness!</Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/comida.jpg')}
                style={styles.image}
              />
            </View>
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      header: {
        alignItems: 'center',
        marginBottom: 30,
      },
      headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      subHeaderText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'gray',
      },
      content: {
        alignItems: 'center',
      },
      highlightedText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
      },
      normalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
      },
      imageContainer: {
        marginTop: 20,
      },
      image: {
        width: 300,
        height: 200,
        borderRadius: 10,
      },
    });
    
    export default Screen2;