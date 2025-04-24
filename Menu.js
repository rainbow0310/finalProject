import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Details({ navigation, route }) {
  const { word, menu } = route.params;

  // Create local state for menu items with rating
  const [menuItems, setMenuItems] = useState(menu);

  const rateItem = (index, rating) => {
    const updatedMenu = [...menuItems];
    updatedMenu[index].rating = rating;
    setMenuItems(updatedMenu);
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
          </View>
        )}
      />
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
});