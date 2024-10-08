import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert, Pressable, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { Entypo } from '@expo/vector-icons'
import { useClerk } from '@clerk/clerk-expo'

const OptionsMenu = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { signOut } = useClerk();


    const logOut = async () => {
        try {
            await signOut();
            console.log("User Is Signed Out")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={{}}>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { // will be called upon pressing  hardware back button
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <TouchableWithoutFeedback style={{}} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View>
                    <View style={{
                        width: "40%",
                        backgroundColor: "#000",
                        marginLeft: "auto",
                        padding: 10,
                        marginTop: 60
                    }}>
                        <TouchableOpacity onPress={() => {
                            logOut();
                            setModalVisible(false);
                        }}><Text style={{ color: "white" }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Entypo name="dots-three-vertical" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        position: "relative"
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(201, 33, 33, 0)'
    },
    modalView: {
        // flex: 1,
        // margin: 20,
        // backgroundColor: 'white',
        // borderRadius: 20,
        // padding: 35,
        // alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export { OptionsMenu }