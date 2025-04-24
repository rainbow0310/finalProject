import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function DiningOptions ({ route, navigation }) {

  console.log(route.params);
    //dataSource contains the data we want rendered as a list
    //the dataSource should contain a unique key for each item in the array
    const dataSource = [
      {
        word: 'Dougherty Dining Hall',
        menu: [
          { name: "Buffalo Chicken Wrap", rating: 0 },
          { name: "Mac & Cheese", rating: 0 },
        ],
        rating: 0
      },
      {
        word: 'Donahue Dining Hall',
        menu: [
          { name: "Pasta Bar", rating: 0 },
          { name: "Grilled Cheese", rating: 0 },
        ],
        rating: 0
      },
      {
        word: 'Holy Grounds',
        menu: [
          { name: "Cold Brew", rating: 0 },
          { name: "Blueberry Muffin", rating: 0 },
        ],
        rating: 0
      },
      {
        word: 'Belle Air Terrace',
        menu: [
          { name: "Philly Cheesesteak", rating: 0 },
          { name: "Mozzarella Sticks", rating: 0 },
        ],
        rating: 0
      },
      {
        word: 'Cafe Nova',
        menu: [
          { name: "Smoothie Bowl", rating: 0 },
          { name: "Avocado Toast", rating: 0 },
        ],
        rating: 0
      },
      {
        word: "St. Mary's Dining Hall",
        menu: [
          { name: "Meatball Sub", rating: 0 },
          { name: "Roasted Vegetables", rating: 0 },
        ],
        rating: 0
      },
      {
        word: 'Smoothitas',
        menu: [
          { name: "Berry Blast", rating: 0 },
          { name: "Green Machine", rating: 0 },
        ],
        rating: 0
      },
    ];   
    const[listData, setListData] = useState(dataSource);
    //setListData(listData.concat(route.params));

    useEffect(()=> {
      if (route.params) {
        if(route.params.word!='') {
          setListData(listData.concat(route.params));
        }
      console.log(route.params);
       }
    }, [route.params]
  );

    return (
        <View style={styles.container}>
            <FlatList
              data={listData}
              renderItem={({ item }) => (
              <TouchableOpacity
              onPress={() => navigation.navigate('Menu', item)}
              style={styles.border}
            >
      <Text style={styles.itemName}>{item.word}</Text>
    </TouchableOpacity>
  )}
/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingBottom: 50,
    },
    itemName: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    itemDesc: {
      padding: 10,
      fontSize: 10,
      height: 44,
    },
      border: {
      borderWidth: 1,
      borderColor: "gray",
    },
});
  