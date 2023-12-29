### Common Views and Layout Components of RN:
`<Text style={{fontSize: 24, color: 'blue'}}>Hello World!</Text>` For Text

`<View>` It's a layout container (structure) for other components/elements, Uses FlexBox layout by Default.

`FlatList` for showing List Item (Recycler View), for long scrollable list items. Map fn can also be used for showing small list of items.

`ScrollView` scrollable view

`SafeAreaView` provides a safe zone to render content without covered by notch, home indicator or status bar.

### Touchable Components:
`<TouchableOpacity onPress={props.onPress}>...</...>`: suitable for button or another interactive element that fades in opacity if pressed.

`<ActivityIndicator>...</...>` used for showing a spinner or loading indicator. Has `size` and `color` property

### Expo App Initialization:
- install starting project on current directory with expo router ``npx create-expo-app@latest -e with-router ./``
- install font sdk `npx expo install expo-font`
- install some other dependency `npm install axios react-native-dotenv` where axios for fetching apis and dotenv for environment variable

Then Create an `app` directory and add `index.js` and `_layout.js`
```js
// index.js
import {View, Text} from 'react-native'

const Home = () => {
    return (
        <View>
            <Text>Home Landing</Text>
        </View>
    );
}

export default Home;

// _layout.js
import {Stack} from 'expo-router';

const Layout = () => {
    return <Stack/>;
}

export default Layout;
```

Then start the project by `npm start`. Then View the initial app in ExpoGo app or in the browser.

Troubleshooting -> if wifi is blocking access, then install expo-cli globally (legacy and deprecated ) by `npm install -g expo-cli` and run the app using `expo-cli start --tunnel`

Docs: https://docs.expo.dev/router/installation/#quick-start

### Directory Structure:
`app` (required), entry directory
`app/index.js` (required), entry file
`app/_layout.js` (optional), Container Layout that contain other app files.