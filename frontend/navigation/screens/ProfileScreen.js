import { View, Text } from 'react-native';
import React, {useEffect} from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';


const ProfileScreen = ({navigation}) => {
    useEffect(() => {
        const lockScreenOrientation = async () => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        };

        const onFocus = () => {
            lockScreenOrientation();
        };

        const unsubscribe = navigation.addListener('focus', onFocus);

        return () => {
            unsubscribe();
            ScreenOrientation.unlockAsync();
        };
    }, [navigation]);



    return (
        <View>
            <Text style={{left: 100, top:150, fontSize: 30}}>Chat con IA</Text>
        </View>
    );
};

export default ProfileScreen;