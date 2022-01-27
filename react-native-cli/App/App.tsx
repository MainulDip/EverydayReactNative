import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Header from './components/Header';
import ListItem from './components/ListItem'
import uuid from 'react-native-uuid';

const App = () => {
  const [items, setItems] = useState([
    {id: uuid.v4(), text: 'Milk'},
    {id: uuid.v4(), text: 'Eggs'},
    {id: uuid.v4(), text: 'Vegitable'},
    {id: uuid.v4(), text: 'Meat'},
  ]);
  return (
    <>
      <View style={styles.container}>
        {/* <Text style={styles.text}>Hello World</Text> */}
        {/* <Image source={{uri: 'https://picsum.photos/200/300.jpg'}} style={styles.img} /> */}
        <Header />
        <FlatList
          data={items}
          keyExtractor={(item: any) => item.id}
          renderItem={({item}) => <ListItem item={item.text} />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'yellow',
  },
  text: {
    color: 'black',
    fontSize: 30,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
});

export default App;
