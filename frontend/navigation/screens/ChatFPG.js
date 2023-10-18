import { View, Dimensions, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { WebView } from 'react-native-webview';


const ChatFPG = ({navigation}) => {
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
        <View style={styles.container}>
          <WebView
            style={styles.webview}
            source={{ uri: 'https://widget.getcody.ai/public/9a665dff-749d-4d5a-a040-a37553b19d1c' }}
          />
        </View>
      );
    }
    
export default ChatFPG;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1.2,
        position: 'absolute'
    }, 
    webview: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
  });