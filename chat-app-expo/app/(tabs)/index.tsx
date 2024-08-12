import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert, Pressable, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { Entypo } from '@expo/vector-icons'
import ContextMenu from 'react-native-context-menu-view'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import { useClerk } from '@clerk/clerk-expo'

const Page = () => {
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
    <SafeAreaView>
      <Stack.Screen options={{
        headerTitle: "Chats",
        headerRight: () => (
          // <ContextMenu style={{}}
          //   actions={[{ title: "Title 1" }, { title: "Title 2" }]}
          //   onPress={(e) => {
          //     console.log("Hi")
          //     console.warn(
          //       `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`
          //     );
          //   }}
          //   title={'Dropdown Menu'}
          //   dropdownMenuMode={true}
          // >
          //   {/* <Text>Bismillah</Text> */}
          //   <View style={styles.settingContainer}>
          //     {/* <View style={{ height: 20 }} /> */}
          //     <Text>Bismillah</Text>
          //     {/* <View style={{ height: 20 }} /> */}
          //   </View>

          // </ContextMenu>


          // <View style={styles.settingContainer}>
          //   <TouchableOpacity>
          //     <Entypo name="dots-three-vertical" size={24} color="black" />
          //     {/* Context Menu or React Native Popup Menu */}
          //   </TouchableOpacity>
          //   <View style={styles.settingsView}>
          //     <TouchableOpacity>
          //       <Text>LogOut</Text>
          //     </TouchableOpacity>
          //   </View>
          // </View>

          // <Menu>
          //   <MenuTrigger text='Select action' />
          //   <MenuOptions>
          //     <MenuOption onSelect={() => alert(`Save`)} text='Save' />
          //     <MenuOption onSelect={() => alert(`Delete`)} >
          //       <Text style={{ color: 'red' }}>Delete</Text>
          //     </MenuOption>
          //     <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
          //   </MenuOptions>
          // </Menu>

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
      }} />
      <Text>Page</Text>
    </SafeAreaView>
  )
}

// const styles = StyleSheet.create({
//   settingContainer: {
//     position: "relative",
//     elevation: 4
//   },
//   settingsView: {
//     position: "absolute",
//     bottom: -40,
//     right: 0,
//     elevation: 4
//   }
// })

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


export default Page