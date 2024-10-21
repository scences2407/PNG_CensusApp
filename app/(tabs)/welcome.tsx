import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const WelcomePage = () => {
  const navigation = useNavigation(); // Initialize navigation

  const handleRegister = () => {
    navigation.navigate('InfoPage'); // Navigate to the info page
  };

  return (
    <View style={styles.container}>
      <Animatable.Image
        source={require('@/assets/images/image.png')} // Replace with your logo path
        style={styles.logo}
        animation="fadeIn"
        duration={1500}
      />
      <Animatable.Text
        style={styles.text}
        animation="fadeInUp"
        duration={1500}
        delay={500}
      >
        2024 Census Registration
      </Animatable.Text>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c0519', // Change background color if needed
  },
  logo: {
    width: 250, // Adjust size as needed
    height: 250,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Change text color if needed
  },
  button: {
    marginTop: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff6347', // Change button color if needed
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomePage;
