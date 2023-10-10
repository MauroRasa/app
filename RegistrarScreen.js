import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

export default function Registro() { 
    const navigation = useNavigation();

    const [nombre, setNombre] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [apellido, setApellido] = useState('');

    const handleEnviarGet = () => {
        fetch('http://192.168.100.219:3000/api/usuarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Obtener el texto de la respuesta
                } else {
                    throw new Error('La solicitud no fue exitosa');
                }
            })
            .then(result => {
                console.log('Respuesta del servidor:', result);
                
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    };

    const handleEnviar = () => {
        if (!nombre || !apellido || !domicilio) {
            Alert.alert('Campos Obligatorios', 'Todos los campos son obligatorios');
            return;}
        const datos = {
            nombre: nombre,
            apellido: apellido,
            domicilio: domicilio
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
                            navigation.navigate('inicio');
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
        <>
            <View>
                <Text>Formulario</Text>
                <TextInput
                    placeholder="Nombre"
                    value={nombre}
                    
                    onChangeText={text => setNombre(text)}
                />
                <TextInput
                    placeholder="Apellido"
                    value={apellido}
                    onChangeText={text => setApellido(text)}
                />
                <TextInput
                    placeholder="Domicilio"
                    value={domicilio}
                    onChangeText={text => setDomicilio(text)}
                />
                <Button title="Verificar POST" onPress={handleEnviar} />
                <Button title="Petición GET" onPress={handleEnviarGet}/>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 25,
        color: 'red',
    }
});