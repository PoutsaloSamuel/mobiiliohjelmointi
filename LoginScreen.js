import React, { useState, useEffect } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, StyleSheet, View, Text, Image, TextInput, FlatList, Dimensions, ImageBackground, CheckBox, Alert, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import { faHome, faList, faPencilAlt, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

const image = { uri: "https://cdn.dribbble.com/users/370759/screenshots/1796042/untitled-1.gif" };
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default function Etusivu({ navigation }) {


    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={{
                flex: 1,
                resizeMode: "cover",
                width: Dimensions.get('window').width,
                justifyContent: "center"
            }}>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Uusi')} ><Text style={styles.loginText}>Lisää uusi tietokone</Text></TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Lista')} ><Text style={styles.loginText}>Tietokonelista</Text></TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Kirjautuminen')} ><Text style={styles.loginText}>Kirjaudu ulos</Text></TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    temp: {
        marginTop: 200,
        color: 'white',
        flex: 1,
    },
    container: {
        flex: 1,
        fontSize: 30,
        marginHorizontal: 10,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',

    },

    mid: {
        fontSize: 20,
        borderWidth: 5,
        height: 47,
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        alignSelf: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    checkboxContainer: {
        flexDirection: "row",
        flex: 1,
        marginHorizontal: 10,
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    tekstilaatikko: {
        flex: 2,
        alignItems: 'center',
        marginHorizontal: 10,
        justifyContent: 'center',
        fontSize: 15,
        color: 'white',
    },
    alaLinkit: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',

    },
    loginButton: {

        alignSelf: "flex-start",
        backgroundColor: 'rgba(19, 20, 20, 0.95)',
        borderWidth: 1,
        marginHorizontal: 15,
        width: 290,
        color: 'white',
        padding: 10,
        borderRadius: 20,
        marginTop: 70,
    },
    loginText: {
        alignSelf: 'flex-start',
        fontSize: 20,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerButton: {

        alignSelf: "flex-start",
        width: 250,
        color: 'white',
        marginTop: 10,
    },
    registerText: {
        alignSelf: 'flex-start',
        fontSize: 15,
        marginLeft: 30,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerText2: {
        alignSelf: 'flex-start',
        fontSize: 15,
        marginLeft: 30,
        color: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },

})
    ;