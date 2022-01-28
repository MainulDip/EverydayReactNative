import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ListItem = ({item}: {item?: any}) => {
  return (
    <>
      <TouchableOpacity activeOpacity={.9} style={style.listItem}>
        <View style={style.listItemView}>
          <Text style={style.listItemText}>{item}</Text>
          <Icon name="remove" size={20} color="white" />
        </View>
      </TouchableOpacity>
    </>
  );
};

const style = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#585306',
    borderBottomWidth: 2,
    borderColor: '#3a3604',
  },
  listItemView: {},
  listItemText: {
    color: '#ffffff',
  },
});

ListItem.propTypes = {};

export default ListItem;
