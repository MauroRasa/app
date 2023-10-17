import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, LogBox  } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import * as ScreenOrientation from 'expo-screen-orientation';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message


const Screen1 = ({navigation}) => {

    const [tableHead, setTableHead] = useState(['Primer Semana']);
    const [tableHeadSec, setTableHeadSec] = useState(['Día', 'Grupo Muscular', 'Ejercicios Recomendados', 'Reps', 'Descanso']);
    const [tableData, setTableData] = useState([
        ['Lunes', 'Pecho, Triceps', 'Press de banca', '8/12 reps', '60-90s'],
        ['', '', 'Aperturas con mancuernas/maquina', '8-12 reps', '60-90s'],
        ['', '', 'Fondos en paralelas', '8-12 reps', '60-90s'],
        ['', '', 'Press inclinado con mancuernas ', '8-12 reps', '60-90s'],
        ['', '', 'Extensiones de tríceps con polea', '8-12 reps', '60-90s'],
        ['', '', 'Patada de tríceps con mancuerna', '8-12 reps', '60-90s'],
        ['Martes', 'Espalda y Bíceps', 'Dominadas', '8-12 reps', '60-90s'],
        ['', '', 'Remo con barra', '8-12 reps', '60-90s'],
        ['', '', 'Remo con mancuernas', '8-12 reps', '60-90s'],
        ['', '', 'Curl de bíceps con barra', '8-12 reps', '60-90s'],
        ['', '', 'Curl de martillo', '8-12 reps', '60-90s'],
        ['', '', 'Dominadas con agarre inverso', '8-12 reps', '60-90s'],
        ['Miercoles', 'Piernas, Hombros', 'Sentadillas', '8/12 reps', '60-90s'],
        ['', '', 'Prensa de piernas', '8-12 reps', '60-90s'],
        ['', '', 'Zancadas ', '8-12 reps', '60-90s'],
        ['', '', 'Peso muerto rumano', '8-12 reps', '60-90s'],
        ['', '', 'Press militar con barra', '8-12 reps', '60-90s'],
        ['', '', 'Elevaciones laterales con mancuernas', '8-12 reps', '60-90s'],
        ['', '', 'Elevaciones frontales con mancuernas', '8-12 reps', '60-90s'],
        ['Jueves', 'Pecho, Triceps', 'Press de banca', '8-12 reps', '60-90s'],
        ['', '', 'Aperturas con mancuernas/maquina', '8-12 reps', '60-90s'],
        ['', '', 'Fondos en paralelas', '8-12 reps', '60-90s'],
        ['', '', 'Press inclinado con mancuernas ', '8-12 reps', '60-90s'],
        ['', '', 'Extensiones de tríceps con polea', '8-12 reps', '60-90s'],
        ['', '', 'Patada de tríceps con mancuerna', '8-12 reps', '60-90s'],
        ['Viernes', 'Espalda y Bíceps', 'Dominadas', '8-12 reps', '60-90s'],
        ['', '', 'Remo con barra', '8-12 reps', '60-90s'],
        ['', '', 'Remo con mancuernas', '8-12 reps', '60-90s'],
        ['', '', 'Curl de bíceps con barra', '8-12 reps', '60-90s'],
        ['', '', 'Curl de martillo', '8-12 reps', '60-90s'],
        ['', '', 'Dominadas con agarre inverso', '8-12 reps', '60-90s'],
        ['Sabado', 'Piernas, Hombros', 'Sentadillas', '8/12 reps', '60-90s'],
        ['', '', 'Prensa de piernas', '8-12 reps', '60-90s'],
        ['', '', 'Zancadas ', '8-12 reps', '60-90s'],
        ['', '', 'Peso muerto rumano', '8-12 reps', '60-90s'],
        ['', '', 'Press militar con barra', '8-12 reps', '60-90s'],
        ['', '', 'Elevaciones laterales con mancuernas', '8-12 reps', '60-90s'],
        ['', '', 'Elevaciones frontales con mancuernas', '8-12 reps', '60-90s'],
    ]);

    const [tableWidth, setTableWidth] = useState(Dimensions.get('window').width * 0.97);

    useEffect(() => {
        const updateWidth = () => {
            const windowWidth = Dimensions.get('window').width;
            const windowHeight = Dimensions.get('window').height;
            setTableWidth(Math.max(windowWidth, windowHeight) * 0.97);
        };
    
        updateWidth();
    
        const onChange = () => {
            updateWidth();
        };
    
        const subscription = Dimensions.addEventListener('change', onChange);
    
        return () => subscription && subscription.remove(); // check if subscription is truthy before trying to remove it
    }, []);


    useEffect(() => {
        const unlockScreenOrientation = async () => {
            await ScreenOrientation.unlockAsync();
        };

        const onFocus = navigation.addListener('focus', () => {
            unlockScreenOrientation();
        });

        return onFocus;
    }, [navigation]);


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        scrollView: {
            flex: 1,
        },
        tableContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
            marginTop: 40
        },
        table: {
            width: tableWidth,
        },
        head: { 
            height: 40, 
            backgroundColor: '#f1f8ff' 
        },
        headSec: {
            height: 50, 
            backgroundColor: 'lightyellow' 
        },
        text: {
            margin: 6,
            textAlign: 'center',
        },
    });

    return (
        <View style={styles.container}>
          <ScrollView horizontal={true}>
            <View style={styles.tableContainer}>
              <ScrollView>
                <Table style={styles.table} borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                  <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                  <Row 
                    data={tableHeadSec} 
                    style={styles.headSec} 
                    textStyle={styles.text} 
                    flexArr={[0.4, 0.7, 2, 0.5, 0.5]} />
                  <Rows
                        data={tableData}
                        flexArr={[0.4, 0.7, 2, 0.5, 0.5]} // Ajusta los valores aquí según el ancho deseado para cada columna
                        style= {styles.table}
                    />
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      );
};

export default Screen1;