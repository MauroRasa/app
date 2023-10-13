import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Audio } from 'expo-av';

const Tempo = () => {
  const [seconds, setSeconds] = useState(0);
  const [sound, setSound] = useState();

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/beep.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  };

  useEffect(() => {
    let interval = null;
    if (seconds === 10) {
      playSound();
    }
    if (seconds < 10) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  const resetTimer = () => {
    setSeconds(0);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>Timer: {seconds}s</Text>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button title="Reset" onPress={resetTimer} />
      </View>
    </View>
  );
};

export default Tempo;
