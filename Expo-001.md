#### Expo-001:
### React Native Core Components:
* View => Like div in web, used for structuring the layout. used like `<View> <Text>Hello, React Native!</Text> </View>`

* Image & ImageBackground => Self explanatory, used like `<Image source={require('./image.png')} style={styles.image} />`

 + StatusBar, Switch, Text, KeyboardAvoidingView, etc Components

* TextInput => `<TextInput placeholder="Enter your username" style={styles.input} onChangeText={text => onChangeText(text)} />`

* Button => `<Button title="Click me" onPress={() => alert('Button pressed!')} />`

* ScrollView => A Container/Wrapper to implement scrolling behavior

* FlatList => a component for rendering long lists efficiently. It’s a go-to choice for implementing lists, grids, etc.
```jsx
<FlatList
  data={data}
  renderItem={({ item }) => (
    <Text>{item.name}</Text>
  )}
/>
```

* TouchableHighlight => wraps other components and make them touchable. often used to create interactive elements like buttons, links, and icons.

```jsx
<TouchableHighlight onPress={() => alert('Touched!')}>
  <Text>Touch Me</Text>
</TouchableHighlight>
```

There are also `TouchableOpacity` and `TouchableWithoutFeedback`

* ActivityIndicator => used to display loading indicators. ex: `<ActivityIndicator size="large" color="#0000ff" />`

* Modal => The Modal component allows us to present content on top of the current screen. It’s frequently used for dialogs, pop-ups.

```jsx
<Modal visible={true}>
  <Text>Modal Content</Text>
  {/* Add our modal content here */}
</Modal>
```
* Pressable => wrapper that can detect various stages of press interactions on any of its defined children.

```jsx
<Pressable onPress={onPressFunction}>
  <Text>I'm pressable!</Text>
</Pressable>
```

Also => `VirtualizedList`, `DrawerLayoutAndroid`, `TouchAbleNativeFeedback`, `InputAccessoryView` and `SafeAreaView`, etc.

### Expo Components:

### Styling in RN:
All of the core components accept a prop named `style`, and style names follow `camelCasing` rule.

The style prop can be a plain old JavaScript object. An array of styles can also be passed, the last style in the array has precedence.

* As a component grows in complexity, it is often cleaner to use `StyleSheet.create` to define several styles in one place

```jsx
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const StyleExampleComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff' }}>White Text</Text>
      <Text style={styles.red}>just red</Text>
      <Text style={styles.bigBlue}>just bigBlue</Text>
      <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
      <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default StyleExampleComponent;
```