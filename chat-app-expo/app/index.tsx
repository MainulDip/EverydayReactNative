import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { Link, useSegments } from 'expo-router';
import { Images } from '@/constants';

const welcome_image = Image.resolveAssetSource(Images.welcome_img).uri

const Page = () => {

    function openLink(): void {
        Linking.openURL("https://websolverpro.com");
    }

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Image source={{ uri: welcome_image }} style={styles.welcome} resizeMode="cover" />
                    <Text style={styles.headline}>Welcome to Chat App</Text>
                    <Text style={styles.description}>
                        Read our <Text style={styles.link} onPress={openLink}>Privacy Policy</Text>
                    </Text>
                    <Text>And Tap Agree to accept the <Text style={styles.link} onPress={openLink}>Terms of service</Text></Text>
                    <Link href="/otp" asChild replace>
                        <TouchableOpacity>
                            <Text style={styles.buttonText}>Agree and Continue</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href="/signin" asChild replace>
                        <TouchableOpacity>
                            <Text style={styles.buttonText}>Has Account? Sign In</Text>
                        </TouchableOpacity>
                    </Link>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: "#fff",
        minHeight: "100%"
    },
    container: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginBottom: 80
    },
    welcome: {
        width: "100%",
        height: 300
    },
    headline: {
        marginVertical: 20,
        fontSize: 24,
        fontWeight: "bold"
    },
    description: {

    },
    link: {
        color: Colors.primary,
        fontWeight: "bold"
    },
    buttonText: {
        marginTop: 40,
        fontSize: 22,
        color: Colors.primary,
        fontWeight: "bold"
    }
});

export default Page;