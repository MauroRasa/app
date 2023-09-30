import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [domicilio, setDomicilio] = useState('');

  useEffect(() => {
    fetch('http://192.168.100.219:3000/api/usuarios')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Error al obtener datos:', error));
  }, []);

  const handleEditarClick = (usuario) => {
    setUsuarioAEditar(usuario);
    setNombre(usuario.nombre);
    setApellido(usuario.apellido);
    setDomicilio(usuario.domicilio);
  };

  const handleGuardarClick = () => {
    // Realiza una solicitud PUT al servidor para actualizar el usuario
    fetch(`http://192.168.100.219:3000/api/usuarios/${usuarioAEditar.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, apellido, domicilio }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Actualiza la lista de usuarios
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((u) => (u.id === usuarioAEditar.id ? { ...u, nombre, apellido, domicilio } : u))
        );
        // Limpia los campos de edición
        setUsuarioAEditar(null);
        setNombre('');
        setApellido('');
        setDomicilio('');
      })
      .catch((error) => console.error('Error al actualizar usuario:', error));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Lista de Usuarios:</Text>
      {usuarios.map((usuario) => (
        <View key={usuario.id}>
          <Text>
            Nombre: {usuario.nombre}, Apellido: {usuario.apellido}, Domicilio: {usuario.domicilio}
          </Text>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'gray' : 'blue', // Cambia el color al presionar
                padding: 10,
                borderRadius: 5,
              },
              pressed ? { opacity: 0.5 } : null, // Cambia la opacidad al presionar
            ]}
            onPress={() => handleEditarClick(usuario)}
          >
            <Text style={{ color: 'white' }}>Editar</Text>
          </Pressable>
        </View>
      ))}
      {usuarioAEditar && (
        <View>
          <Text>Editar Usuario:</Text>
          <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} />
          <TextInput placeholder="Apellido" value={apellido} onChangeText={setApellido} />
          <TextInput placeholder="Domicilio" value={domicilio} onChangeText={setDomicilio} />
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'gray' : 'green', // Cambia el color al presionar
                padding: 10,
                borderRadius: 5,
              },
              pressed ? { opacity: 0.5 } : null, // Cambia la opacidad al presionar
            ]}
            onPress={handleGuardarClick}
          >
            <Text style={{ color: 'white' }}>Guardar</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
