import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';

// type FormFieldType = {
//     title: string;
//     value: string;
//     handleChangeText?: (e: string) => void;
//     otherStyles: string;
//     keyboardType?: string;
//     placeholder?: string;
// }

// { title, value, placeholder, handleChangeText, otherStyles, ...props }: FormFieldType

const SearchInput = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [searchText, setSearchText] = useState("")

    return (
        <View className={`space-y-2 mt-4`}>
            {/* <Text className='text-white font-psemibold'>{title}</Text> */}
            <View className='w-full h-16 px-4 mb-2 bg-black-200 focus:border-secondary flex-row items-center border border-red-500'>

                <TextInput className="flex-1 text-white font-psemibold"
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholderTextColor="#7b7b8b"
                    placeholder="Search for video topics"
                />

                <TouchableOpacity
                    // onPress={() => setShowPassword(!showPassword)}
                >
                    <Image
                        className="w-5 h-5"
                        resizeMode="contain"
                        source={icons.search}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchInput;

