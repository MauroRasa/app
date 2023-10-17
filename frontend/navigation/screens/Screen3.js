import React, {useRef, useState} from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Pecho = () => {

    return (
        <View style={styles.tabItem}>
            {/* Agrega el reproductor de video para el contenido del Biceps aquí */}
        </View>
    );
};

const Biceps = () => {
    return (
        <View style={styles.tabItem}>
            {/* Agrega el reproductor de video para el contenido del Biceps aquí */}
        </View>
    );
};

const Piernas = () => {
    return (
        <View style={styles.tabItem}>
            {/* Agrega el reproductor de video para el contenido de Piernas aquí */}
        </View>
    );
};

const Hombros = () => {
    return (
        <View style={styles.tabItem}>
            {/* Agrega el reproductor de video para el contenido de Hombros aquí */}
        </View>
    );
};

const Espalda = () => {
    return (
        <View style={styles.tabItem}>
            {/* Agrega el reproductor de video para el contenido de Espalda aquí */}
        </View>
    );
};

const Triceps = () => {
    return (
        <View style={styles.tabItem}>
            {/* Agrega el reproductor de video para el contenido de Triceps aquí */}
        </View>
    );
};

const Screen3 = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Bienvenido a FitPlanGains Videos</Text>
            <View style={styles.tabContainer}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarScrollEnabled: true,
                        labelStyle: { fontSize: 14, fontWeight: 'bold' },
                        style: { backgroundColor: '#F2F2F2' },
                        indicatorStyle: { backgroundColor: '#F62A2A' },
                    }}
                >
                    <Tab.Screen name="Pecho" component={Pecho} />
                    <Tab.Screen name="Biceps" component={Biceps} />
                    <Tab.Screen name="Piernas" component={Piernas} />
                    <Tab.Screen name="Hombros" component={Hombros} />
                    <Tab.Screen name="Espalda" component={Espalda} />
                    <Tab.Screen name="Triceps" component={Triceps} />
                </Tab.Navigator>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        marginTop: 30,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: 'brown',
    },
    tabContainer: {
        marginTop: 10,
        height: Dimensions.get('window').height * 0.4,
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        flex: 1,
        alignSelf: 'stretch'
    },
    button: {
        margin: 16,

    }
});

export default Screen3;

// import {Video} from 'expo-av';
// import { StatusBar } from 'expo-status-bar';

// const Tab = createMaterialTopTabNavigator();

// const Screen3 = () => {
//     const video = React.useRef(null);
//     const secondVideo = React.useRef(null);
//     const [status, setStatus] = React.useState({})
//     const [statusSecondVideo, setStatusSecondVideo] = React.useState({})

//     return (
//         <View style={styles.container}>
//             <Video 
//                 ref={video}
//                 style={styles.video}
//                 source={require("../../assets/doctor.mp4")}
//                 useNativeControls
//                 resizeMode="contain"
//                 isLooping
//                 onPlaybackStatusUpdate={setStatus}
//             />
//             <View style={styles.button}>
//                 <Button title="Play from 5s" onPress={() => video.current.playFromPositionAsync(5000)} />
//                 <Button title={status.isLooping ? "Set to no loop" : "Set to loop"} onPress={() => video.current.setIsLoopingAsync(!status.isLooping)} />
//             </View>
            
//             <StatusBar style="auto"/>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 15,
//         marginTop: 30,
//     },
//     video: {
//         flex: 1,
//         alignSelf: 'stretch'
//     },
//     button: {
//         margin: 16,

//     }

// });