import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import logo from "@/assets/images/Header.png"; // Adjust the path as necessary

const SignupForm = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = () => {
    // Basic validation
    if (!email || !phoneNumber || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Your password must be at least 6 characters long.');
      return;
    }

    // Clear error message if all validations pass
    setErrorMessage('');

    // Handle the form submission here
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    console.log('Password:', password);

    // Navigate to the Dashboard component
    navigation.navigate('dashboard');

    // Show a success message
    Alert.alert('Success', 'You have successfully signed up!');
  };

  return (
    <LinearGradient colors={['#000000', '#FF0000', '#FFFF00']} style={styles.container}>
      <Image source={logo} style={styles.logo} accessibilityLabel="logo" />
      <Text style={styles.nameText}>CENSUS PNG 2024</Text>
      <Text style={styles.censusText}>Please fill in the fields below to continue:</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="example@domain.com"
        placeholderTextColor="#ccc"
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholder="Enter your phone number"
        placeholderTextColor="#ccc"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter a password"
        placeholderTextColor="#ccc"
      />

      <Button title="Sign Up" onPress={handleSignup} color="#ea580c" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: 120,
    marginBottom: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  nameText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
    textAlign: "center",
  },
  censusText: {
    fontSize: 18,
    color: "#f8fafc",
    marginBottom: 2,
    textAlign: "center",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#fca5a5',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#fff',
    backgroundColor: '#1C2A4B',
  },
  error: {
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SignupForm;
