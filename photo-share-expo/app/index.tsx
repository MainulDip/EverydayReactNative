import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function App () {
  return (
    <View style={styles.container}>
      <Text>App</Text>
      <StatusBar style="auto" />
      <Link href="/profile" style={{color: "blue"}}>
        Profile
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});