import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useStopwatch } from 'react-timer-hook';
import { useNavigation } from '@react-navigation/native';

const Cronometro = ({navigation}) => {
  const {totalSeconds, seconds, minutes, isRunning, start, pause } = useStopwatch();
  const [stopTime, setStopTime] = useState(0);

  const handleStart = () => {
    start();
  };

  const handleStop = () => {
    pause();
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setStopTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);


  const handleFinish = () => {
    pause();
    navigation.navigate('Temporizador', { stopTime: totalSeconds });
  };


  return (
    <View style={styles.container}>
        <Text style={styles.timerText}>
            {minutes}:{seconds}
        </Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleStart}>
                <Text style={styles.buttonText}>Iniciar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleStop}>
                <Text style={styles.buttonText}>Detener</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.buttonText}>Finalizar</Text>
            </TouchableOpacity>
        </View>
    </View>
);
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 150,
    },
    timerText: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 50,
    },
    button: {
        backgroundColor: '#484848',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 30,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

  


export default Cronometro;
