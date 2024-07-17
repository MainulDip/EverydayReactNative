import { KeyboardAvoidingView, Linking, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

const Otp = () => {

  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;

  
  function openLink(): void {
    Linking.openURL("https://websolverpro.com");
  }

  return (
    <KeyboardAvoidingView>
      <Text>Otp</Text>
    </KeyboardAvoidingView>
  )
}

export default Otp

const styles = StyleSheet.create({});