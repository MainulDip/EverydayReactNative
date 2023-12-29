## React Native:
Personalized Instruction With Jumpstart Docs for React Native using both React-Native-CLI and Expo

### Components:
> Core Components:

All the core components are [here](https://reactnative.dev/docs/components-and-apis). Most common Core Components:

| React Native UI Component | Android View   | iOS View         | Web Analog               | Description                                                                                           |
| ------------------------- | -------------- | ---------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `<View>`                  | `<ViewGroup>`  | `<UIView>`       | A non-scrollling `<div>` | A container that supports layout with flexbox, style, some touch handling, and accessibility controls |
| `<Text>`                  | `<TextView>`   | `<UITextView>`   | `<p>`                    | Displays, styles, and nests strings of text and even handles touch events                             |
| `<Image>`                 | `<ImageView>`  | `<UIImageView>`  | `<img>`                  | Displays different types of images                                                                    |
| `<ScrollView>`            | `<ScrollView>` | `<UIScrollView>` | `<div>`                  | A generic scrolling container that can contain multiple components and views                          |
| `<TextInput>`             | `<EditText>`   | `<UITextField>`  | `<input type="text">`    | Allows the user to enter text                                                                         |

> FlatList:
```js
<FlatList
    data={items}
    renderItem={ ({item})=> <Text>{item}<Text/> }
    keyExtractor={item => item.id} 
    extraData={stateGetter} />
    // extraData for re-render if that state change
```

> TouchableOpacity: props => activeOpacity={.9}

### Linking | Unlinking External Libraries: link both Android/iOS native module with react native
> npx react-native link | npx react-native unlink libraryname

### Building APK:
> Production Build Docs: https://reactnative.dev/docs/signed-apk-android

Then Run
```bash
cd android/app

# then run
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Gradle Command
```bash
# From Android Directory
./gradlew clean
# Generate APK File/s
./gradlew assembleRelease
# Bundling For Google Playstore with aab extension
./gradlew bundleRelease
```

Final Testing Using React Native:
```bash
npx react-native run-android --variant=release
```



### Initialize Expo Project:
`npx create-expo-app@latest -e with-router ./`