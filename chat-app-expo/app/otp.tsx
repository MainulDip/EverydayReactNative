import { ActivityIndicator, Alert, KeyboardAvoidingView, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import MaskInput from 'react-native-mask-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';

const Page = () => {

  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;

  const { bottom } = useSafeAreaInsets();
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();


  function openLink(): void {
    Linking.openURL("https://websolverpro.com");
  }

  const sendOTP = async () => {
    setLoading(true);
    console.log(phoneNumber);
    // setTimeout(() => {
    //   setLoading(false);
    //   router.push(`/verify/${phoneNumber}`);
    // }, 1400);

    try {
      await signUp?.create({ phoneNumber })
      await signUp?.preparePhoneNumberVerification();
      router.push(`/verify/${phoneNumber}?signin=true`);
    } catch (error) {
      console.log(error)
      if (isClerkAPIResponseError(error)) {
        if (error.errors[0].code === "form_identifier_exits") {
          console.log("user exists")
          await trySignIn();
        } else {
          setLoading(false);
          Alert.alert("Error", "User already exists")
        }
      }
    }
  }

  const trySignIn = async () => { }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ flexGrow: 1 }}
      behavior="padding">

      {/* ################### Loading View ####################### */}
      {loading && (
        <View style={[StyleSheet.absoluteFill, styles.loading]}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={{ fontSize: 18, padding: 10 }}>Updating...</Text>
        </View>
      )}

      {/* ################ Container #################333 */}
      <View style={styles.container}>
        <Text style={styles.description}>
          WhatsApp will need to verify your account. Carrier charges may apply.
        </Text>

        <View style={styles.listItem}>
          <Text style={styles.listItemText}>Germany</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
        </View>

        <View style={styles.separator} />

        <MaskInput
          value={phoneNumber}
          keyboardType="phone-pad"
          autoFocus
          placeholder="+12 your phone number"
          onChangeText={(masked, unmasked) => {
            setPhoneNumber(masked);
          }}
          mask={GER_PHONE}
          style={styles.input} />
        <View style={styles.separator} />


        <Text style={styles.legal}>
          You must be{' '}
          <Text style={styles.link} onPress={openLink}>
            at least 16 years old
          </Text>{' '}
          to register. Learn how WhatsApp works with the{' '}
          <Text style={styles.link} onPress={openLink}>
            Meta Companies
          </Text>
          .
        </Text>

        <View style={{ flexGrow: 1 }} />

        <TouchableOpacity
          style={[styles.button, phoneNumber !== '' ? styles.enabled : null, { marginBottom: 20 }]}
          onPress={sendOTP}>
          <Text style={[styles.buttonText, phoneNumber !== '' ? styles.enabled : null]}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
    flexGrow: 1
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


const GER_PHONE = [
  `+`,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];