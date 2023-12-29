import { useState } from 'react'
import { View, ScrollView, SafeAreaView, Text } from 'react-native'
import { Stack, useRouter } from 'expo-router'; 
import { COLORS, icons, images, SIZES } from '../constants'
import { NearbyJobCard, Popularjobs, ScreenHeaderBtn, Welcome } from '../components'

const Home = () => {

    const router = useRouter();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            {/* <Text>Home Landing</Text> */}
            <Stack.Screen options={{
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false
            }}/>
        </SafeAreaView>
    );
}

export default Home;  