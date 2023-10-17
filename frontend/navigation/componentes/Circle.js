import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, Animated, View } from 'react-native';
import * as Font from 'expo-font';

const loadCustomFont = async () => {
  await Font.loadAsync({
    'Plaster-Regular': require('../../assets/plaster/Plaster-Regular.ttf'),
  });
};

const CircleComponent = ({ modals }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [circleTopValue] = useState(new Animated.Value(-1.4));

  useEffect(() => {
    async function loadFont() {
      await loadCustomFont();
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const textSize = windowWidth * 0.55;
  const textTop = (windowHeight / 2.7) - (textSize / 1);
  const circleSizeAncho = windowWidth * 1.1;
  const circleSizeAlto = windowHeight * 0.55;
  const initialCircleTop = -1.4;
  const finalCircleTop = -1;

  useEffect(() => {
    const { isModalVisible, isLoginModalVisible } = modals;
    if (isModalVisible || isLoginModalVisible) {
      Animated.timing(circleTopValue, {
        toValue: finalCircleTop,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(circleTopValue, {
        toValue: initialCircleTop,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [modals, circleTopValue]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              {
                translateY: circleTopValue.interpolate({
                  inputRange: [-2.2, -1.5],
                  outputRange: [0, (initialCircleTop - finalCircleTop) * circleSizeAlto],
                }),
              },
            ],
            width: circleSizeAncho,
            height: circleSizeAlto,
          },
        ]}
      >
        {fontLoaded ? (
          <Text style={[styles.text, { fontFamily: 'Plaster-Regular', fontSize: 40, color: 'white', width: '70%', textAlign: 'center', marginBottom: 0, top: textTop }]}>FitPlan Gains</Text>
        ) : (
          <Text>Loading...</Text>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    borderRadius: 999,
  },
});

export default CircleComponent;
