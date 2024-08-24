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


### Expo Router and Directory structure:
Installation and manual setups https://docs.expo.dev/router/installation/#quick-start

`app` or `src/app` is the application source directory and the directory structure will be used as router instructions by `expo-router`
- `index.tsx` is the entry point (page) of the route
- `_layout.tsx` holds layout information 
- `any_other_file.tsx` other pages of the directory
- `+html.tsx` web specific structure that will hold layout and page as `{children}` 
- `+not-found.tsx` web specific 404
- `(dir)` is group-route syntax to hide a directory from url and programmatically navigation by Stack navigation or other from `_layout` file. ie, `<Stack.Screen name="(dir)" options={{ headerShown: false }} />`

- `[anything].tsx` dynamic route, it will match any unmatched path at a given segment/directory/route level. ie, `app/blog/[slug].tsx` will match	`/blog/123` path. Dynamic segments are accessible as search parameters in the page component.

### Stack Navigation | Expo Router:
Expo Router uses a stack-based navigation approach (newly navigated route gets added to a stack).

`push` and `replace` props can be used with `<Link>` component to replace default behavior. ie, `<Link push href="/feed">Login</Link>`.

- `router` object form `expo-router` can be used to to perform navigation outside of React Component (from event handlers or utility functions). 

```tsx
import { router } from 'expo-router';
export function logout() {
  router.replace('/login');
}
```

The router object is immutable and contains the following functions:

- `navigate`: (href: Href) => void. Perform a navigate action.
- `push`: (href: Href) => void. Perform a push action.
- `replace`: (href: Href) => void. Perform a replace action.
- `back`: () => void. Navigate back to previous route.
- `canGoBack`: () => boolean Returns true if a valid history stack exists and the back() function can pop back.
`setParams`: (params: Record<string, string>) => void Update the query params for the currently selected route.


https://docs.expo.dev/router/navigating-pages/#understanding-native-navigation

### `_layout.tsx` | Layout Routes:
provide slots for shared elements like headers and tab bars to persist between pages. 

```tsx
// app/_layout.tsx
import { Slot } from 'expo-router';

// the default exported Component will be used as layout
export default function HomeLayout() {
  return (
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  );
}
```
* `Slot` will render the current child route, think of this like the children prop in React.

* `Stack` can be used to add routes for multiple layout routes, through multiple directories or for `Group Routes, ie, (dir)`
### App.json | App.config.js:
Both will work, but App.config.js can do calculations/scripting inside of it.

"slug" is for deep-linking into ios/android app's specific page/route/navigation. 
### Expo Stack navigation:

### NativeWind | TailwindCSS Setup For Mobile and Web:
For installing NativeWind V2, follow the docs https://www.nativewind.dev/quick-starts/expo

For web, expo uses tailwindcss directly (not nativewind, which is a transpiler for tailwindcss in the native mobile platforms). So web package needs to be installed. 

For NativeWind V2 (Not V4) install the specific tailwindcss and postcss-loader webpack plugin.
`npm i -D tailwindcss@3.3.2 postcss autoprefixer postcss-loader@4.2.0`

Add postcss.config.js and styles.css to as shown in the docs

Then add a webpack.config.js file with this https://www.nativewind.dev/quick-starts/expo#example-webpack-setup...

Finally import the style-sheet into the `_layout.tsx` file
### React Native Core Components:
* View => Like div in web, used for structuring the layout. used like `<View> <Text>Hello, React Native!</Text> </View>`

* Image & ImageBackground => Self explanatory, used like `<Image source={require('./image.png')} style={styles.image} />`.

 + StatusBar, Switch, Text, KeyboardAvoidingView, etc Components...

* TextInput => `<TextInput placeholder="Enter your username" style={styles.input} onChangeText={text => onChangeText(text)} />`.

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