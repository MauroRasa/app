import React from "react";
import { SafeAreaView, StyleSheet } from "react-native-web";
import MainStack from "./navigation/MainStack"

export default function App(){ 
    return(


        <SafeAreaView style = {{ flex : 1}}>

            <MainStack />

        </SafeAreaView>
    )};

    const styles = StyleSheet.create({

        container: {
            alignItems: 'center',
            background: 'ffffff',
            flex: 1,
            justifyContent: 'center'
        }
    })