import * as firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Button, StyleSheet, View, Text, Image, TextInput, FlatList, ScrollView, Alert, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';

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

export default function Etusivu() {

    useEffect(() => {
        firebase.database().ref('naytonohjain/').on('value', snapshot => {
            const dataGPU = snapshot.val();
            const prodsGPU = Object.values(dataGPU);
            setNaytonohjain(prodsGPU);
        })
        firebase.database().ref('prosessori/').on('value', snapshot => {
            const dataCPU = snapshot.val();
            const prodsCPU = Object.values(dataCPU);
            setProsessori(prodsCPU);
        })
        firebase.database().ref('emolevy/').on('value', snapshot => {
            const dataMOBO = snapshot.val();
            const prodsMOBO = Object.values(dataMOBO);
            setEmolevy(prodsMOBO);
        })
        firebase.database().ref('muisti/').on('value', snapshot => {
            const dataRAM = snapshot.val();
            const prodsRAM = Object.values(dataRAM);
            setMuisti(prodsRAM);
        })
        firebase.database().ref('kovalevy/').on('value', snapshot => {
            const dataHDD = snapshot.val();
            const prodsHDD = Object.values(dataHDD);
            setKovalevy(prodsHDD);
        });
    }, []);

    const saveItem = () => {
        konevaihto;

        if (koneNimiGPU == '' || koneNimiCPU == '' || koneNimiMOBO == '' || koneNimiRAM == '' || koneNimiHDD == '' || naytonohjainNimi == '' || naytonohjainHinta == '' || naytonohjainMerkki == '' || prosessoriNimi == '' || prosessoriHinta == '' || prosessoriMerkki == '' || emolevyNimi == '' || emolevyHinta == '' || emolevyMerkki == '' || muistiNimi == '' || muistiHinta == '' || muistiMerkki == '' || kovalevyNimi == '' || kovalevyHinta == '' || kovalevyMerkki == '') {
            Alert.alert('Joku taulukko on tyhjä')
        } else {
            Alert.alert('Tallennus onnistui! Näet tietokoneesi lista sivulta')
            firebase.database().ref('naytonohjain/').push({ 'koneNimiGPU': koneNimiGPU, 'naytonohjainNimi': naytonohjainNimi, 'naytonohjainHinta': naytonohjainHinta, 'naytonohjainMerkki': naytonohjainMerkki })
            firebase.database().ref('prosessori/').push({ 'koneNimiCPU': koneNimiGPU, 'prosessoriNimi': prosessoriNimi, 'prosessoriHinta': prosessoriHinta, 'prosessoriMerkki': prosessoriMerkki })
            firebase.database().ref('emolevy/').push({ 'koneNimiMOBO': koneNimiGPU, 'emolevyNimi': emolevyNimi, 'emolevyHinta': emolevyHinta, 'emolevyMerkki': emolevyMerkki })
            firebase.database().ref('muisti/').push({ 'koneNimiRAM': koneNimiGPU, 'muistiNimi': muistiNimi, 'muistiHinta': muistiHinta, 'muistiMerkki': muistiMerkki })
            firebase.database().ref('kovalevy/').push({ 'koneNimiHDD': koneNimiGPU, 'kovalevyNimi': kovalevyNimi, 'kovalevyHinta': kovalevyHinta, 'kovalevyMerkki': kovalevyMerkki })
        }
    }

    const [naytonohjain, setNaytonohjain] = useState([]);
    const [koneNimiGPU, setkoneNimiGPU] = useState('');
    const [naytonohjainNimi, setNaytonohjainNimi] = useState('');
    const [naytonohjainHinta, setNaytonohjainHinta] = useState('');
    const [naytonohjainMerkki, setNaytonohjainMerkki] = useState('Merkki');
    const [prosessori, setProsessori] = useState([]);
    const [koneNimiCPU, setkoneNimiCPU] = useState('');
    const [prosessoriNimi, setProsessoriNimi] = useState('');
    const [prosessoriHinta, setProsessoriHinta] = useState('');
    const [prosessoriMerkki, setProsessoriMerkki] = useState('');
    const [emolevy, setEmolevy] = useState([]);
    const [koneNimiMOBO, setkoneNimiMOBO] = useState('');
    const [emolevyNimi, setEmolevyNimi] = useState('');
    const [emolevyHinta, setEmolevyHinta] = useState('');
    const [emolevyMerkki, setEmolevyMerkki] = useState('');
    const [muisti, setMuisti] = useState([]);
    const [koneNimiRAM, setkoneNimiRAM] = useState('');
    const [muistiNimi, setMuistiNimi] = useState('');
    const [muistiHinta, setMuistiHinta] = useState('');
    const [muistiMerkki, setMuistiMerkki] = useState('');
    const [kovalevy, setKovalevy] = useState([]);
    const [koneNimiHDD, setkoneNimiHDD] = useState('');
    const [kovalevyNimi, setKovalevyNimi] = useState('');
    const [kovalevyHinta, setKovalevyHinta] = useState('');
    const [kovalevyMerkki, setKovalevyMerkki] = useState('');
    const [koneNimi, setkoneNimi] = useState('');
    const [testiNimi, setTestiNimi] = useState('');
    const image = { uri: "https://cdn.dribbble.com/users/370759/screenshots/1796042/untitled-1.gif" };
    const listSeperator = () => {
        return (
            <View style={{ height: 5, width: '80%', backgroundColor: '#fff', marginLeft: '10%' }} />)
    }

    const konevaihto = () => {
        setkoneNimiGPU(koneNimi);
        setkoneNimiCPU(koneNimi);
        setkoneNimiMOBO(koneNimi);
        setkoneNimiRAM(koneNimi);
        setkoneNimiHDD(koneNimi);
    }



    return (

        <View style={styles.container}>

            <ImageBackground source={image} style={{
                flex: 1,
                resizeMode: "cover",
                width: Dimensions.get('window').width,
                justifyContent: "center"
            }}>
                <ScrollView>
                    <View>
                        <TextInput style={{ fontSize: 20, marginTop: 100, alignSelf: 'center' }} placeholderTextColor='gray'
                            placeholder='<<Tietokoneesi nimi>>' onChangeText={koneNimi => setkoneNimi(koneNimi)}
                            value={koneNimi} />
                    </View>

                    <View style={styles.mid}>
                        <Text style={styles.otsikko}>Näytönohjain</Text>
                        <TextInput style={styles.tekstilaatikko} placeholderTextColor='gray'
                            placeholder='Nimi' onChangeText={naytonohjainNimi => setNaytonohjainNimi(naytonohjainNimi)}
                            value={naytonohjainNimi} />
                        <TextInput style={styles.tekstilaatikko} placeholderTextColor='gray'
                            placeholder='Hinta' keyboardType="numeric" onChangeText={naytonohjainHinta => setNaytonohjainHinta(naytonohjainHinta)}
                            value={naytonohjainHinta} />
                        <Picker selectedValue={naytonohjainMerkki} style={styles.listaotsikko} dropdownIconColor="white" onValueChange={(naytonohjainMerkki) => setNaytonohjainMerkki(naytonohjainMerkki)}>
                            <Picker.Item label="NVIDIA" value="NVIDIA" key="NVIDIA" />
                            <Picker.Item label="AMD" value="AMD" key="AMD" />
                            <Picker.Item label="Muu" value="Muu" key="Muu" />
                        </Picker>
                    </View>
                    <View style={styles.mid}>
                        <Text style={styles.otsikko}>Prosessori</Text>
                        <TextInput style={styles.tekstilaatikko} placeholderTextColor='gray'
                            placeholder='Nimi' onChangeText={prosessoriNimi => setProsessoriNimi(prosessoriNimi)}
                            value={prosessoriNimi} />
                        <TextInput style={styles.tekstilaatikko} placeholderTextColor='gray'
                            placeholder='Hinta' keyboardType="numeric" onChangeText={prosessoriHinta => setProsessoriHinta(prosessoriHinta)}
                            value={prosessoriHinta} />
                        <Picker selectedValue={prosessoriMerkki} style={styles.listaotsikko} dropdownIconColor="white" placeholderTextColor='gray' onValueChange={(prosessoriMerkki) => setProsessoriMerkki(prosessoriMerkki)}>
                            <Picker.Item label="Intel" value="Intel" key="Intel" />
                            <Picker.Item label="AMD" value="AMD" key="AMD" />
                            <Picker.Item label="Muu" value="Muu" key="Muu" />
                        </Picker>
                    </View>
                    <View style={styles.mid}>
                        <Text style={styles.otsikko} >Emolevy</Text>
                        <TextInput style={styles.tekstilaatikko} placeholderTextColor='gray'
                            placeholder='Nimi' onChangeText={emolevyNimi => setEmolevyNimi(emolevyNimi)}
                            value={emolevyNimi} />
                        <TextInput style={styles.tekstilaatikko} placeholderTextColor='gray'
                            placeholder='Hinta' keyboardType="numeric" onChangeText={emolevyHinta => setEmolevyHinta(emolevyHinta)}
                            value={emolevyHinta} />
                        <Picker selectedValue={emolevyMerkki} style={styles.listaotsikko} dropdownIconColor="white" onValueChange={(emolevyMerkki) => setEmolevyMerkki(emolevyMerkki)}>
                            <Picker.Item label="ASRock" value="ASRock" key="ASRock" />
                            <Picker.Item label="Asus" value="Asus" key="Asus" />
                            <Picker.Item label="Gigabyte" value="Gigabyte" key="Gigabyte" />
                            <Picker.Item label="MSI" value="MSI" key="MSI" />
                            <Picker.Item label="Intel" value="Intel" key="Intel" />
                            <Picker.Item label="Muu" value="Muu" key="Muu" />
                        </Picker>
                    </View>
                    <View style={styles.mid}>
                        <Text style={styles.otsikko}>Muisti(RAM)</Text>
                        <TextInput style={styles.tekstilaatikko} placeholderTextColor='gray'
                            placeholder='Nimi' onChangeText={muistiNimi => setMuistiNimi(muistiNimi)}
                            value={muistiNimi} />
                        <TextInput style={styles.tekstilaatikko} placeholderTextColor='gray'
                            placeholder='Hinta' keyboardType="numeric" onChangeText={muistiHinta => setMuistiHinta(muistiHinta)}
                            value={muistiHinta} />
                        <Picker selectedValue={muistiMerkki} style={styles.listaotsikko} dropdownIconColor="white" onValueChange={(muistiMerkki) => setMuistiMerkki(muistiMerkki)}>
                            <Picker.Item label="Corsair" value="Corsair" key="Corsair" />
                            <Picker.Item label="Kingston" value="Kingston" key="Kingston" />
                            <Picker.Item label="Samsung" value="Samsung" key="Samsung" />
                            <Picker.Item label="Muu" value="Muu" key="Muu" />
                        </Picker>
                    </View>
                    <View style={styles.mid}>
                        <Text style={styles.otsikko}>Kovalevy</Text>
                        <TextInput style={styles.tekstilaatikko} placeholderTextColor='gray'
                            placeholder='Nimi' onChangeText={kovalevyNimi => setKovalevyNimi(kovalevyNimi)}
                            value={kovalevyNimi} />
                        <TextInput style={styles.tekstilaatikko} placeholderTextColor='gray'
                            placeholder='Hinta' onChangeText={kovalevyHinta => setKovalevyHinta(kovalevyHinta)}
                            value={kovalevyHinta} keyboardType="numeric" />
                        <Picker selectedValue={kovalevyMerkki} dropdownIconColor="white" style={styles.listaotsikko} onValueChange={(kovalevyMerkki) => setKovalevyMerkki(kovalevyMerkki)}>
                            <Picker.Item label="Intel" value="Intel" key="Intel" />
                            <Picker.Item label="Kingston" value="Kingston" key="Kingston" />
                            <Picker.Item label="Seagate" value="Seagate" key="Seagate" />
                            <Picker.Item label="Samsung" value="Samsung" key="Samsung" />
                            <Picker.Item label="Muu" value="Muu" key="Muu" />
                        </Picker>
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={konevaihto, saveItem} title="Tallenna"><Text style={styles.loginText}>Tallenna</Text></TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        </View>

    );
}
const styles = StyleSheet.create({

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
        marginTop: 10,
        width: 300,
        backgroundColor: 'rgba(19, 20, 20, 0.95)',
        alignSelf: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    tekstilaatikko: {
        flex: 1,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15,
        color: 'white',
    },
    listaotsikko: {

        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: 'black',
        height: 30,
        width: 200,
        marginHorizontal: 15,
        color: 'white',
    },
    loginButton: {

        alignSelf: "center",
        backgroundColor: 'rgba(19, 20, 20, 0.95)',
        borderWidth: 1,
        marginHorizontal: 10,
        width: 110,
        color: 'white',
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
    },
    otsikko: {
        alignSelf: 'center',
        fontSize: 20,
        marginHorizontal: 15,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },


})