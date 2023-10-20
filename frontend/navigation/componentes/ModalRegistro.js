import React, { useState, useEffect } from 'react';
import { View, Modal, Text, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, Icon } from 'react-native-elements';
import * as Font from 'expo-font';

const ModalRegistro = ({ isVisible, closeModal }) => {
    
    const [Pass, setPass] = useState('');
    const [showPass, setShowPass] = useState(false);

    useEffect(() => {
        async function loadFont() {
          await Font.loadAsync({
            'Plaster-Regular': require('../../assets/plaster/Plaster-Regular.ttf'),
          });
          setFontLoaded(true); // Marcar la fuente como cargada cuando se completa la carga
        }
    
        loadFont();
      }, []);

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const anchoUsario = windowHeight * 0.05;
    const alturaUsuario = windowWidth * 0.44;
    
    const navigation = useNavigation();
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');

    const [fontLoaded, setFontLoaded] = useState(false);
        
    const handleEnviar = () => {
        if (!usuario || !email || !Pass) {
            Alert.alert('Campos Obligatorios', 'Todos los campos son obligatorios');
                return;}
                    const datos = {
                        usuario: usuario,
                        email: email,
                        Pass: Pass
                    };
            
                fetch('http://192.168.100.219:3000/api/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datos),
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('La solicitud no fue exitosa');
                        }
                    })
                    .then(result => {
                        console.log('Respuesta del servidor:', result);
                        Alert.alert('Usuario agregado correctamente', '', [
                        {
                        text: 'OK',
                            onPress: () => {
                                closeModal();
                                },
                            },
                        ]);
                    })
                    .catch(error => {
                        console.error('Error en la solicitud:', error);
                        alert('Error en la conexión al backend o la base de datos');
                    });


    };
  return (
        <Modal
          animationType="slide" 
          transparent={true} 
          visible={isVisible} 
          onRequestClose={closeModal} 
        >
          <View style={[styles.modalContainer, {left: anchoUsario, top: alturaUsuario}]}>
            <View style={styles.formulario}>
                    {fontLoaded ? (
                        <Text style={[{fontFamily: 'Plaster-Regular', fontSize: 48, fontWeight: 'bold', position: 'absolute', bottom: '90%', }]}>Registro</Text>
                    ) : (<Text>Loading...</Text>
                    )}
                    <Input
                        placeholder="Usuario"
                        value={usuario}
                        style={styles.input}
                        
                        onChangeText={text => setUsuario(text)}
                    />
                    <Input
                        placeholder="Email"
                        value={email}
                        style={styles.input}
        
                        onChangeText={text => setEmail(text)}
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
                    <View style={{borderRadius: 10, backgroundColor: 'blue', width: '70%', height: '12%', justifyContent: 'center', alignItems: 'center',}}>
                        <TouchableOpacity onPress={handleEnviar}>
                            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold'}}> Registrarse </Text>
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
    marginTop: '30%'
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

export default ModalRegistro;
