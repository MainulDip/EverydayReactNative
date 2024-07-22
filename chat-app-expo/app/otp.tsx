import { KeyboardAvoidingView, Linking, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

const Otp = () => {

  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;

  
  function openLink(): void {
    Linking.openURL("https://websolverpro.com");
  }

  const sentOtp = async () => {

  }

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>

      </View>
      <Text style={styles.description}>Otp</Text>
    </KeyboardAvoidingView>
  )
}

export default Otp

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20
  },
  description: {

  },
  list: {
     
  }
});