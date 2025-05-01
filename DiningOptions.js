import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function DiningOptions ({ route, navigation }) {

  console.log(route.params);

    const dataSource = [
      {
        word: 'The Southwest Station',
        menu: [
          { name: "Build a Burrito", rating: 0 },
          { name: "Vegan Special Burrito", rating: 0 },
          { name: "Build a Burrito Bowl", rating: 0 },
          { name: "Vegan Special Burrito Bowl", rating: 0 },
          { name: "Nova Chopped Salad", rating: 0 },
          { name: "Toasted Chips", rating: 0 },
          { name: "Toasted Chips & Queso", rating: 0 },
          { name: "Toasted Chips & Guac", rating: 0 },
          { name: "Chip Trio", rating: 0 },
          { name: "Nachos", rating: 0 },
          { name: "Nachos Deluxe", rating: 0 },
        ],
        rating: 0
      },
      {
        word: 'The Italian Kitchen',
        menu: [
          { name: "Cheese Pizza", rating: 0 },
          { name: "Pepperoni Pizza", rating: 0 },
          { name: "Margherita Pizza", rating: 0 },
          { name: "Barbeque Chicken Pizza", rating: 0 },
          { name: "Chicken Parm Sandwich", rating: 0 },
        ],
        rating: 0
      },
      {
        word: 'The Corner Grille',
        menu: [
          { name: "Burger", rating: 0 },
          { name: "Grilled Chicken Sandwich", rating: 0 },
          { name: "Black Bean Burger", rating: 0 },
          { name: "Cheesesteak", rating: 0 },
          { name: "Chicken Cheesesteak", rating: 0 },
          { name: "French Fries", rating: 0 },
          { name: "Buffalo Cauliflower Bites", rating: 0 },
        ],
        rating: 0
      },
      {
        word: 'Cova Greens',
        menu: [
          { name: "Cova Caesar Salad", rating: 0 },
          { name: "Cova Greek Salad", rating: 0 },
          { name: "Sweet Potato Cobb Salad", rating: 0 },
          { name: "The Italian Kitchen Salad", rating: 0 },
          { name: "The Italian Kitchen Salad Wrap", rating: 0 },
          { name: "Sweet Potato Cobb Salad Wrap", rating: 0 },
          { name: "Cova Greek Salad Wrap", rating: 0 },
          { name: "Cova Caesar Salad Wrap", rating: 0 },
          { name: "Build Your Own Cova Salad", rating: 0 },
          { name: "Build Your Own Cova Wrap", rating: 0 },
        ],
        rating: 0
      },
      {
        word: 'Sushi',
        menu: [
          { name: "Vegetable Roll", rating: 0 },
          { name: "California Roll", rating: 0 },
          { name: "Spicy Tuna Roll", rating: 0 },
          { name: "Seaside Roll Salmon", rating: 0 },
          { name: "Shrimp Tempura Roll", rating: 0 },
          { name: "Tuna Poke Bowl", rating: 0 },
          { name: "Salmon Poke Bowl", rating: 0 },
          { name: "Vegetarian Poke Bowl", rating: 0 },
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
  