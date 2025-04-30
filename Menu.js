import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { getFirestore, doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { auth } from './firebase'; 

const firestore = getFirestore();

export default function Details({ navigation, route }) {
  const { word, menu, feedback } = route.params;

  // Create local state for menu items with rating
  const [menuItems, setMenuItems] = useState(menu);
  const [feedbackText, setFeedbackText] = useState(feedback || '');
  const [hasChanges, setHasChanges] = useState(false);

  const rateItem = (index, rating) => {
    const updatedMenu = [...menuItems];
    updatedMenu[index].rating = rating;
    setMenuItems(updatedMenu);
    setHasChanges(true);
  };

  const handleFeedbackChange = (index, text) => {
    const updatedMenu = [...menuItems];
    updatedMenu[index].feedback = text;
    setMenuItems(updatedMenu);
    setHasChanges(true);
  };

  const saveToFirebase = async () => {
    const userId = auth.currentUser.uid;
    const restaurantRef = doc(firestore, "userRatings", userId, "restaurants", word);
  
    const newRatings = menuItems.map(item => item.rating).filter(r => r > 0);
    const newFeedbacks = menuItems
      .map(item => item.feedback)
      .filter(f => f && f.trim().length > 0);
  
    try {
      const existingDoc = await getDoc(restaurantRef);
  
      let combinedRatings = newRatings;
      let combinedFeedbacks = newFeedbacks;
  
      if (existingDoc.exists()) {
        const data = existingDoc.data();
        combinedRatings = [...(data.ratings || []), ...newRatings];
        combinedFeedbacks = [...(data.feedback || []), ...newFeedbacks];
      }
  
      await setDoc(restaurantRef, {
        restaurantName: word,
        ratings: combinedRatings,
        feedback: combinedFeedbacks
      });
  
      alert('Ratings and feedback saved!');
      setHasChanges(false);
      navigation.goBack?.() || navigation.navigate('DiningOptions');
    } catch (err) {
      alert('Error saving ratings: ' + err.message);
    }
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{word}</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>{item.name}</Text>
            <Text>Rating: {item.rating}</Text>
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((num) => (
                <TouchableOpacity
                  key={num}
                  onPress={() => rateItem(index, num)}
                  style={[styles.ratingBtn, item.rating === num && styles.selected]}
                >
                  <Text>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              placeholder="Leave feedback..."
              value={item.feedback}
              onChangeText={(text) => handleFeedbackChange(index, text)}
              style={styles.input}
            />
          </View>
        )}
      />
      {hasChanges && (
        <TouchableOpacity onPress={saveToFirebase} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Ratings</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  menuText: {
    fontSize: 18,
  },
  ratingRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  ratingBtn: {
    marginHorizontal: 4,
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#eee',
  },
  selected: {
    backgroundColor: '#ffd700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
  },
  saveButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});