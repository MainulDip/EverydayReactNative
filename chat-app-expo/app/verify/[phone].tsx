import { View, Text, StyleSheet, Platform, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useGlobalSearchParams, useLocalSearchParams, useSegments } from 'expo-router'
import Colors from '@/constants/Colors';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSignUp, useSignIn } from '@clerk/clerk-expo';


const CELL_COUNT = 6;


const Page = () => {
    const { phone, signin, signup } = useLocalSearchParams<{ phone: string, signin: string, signup: string }>();
    const localSearchParam = useLocalSearchParams();
    const globalSearchParam = useGlobalSearchParams();
    const [code, setCode] = useState("");
    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });
    const { isLoaded, signUp, setActive } = useSignUp();
    const { signIn: logIn, setActive: setActiveLogIn } = useSignIn();

    console.log("useSeagments", useSegments());

    useEffect(() => {
        if (code.length == 6) {
            console.log(localSearchParam)
            console.log(globalSearchParam);
            // TODO: Verify otp code
            if (signin === "true") {
                verifyCodeSignUp(code);
            } else if (signup === "true") {
                console.log("signup true")
                verifyCodeSignIn();
            } else {
                verifySignin();
            }
        }
    }, [code])

    const verifyCodeSignUp = async (code: string) => {
        console.log(code);
        // router.replace("(tabs)");
        try {
            const phoneNumberVericationAttempt = await signUp?.attemptPhoneNumberVerification({ code })
            console.log(`Verification is successful as phoneNumberVericationAttempt?.status = ${phoneNumberVericationAttempt?.status}`)
            if (phoneNumberVericationAttempt?.status === "complete") {
                await setActive!({ session: phoneNumberVericationAttempt.createdSessionId })

                router.replace("(tabs)");
            } else {
                console.error(JSON.stringify(phoneNumberVericationAttempt, null, 2))
            }
        } catch (error) {
            console.error(JSON.stringify(error, null, 2))
        }

    }

    const verifyCodeSignIn = async () => {
        try {
            const phoneNumberVericationAttempt = await logIn?.attemptFirstFactor({strategy: "phone_code", code});
            console.log(`Verification is successful as phoneNumberVericationAttempt?.status = ${phoneNumberVericationAttempt?.status}`)
            if (phoneNumberVericationAttempt?.status === "complete") {
                await setActive!({ session: phoneNumberVericationAttempt.createdSessionId })

                router.replace("(tabs)");
            } else {
                console.error(JSON.stringify(phoneNumberVericationAttempt, null, 2))
            }
        } catch (error) {
            console.error(JSON.stringify(error, null, 2))
        }
    }

    const verifySignin = async () => { }

    const resendCode = async () => { }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerTitle: phone }} />
            <Text>An OTP message has been sent to {phone}, Please verify your identity</Text>
            <CodeField
                InputComponent={TextInput}
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={code}
                autoFocus
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete={Platform.OS === "android" ? "sms-otp" : "one-time-code"}
                // autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                testID="my-code-input"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cellRoot, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
            <Text style={{ marginTop: 20 }}>Didn't get the OTP?</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.background,
        gap: 20,
    },
    legal: {
        fontSize: 14,
        textAlign: 'center',
        color: '#000',
    },
    button: {
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.primary,
        fontSize: 18,
    },
    codeFieldRoot: {
        marginTop: 20,
        width: 260,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 4,
    },
    cellRoot: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    cellText: {
        color: '#000',
        fontSize: 36,
        textAlign: 'center',
    },
    focusCell: {
        paddingBottom: 4,
        borderBottomColor: '#000',
        borderBottomWidth: 2,
    },
});

export default Page