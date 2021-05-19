import * as firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import TextInput from 'react-native-textinput-with-icons';
import { Button, StyleSheet, View, Text, Image, FlatList, Dimensions, ImageBackground, CheckBox, Alert, TouchableOpacity, } from 'react-native';
const image = { uri: "https://cdn.dribbble.com/users/370759/screenshots/1796042/untitled-1.gif" };

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

export default function Rekisteri() {

    useEffect(() => {

        firebase.database().ref('tunnus/').on('value', snapshot => {
            const dataTunnus = snapshot.val();
            const prodsTunnus = Object.values(dataTunnus);
            setTunnus(prodsTunnus);
        });
    }, []);

    const register = () => {

        if (kayttajatunnus == '' || salasana == '') {
            Alert.alert('Ilmoitus', 'Käyttäjätunnus tai salasana on tyhjä')
        } else if (isSelected != false) {
            Alert.alert('Ilmoitus', 'Käyttäjän luonti onnistui!')
            firebase.database().ref('tunnus/').push({ 'kayttajatunnus': kayttajatunnus, 'salasana': salasana })
        } else {
            Alert.alert('Ilmoitus', 'Sinun täytyy lukea ja hyväksyä säännöt ennen tilin luomista!')
        }
    }

    const saannot = () => {
        Alert.alert("Lupaus", "En jaa tai muokkaa sovelluksen alkuperäistä koodia. Luovun omaisuuksistani ja annan kaikki rahani sovelluksen tekijälle :)")
    }
    var check = 'false';
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
                justifyContent: "center"
            }}>
                <View style={styles.temp}>
                    <TextInput containerWidth={300} paddingLeft={50} placeholderTextColor='white' color="white" textAlign='center' leftIcon="user" leftIconType="awesome"
                        label="Käyttäjätunnus" activeColor="red" labelActiveColor="red" labelColor="white" leftIconColor="white" onChangeText={kayttajatunnus => setKayttajatunnus(kayttajatunnus)}
                        value={kayttajatunnus} />
                    <TextInput containerWidth={300} paddingLeft={50} placeholderTextColor='white' color="white" textAlign='center' leftIcon="lock" leftIconType="awesome"
                        secureTextEntry={true} activeColor="red" labelActiveColor="red" label="Salasana" labelColor="white" leftIconColor="white" onChangeText={salasana => setSalasana(salasana)}
                        value={salasana} />
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                            tintColors={{ true: 'white', false: 'black' }}
                        />
                        <Text style={styles.tekstilaatikko}>Olen lukenut ja ymmärtänyt sivun {" "}<Text style={{
                            alignItems: 'center',
                            marginHorizontal: 10,
                            justifyContent: 'center',
                            fontSize: 15, color: 'red'
                        }} onPress={saannot}>säännöt</Text></Text>


                    </View>
                    <TouchableOpacity style={styles.loginButton} title="Luo käyttäjä" onPress={register}><Text style={styles.loginText}>Luo asiakastili</Text></TouchableOpacity>
                </View>
            </ImageBackground>
        </View >
    );
}
const styles = StyleSheet.create({
    temp: {
        marginTop: 200,
        color: 'white',
        flex: 1,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    label: {
        margin: 8,
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

    tekstilaatikko: {
        marginHorizontal: 10,
        fontSize: 15,
        color: 'white',
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
        marginTop: 30,
    },
    loginText: {
        alignSelf: 'flex-start',
        fontSize: 20,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },



})