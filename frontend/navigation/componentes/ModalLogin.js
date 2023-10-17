import React, { useState, useEffect } from 'react';
import { View, Modal, Text, StyleSheet, Alert, Dimensions,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';

const ModalLogin = ({ isVisible, closeModal }) => {
    const navigation = useNavigation();
    const [usuario, setUsuario] = useState('');
    const [Pass, setPass] = useState('');

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const anchoUsario = windowHeight * 0.05;
    const alturaUsuario = windowWidth * 0.44;

    const [showPass, setShowPass] = useState(false);
        
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFont() {
          await Font.loadAsync({
            'Plaster-Regular': require('../../assets/plaster/Plaster-Regular.ttf'),
          });
          setFontLoaded(true); // Marcar la fuente como cargada cuando se completa la carga
        }
    
        loadFont();
      }, []);
    

      const checkAuthenticationStatus = async () => {
        try {
          const userToken = await AsyncStorage.getItem('userToken');
          if (userToken) {
            const response = await fetch('http://192.168.100.219:3000/api/verifyToken', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
              },
            });
            if (response.ok) {
              navigation.navigate('AppPrincipal');
            } else {
                
            }
          }
        } catch (error) {
          console.error('Error al obtener información de inicio de sesión desde AsyncStorage:', error);
        }
      };

      const handleLogin = async () => {
        if (!usuario || !Pass) {
          Alert.alert('Campos Obligatorios', 'Todos los campos son obligatorios');
          return;
        }
        try {
          const response = await fetch('http://192.168.100.219:3000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario, Pass }), // Envía los datos de usuario y contraseña
          });
          if (response.ok) {
            const data = await response.json();
            await AsyncStorage.setItem('userToken', data.userToken); // Asegúrate de cambiar 'userToken' por la clave adecuada
            // Navegar a la pantalla AppPrincipal después de guardar el token
            navigation.navigate('AppPrincipal');
          } else {
            const errorData = await response.json(); // Obtén datos de error del servidor si están disponibles
            throw new Error(errorData.error || 'Error de inicio de sesión');
          }
        } catch (error) {
          console.error('Error en la solicitud de inicio de sesión:', error);
          Alert.alert('Error', 'Error en la conexión al backend o la base de datos');
        }
      };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={[styles.modalContainer, { left: anchoUsario, top: alturaUsuario }]}>
        <View style={styles.formulario}>
          {fontLoaded ? (
            <Text style={[{ fontFamily: 'Plaster-Regular', fontSize: 48, fontWeight: 'bold', position: 'absolute', top: 20, }]}>Iniciar Sesión</Text>
          ) : (<Text>Loading...</Text>)}
          <Input
            placeholder="Usuario"
            value={usuario}
            style={styles.input}
            onChangeText={text => setUsuario(text)}
          />
          <Input
            placeholder="Pass"
            value={Pass}
            onChangeText={(text) => setPass(text)}
            secureTextEntry={!showPass}
            rightIcon={
              <Icon
                name={showPass ? 'visibility' : 'visibility-off'}
                size={24}
                onPress={() => setShowPass(!showPass)}
              />
            }
          />
          <View style={{ borderRadius: 10, backgroundColor: 'blue', width: '70%', height: '12%', justifyContent: 'center', alignItems: 'center', top: '20%' }}>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}> Iniciar </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray', // Color de fondo del modal
    padding: 15,
    maxHeight: '70%',
    maxWidth: '80%',
    opacity: 0.85,
  },
  modalText: {
    fontSize: 18,
  },
  formulario: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Input: {
    width: '100%',
    height: '9%',
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 20,
    borderRadius: 10,
    margin: 10,
    top: '5%'
  },
});

export default ModalLogin;
