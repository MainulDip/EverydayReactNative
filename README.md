## React Native:
Personalized Instruction With Jumpstart Docs for React Native using both React-Native-CLI and Expo

### Components
> Core Components:

All the core components are [here](https://reactnative.dev/docs/components-and-apis). Most common Core Components:

| React Native UI Component | Android View   | iOS View         | Web Analog               | Description                                                                                           |
| ------------------------- | -------------- | ---------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `<View>`                  | `<ViewGroup>`  | `<UIView>`       | A non-scrolling `<div>` | A container that supports layout with flexbox, style, some touch handling, and accessibility controls |
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
> npx react-native link | npx react-native unlink library-name

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
# Generate the APK File/s
./gradlew assembleRelease
# Bundling For Google PlayStore with aab extension
./gradlew bundleRelease
```

Final Testing Using React Native:
```bash
npx react-native run-android --variant=release
```



### Initialize Expo Project:
`npx create-expo-app@latest -e with-router ./` or use typescript.
`npx create-expo-app -t expo-template-blank-typescript`...

### Design System and Component (open source for expo):

1. Tamagui: https://tamagui.dev/
2. React Native Elements: https://reactnativeelements.com/
3. React Native Paper: https://reactnativepaper.com/
4. Nativebase: https://nativebase.io/
5. NativeWind: https://www.nativewind.dev/
6. UI Kitten: https://github.com/akveo/react-native...
7. RNUI Lib: https://wix.github.io/react-native-ui....
8. Gluestack-ui: https://ui.gluestack.io/
9. Restyle: https://github.com/Shopify/restyle

1. Bouncy checkbox https://github.com/WrathChaos/react-n...
2. Bottom sheet https://github.com/gorhom/react-nativ...
3. Gifted Chat https://github.com/FaridSafi/react-na...
4. Charts https://github.com/FormidableLabs/vic...
5. Toast https://github.com/calintamas/react-n...
6. Skeleton https://github.com/danilowoz/react-co...
7. Pager view https://github.com/callstack/react-na...
8. Blur view https://docs.expo.dev/versions/latest...
9. Calendar https://github.com/wix/react-native-c...
10. FlashList https://shopify.github.io/flash-list/


### Topics RN:
navigation -> 1. Expo Router, 2. React Navigation
UI Style -> 1. NativeWind, 2. Tamagui
state management -> 1. Redux, 2. Zustand
network api call -> 1. TenStackQuery/ReactQuery 2. Fetch, 3. Axios
data storage -> 1. SqlLite (for structured), 2. MMKV 3. Expo Secure 4. WaterMelon DB
animation -> 1. reanimated 2. motee
debugging -> 1. expo tools, 2. flipper, 3. flash-light
error-reporting -> 1. Bugs net 2. Centree
components -> don't re-invent the wheel, some open source component are already built by community on RN (like Cha Component, list, loading, skeleton view, etc )

`TenStackQuery` -> https://tanstack.com/query/latest/docs/react/overview.