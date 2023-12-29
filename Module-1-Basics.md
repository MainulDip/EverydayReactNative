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

Docs: https://docs.expo.dev/router/installation/#quick-start