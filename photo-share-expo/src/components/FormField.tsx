import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';

type FormFieldType = {
  title: string;
  value: string;
  handleChangeText: (e: string) => void;
  otherStyles: string;
  keyboardType?: string;
  placeholder?: string;
}

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }: FormFieldType) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-white font-psemibold'>{title}</Text>
      <View className='w-full h-16 px-4 mb-2 bg-black-200 focus:border-secondary flex-row items-center border border-red-500'>

        <TextInput className="flex-1 text-white font-psemibold"
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              className="w-6 h-6"
              resizeMode="contain"
              source={!showPassword ? icons.eye : icons.eyeHide}
            />
          </TouchableOpacity>
        )}

      </View>
    </View>
  )
}

export default FormField