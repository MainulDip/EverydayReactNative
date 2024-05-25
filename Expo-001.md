#### Expo-001:
Initialize an expo project `npx create-expo-app AppName --template blank`, which will create a new directory of `AppName` and put all the project code inside of it. Using `./` instead will create the project in the current directory and the project name will be the directory name.
`npx create-expo-app <path> [options]`
Upcoming version is `npx create-expo <path> [options]`

https://www.npmjs.com/package/create-expo-app


### --template default vs blank For entry point:
default template uses `Expo router` and the `entry point` is `node-modules/expo-router/entry.js`. But blank template doesn't use that and the entry point is `node-modules/expo/AppEntry.js`

For changing app's entry file see
https://stackoverflow.com/questions/47742280/how-to-define-entry-point-for-react-native-app
https://docs.expo.dev/versions/latest/sdk/register-root-component/#common-questions

https://docs.expo.dev/router/reference/src-directory/ | expo-router can use both `src/app` and `app/` directory (one or another). 
Custom entry and directory structure is discouraged 


### Expo Router:
Installation and manual setups https://docs.expo.dev/router/installation/#quick-start

### App.json | App.config.js:
Both will work, but App.config.js can do calculations/scripting inside of it.

"slug" is for deep-linking into ios/android app's specific page/route/navigation. 
### Expo Stack navigation:

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

### Styling in RN:
All of the core components accept a prop named `style`, and style names follow `camelCasing` rule.

The style prop can be a plain old JavaScript object. An array of styles can also be passed, the last style in the array has precedence.

* As a component grows in complexity, it is often cleaner to use `StyleSheet.create({...})` to define several styles in one place

```jsx
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const StyleExampleComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff' }}>White Text</Text>
      <Text style={styles.red}>just red</Text>
      <Text style={styles.bigBlue}>just bigBlue</Text>
      <Text style={ [ styles.bigBlue, styles.red, {backgroundColor: '#000'} ] }>bigBlue, then red</Text>
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

### icon library `@expo/vector-icons`:
install by `npx expo install @expo/vector-icons` and import specific module by `import FontAwesome from "@expo/vector-icons/FontAwesome"`

* Note => comes default with expo ^50.0.7. No Need to install

```js
import FontAwesome from "@expo/vector-icons/FontAwesome
// import {FontAwesome} from "@expo/vector-icons
//....
<FontAwesome
  name="picture-o"
  size={18}
  color="#25292e"
  style={{color: '#fff'}}
/>
//....
```


### Expo web different browser and hot reload issue:
add .env file and inject `BROWSER=google-chrome` entry (for ubuntu) then run `npm run web` script

For hot reload on web, install `@expo/metro-runtime` as dev dependency and import that into the `App.js/ts` file at the first place using just `import "@expo/metro-runtime"`

```sh
# Sample .env for setting default development browser for React Native Web
BROWSER=google-chrome
# BROWSER=firefox
```

### Debugging:
Use `npx expo install <package_name>` whenever possible. Its a wrapper that takes care of version compatibility.
npm install installs the latest version of a package by default, while `npx expo install` installs the version of the package that's compatible with the current version of the Expo SDK

* For installing Dev Dependency `npx expo install @expo/metro-runtime -- --save-dev` not working currently. So get the version running `npx expo install @expo/metro-runtime` and then run `npm install @expo/metro-runtime@VERSION -D`


Sometimes error can happen, when developing, be up-to-date with the latest release. Sometimes installing a new project with `npx create-expo-app app-name` and test the specific component that threw error previously in the fresh environment. Copy the exact versions from the package.json and put that in working project


npx expo install --check
npx expo-doctor

### NPM Versioning:
`~version`	Approximately equivalent to version, i.e., only accept new patch versions See npm semver - Tilde Ranges
`^version`	Compatible with version, i.e., accept new minor and patch versions See npm semver - Caret Ranges
`version`	Must match version exactly
`>version`	Must be greater than version
`>=`version	Must be equal or greater than version
`<version`	Must be lesser than version
`<=`version	Must be equal or lesser than version
`1`.2.x	1.2.0, 1.2.1, etc., but not 1.3.0
`*`	Matches any version
`latest`	Obtains latest release

Note: When installing use `npm install package_name@version`. Only `package_name` will install the latest package available.

### Expo Image Picker:
`npx expo install expo-image-picker`