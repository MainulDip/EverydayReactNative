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
    fontSize: 14,
    color: Colors.gray,
  },
  legal: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: '#fff',
  },
  buttonText: {
    color: Colors.gray,
    fontSize: 22,
    fontWeight: '500',
  },
  list: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 18,
    color: Colors.primary,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.gray,
    opacity: 0.2,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },

  loading: {
    zIndex: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});