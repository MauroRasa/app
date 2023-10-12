import React, { useState, useEffect  } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import CircleComponent from '../componentes/Circle.js';
import * as Animatable from 'react-native-animatable';
import Modal from '../componentes/ModalRegistro.js'
import ModalLogin from '../componentes/ModalLogin.js'

function Inicio() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [areTextsVisible, setAreTextsVisible] = useState(true);

    const openModal = (modalType) => {
      if (modalType === 'registro') {
        setIsModalVisible(true);
      } else if (modalType === 'login') {
        setIsLoginModalVisible(true);
      }
      setAreTextsVisible(false);
  };
  const closeModal = (modalType) => {
    if (modalType === 'registro') {
      setIsModalVisible(false);
    } else if (modalType === 'login') {
      setIsLoginModalVisible(false);
    }
    setAreTextsVisible(true);
  };

  return (
    <ImageBackground
      source={require('../assets/fondo_app.jpg')}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.circle}>
          <CircleComponent modals={{isModalVisible, isLoginModalVisible}} />
        </View>
      </View>
        {areTextsVisible && (
        <>
        <TouchableOpacity
            style={styles.login}
            onPress={() => openModal('login')}>
            <Text style={styles.loginText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <Text style={styles.texto}>¿No tenés una cuenta?</Text>
          <TouchableOpacity
            style={styles.regis}
            onPress={() => openModal('registro')}>
            <Text style={styles.registText}>Registrarse</Text>
          </TouchableOpacity>
        </>
        )}
        <Modal isVisible={isModalVisible} closeModal={() => closeModal('registro')} />
        <ModalLogin isVisible={isLoginModalVisible} closeModal={() => closeModal('login')} />
    </ImageBackground>
  );
}

export default Inicio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  login: {
    backgroundColor: 'blue', 
    width: '70%',
    paddingVertical: 15, 
    borderRadius: 30, 
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 18,
  },
  regis: {
    width: '70%',
    paddingVertical: 15, 
    borderRadius: 30, 
    alignItems: 'center',
  },
  registText: {
    color: 'red',
    fontSize: 18,
  },
  texto: {
    color: 'white',
    fontSize: 18
  }
});
