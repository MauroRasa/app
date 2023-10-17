import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, {useEffect} from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import LogoutButton from '../componentes/LogoutButton';


const HomeScreen = ({navigation}) => {
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
            <Image
                source={require('../../assets/Logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <LogoutButton/>
            <Text style={styles.title}>Bienvenido</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Crear rutina</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Crear Plan Alimentacion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Actualizar Datos</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f9f9f9',
    },
    logo: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginTop: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30,
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
});

export default HomeScreen;
