import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';

function ListItem (this: any, {item, deleteItem}: {item?: any, deleteItem: any}) {
  
  

  return (
    <>
      <TouchableOpacity activeOpacity={.9} style={style.listItem}>
        <View style={style.listItemView}>
          <Text style={style.listItemText}>{item.text}</Text>
          <Icon onPress={deleteItem.bind(this, item?.id)} name="remove" size={20} color="#fff" />
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
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listItemText: {
    color: '#ffffff',
    fontSize: 18
  },
});

ListItem.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object
};

export default ListItem;
