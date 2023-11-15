import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const ProfileComponent = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Hacer una solicitud al servidor para obtener el nombre de usuario
    fetch('http://192.168.100.219:3000/api/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Permite incluir las cookies en la solicitud
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error de red: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsername(data.username);
      })
      .catch((error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      });
  }, []);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: '20%'}}>
      <Text style={{color: 'white', fontSize: 25, fontFamily: ''}}>Bienvenido a FitPlanGains </Text>
      <Text style={{color: 'darkgray', fontSize: 25}}>{username}</Text>
    </View>

  );
};

export default ProfileComponent;
