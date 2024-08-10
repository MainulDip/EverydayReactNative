import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { Entypo } from '@expo/vector-icons'
import ContextMenu from 'react-native-context-menu-view'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'

const Page = () => {
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

          <Menu>
            <MenuTrigger text='Select action' />
            <MenuOptions>
              <MenuOption onSelect={() => alert(`Save`)} text='Save' />
              <MenuOption onSelect={() => alert(`Delete`)} >
                <Text style={{ color: 'red' }}>Delete</Text>
              </MenuOption>
              <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
            </MenuOptions>
          </Menu>

        )
      }} />
      <Text>Page</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  settingContainer: {
    position: "relative",
    elevation: 4
  },
  settingsView: {
    position: "absolute",
    bottom: -40,
    right: 0,
    elevation: 4
  }
})

export default Page