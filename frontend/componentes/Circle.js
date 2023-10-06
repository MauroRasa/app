import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import * as Font from 'expo-font';

const loadCustomFont = async () => {
  await Font.loadAsync({
    'Plaster-Regular': require('../assets/plaster/Plaster-Regular.ttf'),
  });
};

const CircleComponent = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await loadCustomFont();
      setFontLoaded(true);
    }

    loadFont();

    const updateDimensions = () => {
      setWindowDimensions(Dimensions.get('window'));
    };

    Dimensions.addEventListener('change', updateDimensions);

    return () => {
      // No es necesario eliminar el oyente en versiones más recientes de React Native
    };
  }, []);

  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));
  const textSize = windowDimensions.width * 0.55;
  const textTop = -textSize / 0.88;
  const circleSize = windowDimensions.width * 1.2;
  const circleTop = -circleSize / 2;

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { top: circleTop, width: circleSize, height: circleSize }]}>
      </View>
      {fontLoaded ? (
        <Text style={[styles.text, { fontFamily: 'Plaster-Regular', fontSize: 40, color: 'white', width: '70%', top: textTop ,textAlign: 'center', }]}>FitPlan Gains</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    borderRadius: 999,
    position: 'absolute',
  },
});

export default CircleComponent;
