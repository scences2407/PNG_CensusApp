import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { LinearGradient } from 'expo-linear-gradient'; // Make sure to install expo-linear-gradient
import { useNavigation } from "@react-navigation/native";

const SplashScreenComponent = () => {
  const navigation = useNavigation();

  // Shared values for animations
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Start animations
    opacity.value = withTiming(1, { duration: 2000, easing: Easing.ease });
    translateY.value = withTiming(0, {
      duration: 2000,
      easing: Easing.out(Easing.cubic),
    });
    scale.value = withRepeat(withTiming(1.2, { duration: 1000, easing: Easing.ease }), -1, true);

    // Navigate to the next screen after 6 seconds
    const timeout = setTimeout(() => {
      navigation.navigate("index"); // Replace Splash screen with Home
    }, 6000);

    return () => clearTimeout(timeout); // Cleanup timeout if component unmounts
  }, []);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <LinearGradient
      colors={['#4CAF50', '#81C784']}
      style={styles.container}
    >
      <Animated.View style={animatedStyle}>
        <Text style={styles.emoji}>🚀</Text>
        <Text style={styles.text}>Welcome to PNG's One and Only</Text>
        <Text style={styles.emoji}>✨🎉</Text>
      </Animated.View>
    </LinearGradient>
  );
};

// Styling for splash screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  emoji: {
    fontSize: 64,
    textAlign: "center",
  },
});

export default SplashScreenComponent;
