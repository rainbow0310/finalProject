import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import Dining from './DiningOptions';
import Menu from './Menu';

const Stack = createNativeStackNavigator();

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      alert(error.message);
    }
  };

  // If user is logged in, show navigation
  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WordList">
          <Stack.Screen name="WordList" component={WordList} options={{ title: 'Dining Halls' }} />
          <Stack.Screen name="Details" component={Details} options={{ title: 'Menu & Ratings' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // If not logged in, show login screen
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.welcomeText}>Hi! Welcome to FeedMe 😋</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignUp} />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    padding: 20 
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: { 
    borderWidth: 1, 
    marginBottom: 10, 
    padding: 8,
    borderRadius: 5
  },
  buttonContainer: {
    gap: 10
  }
});