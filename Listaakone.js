import * as firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, Image, TextInput, FlatList, ScrollView, Dimensions, ImageBackground, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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




export default function Listaakone() {

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

    const [haku, setHaku] = useState('');

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
    const [maara, setMaara] = useState('');
    const [nimi, setNimi] = useState('');
    const image = { uri: "https://cdn.dribbble.com/users/370759/screenshots/1796042/untitled-1.gif" };

    var yhteensa = naytonohjainHinta + prosessoriHinta + emolevyHinta + muistiHinta + kovalevyHinta;
    var i = 0;

    const listSeperator = () => {
        return (
            <View style={{ height: 5, width: '80%', marginLeft: '10%' }} />)
    }

    const arvostelu = () => {
        if (yhteensa > 3000) {
            return (Alert.alert("Tietokoneesi arvosana on A!!", "Onneksi olkoon tietokoneesi sai parhaan mahdollisen arvosanan! Nyt voit leveillä kaikille ihmisille!"))
        } else if (yhteensa > 2000) {
            return (Alert.alert("Tietokoneesi arvosana on B!", "Wow tietokoneesi sai todella korkean arvosanan! Voit pelata varmasti kaikkia uusia pelejä tällä megakoneella!"))
        } else if (yhteensa > 1000) {
            return (Alert.alert("Tietokoneesi arvosana on C!", "Tietokoneesi sai keskivertoisen arvosanan. Voit pelata uusia pelejä matalilla asetuksilla."))
        } else if (yhteensa > 700) {
            return (Alert.alert("Tietokoneesi arvosana on D!", "Tietokoneesi sai huonon arvosanan... Voit ehkä juuri pyörittää youtubea tällä romulla, olisiko aika päivittää.."))
        } else if (yhteensa < 700) {
            return (Alert.alert("Tietokoneesi arvosana on F!", "Tietokoneesi sai huonoimman arvosanan! Ole iloinen jos tietokoneessasi pyörii Windows Vista"))
        }

    }


    return (
        <View style={styles.container}><ScrollView>
            <ImageBackground source={image} style={{
                flex: 1,
                resizeMode: "cover",
                width: Dimensions.get('window').width,
                justifyContent: "center"
            }}>

                <Text></Text>
                <View style={styles.top}>
                    <Text style={styles.otsikko}> Listasivu</Text>
                    <Text style={styles.teksti2}>Valitse alta listalta tietokoneesi. Nykyinen tietokone: {" "}<Text style={styles.highlight}>{nimi}</Text></Text>
                    <FlatList style={{ marginTop: "-10%" }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            setMaara(index)
                        }
                        }
                        data={naytonohjain}
                        ItemSeparatorComponent={listSeperator}
                    />


                    <Picker style={styles.tekstilaatikko} selectedValue={haku} onValueChange={(haku) => setHaku(haku)}>
                        <Picker.Item label="<<Kone 1>>" value="0" />
                        <Picker.Item label="<<Kone 2>>" value="1" />
                        <Picker.Item label="<<Kone 3>>" value="2" />
                        <Picker.Item label="<<Kone 4>>" value="3" />
                        <Picker.Item label="<<Kone 5>>" value="2" />
                        <Picker.Item label="<<Kone 6>>" value="3" />
                    </Picker>

                </View>
                <Text style={styles.teksti}>Näytönohjain</Text>
                <View style={styles.middle}>

                    <FlatList keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            if (index == haku && item.naytonohjainMerkki == 'NVIDIA') {
                                setNaytonohjainHinta(parseInt(item.naytonohjainHinta))
                                setNimi(item.koneNimiGPU)
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/nvidia.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.naytonohjainNimi}{"\n"}Hinta: {item.naytonohjainHinta}€</Text>
                                </View>
                            } else if (index == haku && item.naytonohjainMerkki == 'AMD') {
                                setNaytonohjainHinta(parseInt(item.naytonohjainHinta))
                                setNimi(item.koneNimiGPU)
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/amd.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.naytonohjainNimi}{"\n"}Hinta: {item.naytonohjainHinta}€</Text>
                                </View>
                            } else if (index == haku && item.naytonohjainMerkki == 'Muu') {
                                setNaytonohjainHinta(parseInt(item.naytonohjainHinta))
                                setNimi(item.koneNimiGPU)
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/muu.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.naytonohjainNimi}{"\n"}Hinta: {item.naytonohjainHinta}€</Text>
                                </View>
                            }
                        }
                        }
                        data={naytonohjain}
                        ItemSeparatorComponent={listSeperator}
                    /></View>
                <Text style={styles.teksti}>Prosessori</Text>
                <View style={styles.middle}>

                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            if (index == haku && item.prosessoriMerkki == 'AMD') {
                                setProsessoriHinta(parseInt(item.prosessoriHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/amd.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.prosessoriNimi}{"\n"}Hinta: {item.prosessoriHinta}€</Text>
                                </View>
                            }
                            else if (index == haku && item.prosessoriMerkki == 'Intel') {
                                setProsessoriHinta(parseInt(item.prosessoriHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.pienikuva} source={require('./assets/intel.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.prosessoriNimi}{"\n"}Hinta: {item.prosessoriHinta}€</Text>
                                </View>
                            }
                            else if (index == haku && item.prosessoriMerkki == 'Muu') {
                                setProsessoriHinta(parseInt(item.prosessoriHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/muu.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.prosessoriNimi}{"\n"}Hinta: {item.prosessoriHinta}€</Text>
                                </View>
                            }
                        }}
                        data={prosessori}
                        ItemSeparatorComponent={listSeperator}
                    />
                </View>
                <Text style={styles.teksti}>Emolevy</Text>
                <View style={styles.middle}>

                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            if (index == haku && item.emolevyMerkki == 'ASRock') {
                                setEmolevyHinta(parseInt(item.emolevyHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/asrock.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.emolevyNimi}{"\n"}Hinta: {item.emolevyHinta}€</Text>
                                </View>
                            }
                            else if (index == haku && item.emolevyMerkki == 'Asus') {
                                setEmolevyHinta(parseInt(item.emolevyHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/asus.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.emolevyNimi}{"\n"}Hinta: {item.emolevyHinta}€</Text>
                                </View>
                            }
                            else if (index == haku && item.emolevyMerkki == 'Gigabyte') {
                                setEmolevyHinta(parseInt(item.emolevyHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/gigabyte.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.emolevyNimi}{"\n"}Hinta: {item.emolevyHinta}€</Text>
                                </View>
                            }
                            else if (index == haku && item.emolevyMerkki == 'MSI') {
                                setEmolevyHinta(parseInt(item.emolevyHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/msi.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.emolevyNimi}{"\n"}Hinta: {item.emolevyHinta}€</Text>
                                </View>
                            }
                            else if (index == haku && item.emolevyMerkki == 'Intel') {
                                setEmolevyHinta(parseInt(item.emolevyHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/intel.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.emolevyNimi}{"\n"}Hinta: {item.emolevyHinta}€</Text>

                                </View>
                            }
                            else if (index == haku && item.emolevyMerkki == 'Muu') {
                                setEmolevyHinta(parseInt(item.emolevyHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/muu.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.emolevyNimi}{"\n"}Hinta: {item.emolevyHinta}€</Text>
                                </View>
                            }
                        }}
                        data={emolevy}
                        ItemSeparatorComponent={listSeperator}
                    />
                </View>
                <Text style={styles.teksti}>Muisti</Text>
                <View style={styles.middle}>

                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            if (index == haku && item.muistiMerkki == 'Muu') {
                                setMuistiHinta(parseInt(item.muistiHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/muu.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.muistiNimi}{"\n"}Hinta: {item.muistiHinta}€</Text>
                                </View>
                            }
                            else if (index == haku && item.muistiMerkki == 'Corsair') {
                                setMuistiHinta(parseInt(item.muistiHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/corsair.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.muistiNimi}{"\n"}Hinta: {item.muistiHinta}€</Text>
                                </View>
                            }
                            else if (index == haku && item.muistiMerkki == 'Kingston') {
                                setMuistiHinta(parseInt(item.muistiHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/kingston.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.muistiNimi}{"\n"}Hinta: {item.muistiHinta}€</Text>
                                </View>
                            }
                            else if (index == haku && item.muistiMerkki == 'Samsung') {
                                setMuistiHinta(parseInt(item.muistiHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.keskikuva} source={require('./assets/samsung.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.muistiNimi}{"\n"}Hinta: {item.muistiHinta}€</Text>
                                </View>
                            }

                        }}
                        data={muisti}
                        ItemSeparatorComponent={listSeperator}
                    />
                </View>
                <Text style={styles.teksti}>Kovalevy</Text>
                <View style={styles.bottom}>

                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            if (index == haku && item.kovalevyMerkki == 'Muu') {
                                setKovalevyHinta(parseInt(item.kovalevyHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/muu.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.kovalevyNimi}{"\n"}Hinta: {item.kovalevyHinta}€</Text>
                                </View>
                            }
                            else if (index == haku && item.kovalevyMerkki == 'Seagate') {
                                setKovalevyHinta(parseInt(item.kovalevyHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/seagate.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.kovalevyNimi}{"\n"}Hinta: {item.kovalevyHinta}€</Text>
                                </View>
                            }
                            else if (index == haku && item.kovalevyMerkki == 'Kingston') {
                                setKovalevyHinta(parseInt(item.kovalevyHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/kingston.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.kovalevyNimi}{"\n"}Hinta: {item.kovalevyHinta}€</Text>
                                </View>
                            }
                            else if (index == haku && item.kovalevyMerkki == 'Samsung') {
                                setKovalevyHinta(parseInt(item.kovalevyHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.pienikuva} source={require('./assets/samsung.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.kovalevyNimi}{"\n"}Hinta: {item.kovalevyHinta}€</Text>
                                </View>
                            }
                            else if (index == haku && item.kovalevyMerkki == 'Intel') {
                                setKovalevyHinta(parseInt(item.kovalevyHinta))
                                return <View style={styles.listContainer}>
                                    <Image style={styles.kuva} source={require('./assets/intel.png')} />
                                    <Text style={{ fontSize: 16 }}>{item.kovalevyNimi}{"\n"}Hinta: {item.kovalevyHinta}€</Text>
                                </View>
                            }

                        }}
                        data={kovalevy}
                        ItemSeparatorComponent={listSeperator}
                    />
                </View ><Text style={styles.teksti}>Hinta yhteensä: {yhteensa} €</Text>
                <Text style={styles.teksti} onPress={arvostelu}>Paina tästä saadaksesi tietokoneesi arvosanan!</Text>
            </ImageBackground>
        </ScrollView>

        </View>
    );
}
const styles = StyleSheet.create({
    highlight: {
        color: 'red',
    },
    otsikko: {
        fontSize: 20,
        fontWeight: "bold",
        flex: 1,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    top: {
        flex: 0.3,
        borderWidth: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        height: 90,
        marginTop: 55,
        marginHorizontal: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    middle: {
        flex: 0.3,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        height: 100,
        marginHorizontal: 15,
        borderWidth: 5,
    },
    bottom: {
        flex: 0.3,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        height: 100,
        marginHorizontal: 15,
        borderWidth: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {

        marginHorizontal: 20,
    },
    tekstilaatikko: {
        flex: 0.7,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        justifyContent: 'center',
        width: 200,
        fontSize: 15,
        color: 'green',

    },
    teksti: {
        marginLeft: 20,
        color: 'white',
    },
    teksti2: {
        marginLeft: 20,
        color: 'red',
    },
    teksti2: {
        marginLeft: 8,
        color: 'black',
    },
    listContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0)',

        alignItems: 'center',

    },
    pienikuva: {
        width: 80,
        height: 50,
    },
    keskikuva: {
        width: 120,
        height: 50,
    },

    kuva: {
        width: 160,
        height: 40,
    }

})