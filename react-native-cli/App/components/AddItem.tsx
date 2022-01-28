import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddItem = ({fn}: {fn: any}) => {
  const [text, setText] = React.useState('');

  const fn_onChange = (value: any) => {
    setText(value);
  };
  return (
    <View>
      <TextInput
        onChangeText={v => {
          fn_onChange(v);
          setText('');
        }}
        placeholder="Adding An Item"
        style={style.input}
      />
      <TouchableOpacity style={style.btn} onPress={() => fn(text)}>
        <Text style={style.btnText}>
          Add Item <Icon name="plus" size={20} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  input: {
    height: 60,
    padding: 7,
    fontSize: 16,
    borderStyle: 'solid',
    borderWidth: 2,
  },
  btn: {
    backgroundColor: '#c2baf7',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
});

AddItem.propTypes = {};

export default AddItem;
