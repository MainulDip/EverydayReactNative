import { useState } from 'react'
import { View, ScrollView, SafeAreaView, Text } from 'react-native'
import { Stack, useRouter } from 'expo-router'; 
import { COLORS, icons, images, SIZES } from '../constants'
import { NearbyJobCard, Popularjobs as PopularJobs, ScreenHeaderBtn, Welcome } from '../components'

const Home = () => {

    const router = useRouter();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>

            {/* Action Bar Starts */}

            <Stack.Screen options={{
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerLeft: (): React.ReactNode => (
                    <ScreenHeaderBtn iconUrl={icons.menu} dimension={"60%"} handlePress={undefined} />
                ),
                headerRight: (): React.ReactNode => (
                    <ScreenHeaderBtn iconUrl={icons.menu} dimension={"100%"} handlePress={undefined} />
                ),
                headerTitleAlign: 'center'
            }}/> 

            {/* Action Bar End */}

            
            {/* ScrollView Starts */}

            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{flex: 1, padding: SIZES.medium}}>
                    <Welcome />
                    <PopularJobs />
                    <NearbyJobCard />
                </View>
            </ScrollView>


        </SafeAreaView>
    );
}

export default Home;  