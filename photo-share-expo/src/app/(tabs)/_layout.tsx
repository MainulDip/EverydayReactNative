import { View, Image, ImageSourcePropType } from 'react-native'
// import {Image, ImageSourcePropType} from ''
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import icons from '../../constants/icons'


const TabIcon = ({ icon, color, name, focused }: { icon: ImageSourcePropType, color: string, name: string, focused: boolean }) => {
  return (
    <View>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className='w-6 h-6'
      />
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarLabelPosition: "below-icon",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name='home'
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout