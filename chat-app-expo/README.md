### Overview:
This is an chat app (whatsapp clone) with OTP verification built with expo.
Initial command after creating the project dir `npx npx create-expo-app@latest .`

Install Initial 3rd party packages by `npx expo install react-native-reanimated react-native-mask-input react-native-confirmation-code-field expo-dev-client`

Note: Configure Reanimated as stated in the docs


Then go prebuild (expo-dev-client already installed) => `npx expo run:android`

### KeyboardAvoidingView:
This component will automatically adjust its height, position, or bottom padding based on the keyboard height to remain visible while the virtual keyboard is displayed.

```jsx
const KeyboardAvoidingComponent = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Header</Text>
          <TextInput placeholder="Username" style={styles.textInput} />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default KeyboardAvoidingComponent;
```

### Mask Input:
`npm install react-native-mask-input` to mask (decorate) texts and digits input, ie, phone number, otp or other code

Example:

<img src="./masked-input-example.gif" />

--------------Code-----------------
```js
import MaskInput from 'react-native-mask-input';

function MyComponent() {
  const [phone, setPhone] = React.useState('');

  return (
    <MaskInput
      value={phone}
      onChangeText={(masked, unmasked) => {
        setPhone(masked); // you can use the unmasked value as well

        // assuming you typed "9" all the way:
        console.log(masked); // (99) 99999-9999
        console.log(unmasked); // 99999999999
      }}
      mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
    />
  );
}
```