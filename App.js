import React, { useState, useEffect, Component } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text, FlatList, Dimensions, ImageBackground, CheckBox, Alert, TouchableOpacity, LogBox, } from 'react-native';
import * as firebase from 'firebase';
import Konetallentaja from './Konetallentaja';
import Rekisteri from './Rekisteri';
import Listaakone from './Listaakone';
import LoginScreen from './LoginScreen';
import { Header } from 'react-native/Libraries/NewAppScreen';
import TextInput from 'react-native-textinput-with-icons';
import _ from 'lodash';

LogBox.ignoreAllLogs(true);

const image = { uri: "http://pa1.narvii.com/6616/3e67c90802f83263944b188b7b78c14f4b40c6bc_00.gif" };
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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


function Etusivu({ navigation }) {

    const listSeperator = () => {
        return (
            <View style={{ height: 5, width: '80%', marginLeft: '10%' }} />)
    }

    useEffect(() => {

        firebase.database().ref('tunnus/').on('value', snapshot => {
            const dataTunnus = snapshot.val();
            const prodsTunnus = Object.values(dataTunnus);
            setTunnus(prodsTunnus);
        });
    }, []);

    const [tunnus, setTunnus] = useState([]);
    const [salasana, setSalasana] = useState('');
    const [kayttajatunnus, setKayttajatunnus] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [tunnusStatus, setTunnusStatus] = useState('');
    const [salasanaStatus, setSalasanaStatus] = useState('');
    var completed = "false";

    const lisatietoja = () => {
        Alert.alert("Lisätietoa sovelluksesta", "Tällä sovelluksessa käyttäjä voi säilyttää tietoa oman tietokoneensa komponenteista ja spekseistä omalla tilillä. Käyttäjä saa myös arvosanan tietokoneestaan lista-sivulta, jolla voi leveillä ystäville :D")
    }




    const rekisterointiSivu = () => {
        navigation.navigate('Uusi asiakastili')
    }

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
                        secureTextEntry={true} activeColor="red" labelActiveColor="red" labelColor="white" leftIconColor="white" label="Salasana" onChangeText={salasana => setSalasana(salasana)}
                        value={salasana} />
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                            tintColors={{ true: 'white', false: 'black' }}
                        />
                        <Text style={styles.tekstilaatikko}>Muista minut</Text>


                    </View>
                    <TouchableOpacity style={styles.registerButton} onPress={rekisterointiSivu} ><Text style={styles.registerText}>Ei käyttäjätiliä? {" "} <Text style={styles.registerText2}>Rekisteröidy </Text></Text></TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={lisatietoja}><Text style={styles.loginText}>Lisätietoa sovelluksesta</Text></TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={{ flex: 0.0001 }}><FlatList
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    if (item.kayttajatunnus == kayttajatunnus && item.salasana == salasana && completed == "false" && isSelected == false) {
                        completed = true;
                        setKayttajatunnus('');
                        setSalasana('');
                        return (

                            navigation.navigate('Valikko')

                        )
                    } else if (item.kayttajatunnus == kayttajatunnus && item.salasana == salasana && completed == "false" && isSelected != false) {
                        completed = true;
                        return (

                            navigation.navigate('Valikko')

                        )
                    }
                }
                }
                data={tunnus}
                ItemSeparatorComponent={listSeperator}
            /></View>
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
        width: 270,
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
        color: 'white',
        marginTop: 10,
    },
    registerText: {
        alignSelf: 'flex-start',
        fontSize: 15,
        marginLeft: 20,
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

function App() {

    return (
        <NavigationContainer>

            <Stack.Navigator screenOptions={{
                headerStatusBarHeight: 30, headerTransparent: true, headerTitleStyle: {
                    color: 'white', fontSize: 30,
                }, headerTintColor: 'white', fontSize: 30,

            }}
            >
                <Stack.Screen name="Kirjautuminen" component={Etusivu} />
                <Stack.Screen name="Valikko" component={LoginScreen} />
                <Stack.Screen name="Uusi asiakastili" component={Rekisteri} />
                <Stack.Screen name="Uusi" component={Konetallentaja} />
                <Stack.Screen name="Lista" component={Listaakone} />
            </Stack.Navigator>

        </NavigationContainer>
    );
}

export default App;