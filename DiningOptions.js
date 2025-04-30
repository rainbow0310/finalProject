import React, { useEffect, useState, useCallback } from 'react';
import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from './firebase';
import { useFocusEffect } from '@react-navigation/native';

const firestore = getFirestore();

  //average rating
const calculateAverage = (ratings) => {
  if (!ratings.length) return 0;
  const sum = ratings.reduce((a, b) => a + b, 0);
  return (sum / ratings.length).toFixed(1);
};

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
          { name: "", rating: 0 },
          { name: "Blueberry Muffin", rating: 0 },
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

    useFocusEffect(
      React.useCallback(() => {
        const fetchRatings = async () => {
          const userId = auth.currentUser?.uid;
          if (!userId) return;
  
          const updatedList = await Promise.all(listData.map(async (item) => {
            const restaurantRef = doc(firestore, "userRatings", userId, "restaurants", item.word);
            const docSnap = await getDoc(restaurantRef);
  
            if (docSnap.exists()) {
              const data = docSnap.data();
              const avg = calculateAverage(data.ratings);
              return {
                ...item,
                rating: avg,
                feedback: (data.feedback || []).at(-1)?.text || ''
              };
            }
            return item;
          }));
  
          setListData(updatedList);
        };
  
        fetchRatings();
      }, [])
    );

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
              onPress={() => navigation.navigate('Menu', {
                word: item.word,
                menu: item.menu,
                feedback: item.feedback})}
              style={styles.border}
            >
      <View style={styles.rowBetween}>
        <Text style={styles.itemName}>{item.word}</Text>
        {item.rating ? (
          <Text style={styles.itemRating}>{item.rating}⭐</Text>
        ) : null}
      </View>
      {/* {item.feedback ? (
        <Text style={styles.feedbackText}>{item.feedback}</Text>
      ) : null} */}
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
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    
    itemRating: {
      fontSize: 16,
      color: '#666',
    },
    feedbackText: {
      fontSize: 14,
      color: '#444',
      paddingHorizontal: 10,
      paddingBottom: 10,
      fontStyle: 'italic',
    },
});
  