import * as firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import Rekisteri from './Rekisteri';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, StyleSheet, View, Text, Image, TextInput, FlatList, Dimensions, ImageBackground, CheckBox } from 'react-native';
const image = { uri: "https://c.wallhere.com/photos/8f/28/Nvidia_GPUs_GeForce_computer_cooling_fan_technology_closeup_graphics_card-132561.jpg!d" };

const firebaseConfig = {
    apiKey: "AIzaSyAoMXjhCDWdCu1Vp_T-HWtf7DPRbDiVRN4",
    authDomain: "koneprojekti-2850d.firebaseapp.com",
    databaseURL: "https://koneprojekti-2850d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "koneprojekti-2850d",
    storageBucket: "koneprojekti-2850d.appspot.com",
    messagingSenderId: "999416947419",
    appId: "1:999416947419:web:2f54ca7e2ae727426aa2fe"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default function Etusivu({ navigation }) {
    const [tunnus, setTunnus] = useState([]);
    const [salasana, setSalasana] = useState('');
    const [kayttajatunnus, setKayttajatunnus] = useState('');
    const [isSelected, setSelection] = useState(false);



    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={{
                flex: 1,
                resizeMode: "cover",
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                justifyContent: "center"
            }}>
                <Text style={styles.container}> Hei! Tässä sovelluksessa voit tallentaa tiedot tietokoneesi komponenteista helposti ja jakaa niitä.</Text>
                <Text style={styles.container}> Kirjaudu sisään tai rekistöröidy jatkaaksesi</Text>
                <Text style={styles.container}>Käyttäjätunnus</Text>
                <TextInput style={styles.tekstilaatikko} placeholderTextColor='white'
                    placeholder='<<Example>>' onChangeText={kayttajatunnus => setKayttajatunnus(kayttajatunnus)}
                    value={kayttajatunnus} />
                <Text style={styles.container}>Salasana</Text>
                <TextInput style={styles.tekstilaatikko} placeholderTextColor='white'
                    placeholder='<<Example>>' onChangeText={salasana => setSalasana(salasana)}
                    value={salasana} />
                <View style={styles.checkboxContainer}>
                    <Text style={styles.tekstilaatikko}>Muista minut!</Text>
                    <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={styles.tekstilaatikko}
                        tintColors={{ true: 'white', false: 'black' }}
                    />
                </View>
                <TouchableOpacity title="Kirjaudu" ><Text></Text></TouchableOpacity>
                <Button title="Rekistöröidy" onPress={() => navigation.navigate({ Rekisteri })} />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 18,
        marginHorizontal: 10,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
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

})