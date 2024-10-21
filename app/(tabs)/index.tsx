// import {
//   Image,
//   StyleSheet,
//   Platform,
//   TouchableOpacity,
//   Text,
//   View,
//   Button,
// } from "react-native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { useNavigation } from "@react-navigation/native";
// import AuthComponent from "@/components/auth/AuthComponent";
// import React from "react";

// export default function HomeScreen() {
//   const navigation = useNavigation();

//   const handleDashboard = () => {
//     // code to handle the browse action
//     (navigation as any).navigate("dashboard");
//   };

//   const handleSignIn = () => {
//     (navigation as any).navigate("auth");
//   };

//   const testRoute = () => {
//     (navigation as any).navigate("test");
//   };

//   return (
//     <View style={styles.container}>
//       {/* Two Text Messages */}
//       <Text style={styles.headerText}>2024 PNG Population Census</Text>
//       <Text style={styles.subText}>
//         It matters to be counted
//       </Text>

//       <TouchableOpacity style={styles.button} onPress={() => handleDashboard()}>
//         <Text style={styles.buttonText}>Data Entry</Text>
//       </TouchableOpacity>

//     </View>
//   );
// }

// // Styling for a modern, attractive layout
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#f5f5f5", // Light background for contrast against buttons
//   },
//   headerText: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#333",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   subText: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     marginBottom: 40, // Space between text and buttons
//   },
//   button: {
//     backgroundColor: "#4CAF50", // Modern green color
//     borderRadius: 12,
//     paddingVertical: 15,
//     paddingHorizontal: 50,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5, // Elevation for Android
//   },
//   buttonSecondary: {
//     backgroundColor: "#2196F3", // Stylish blue for Sign In/Sign Up buttons
//     borderRadius: 12,
//     paddingVertical: 15,
//     paddingHorizontal: 50,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5, // Elevation for Android
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//   },
// });
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
