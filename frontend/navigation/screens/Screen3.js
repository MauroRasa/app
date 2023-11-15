import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Video} from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);

const Tab = createMaterialTopTabNavigator();

const Biceps = () => {
    const video = React.useRef(null);

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/biceps.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/biceps-2.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/biceps-3.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <StatusBar style="auto" />
        </View>
    );
};

const Piernas = () => {
    const video = React.useRef(null);

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/piernas.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/piernas-2.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/piernas-3.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <StatusBar style="auto" />
        </View>
    );
};

const Hombros = () => {
    const video = React.useRef(null);

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/hombros.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/hombros-2.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/hombros-3.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <StatusBar style="auto" />
        </View>
    );
};

const Espalda = () => {
    const video = React.useRef(null);

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/espalda.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/espalda-2.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/espalda-3.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <StatusBar style="auto" />
        </View>
    );
};

const Triceps = () => {
    const video = React.useRef(null);

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/triceps.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/triceps-2.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/triceps-3.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <StatusBar style="auto" />
        </View>
    );
};

const Pecho = () => {
    const video = React.useRef(null);

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/pecho.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/pecho-2.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                isMuted
            />
            <StatusBar style="auto" />
        </View>
    );
};

const Screen3 = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.welcomeText}>FitPlanGains Videos</Text>
                <View style={styles.tabContainer}>
                <Tab.Navigator
                    screenOptions={{
                    tabBarScrollEnabled: true,
                    labelStyle: { fontSize: 14, fontWeight: 'bold'},
                    tabBarStyle: { backgroundColor: '#8b8b8b'}, 
                    tabBarActiveTintColor: 'white',
                    tabBarIndicatorStyle: { backgroundColor: '#d1d1d1' }
                    }}
                >
                        <Tab.Screen name="Biceps" component={Biceps} />
                        <Tab.Screen name="Piernas" component={Piernas} />
                        <Tab.Screen name="Hombros" component={Hombros} />
                        <Tab.Screen name="Espalda" component={Espalda} />
                        <Tab.Screen name="Triceps" component={Triceps} />
                        <Tab.Screen name="Pecho" component={Pecho} />
                    </Tab.Navigator>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        padding: 15,
        backgroundColor: '#8b8b8b',
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: 'white',
        marginTop: 40
    },
    tabContainer: {
        marginTop: 10,
        height: Dimensions.get('window').height * 0.85,
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        flex: 4,
        alignSelf: 'stretch',

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