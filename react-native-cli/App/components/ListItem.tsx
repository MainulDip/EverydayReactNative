import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const ListItem = ({item}:{item?: any}) => {
  return <>
  <Text>{item}</Text>
  </>;
};

ListItem.propTypes = {};

export default ListItem;
