import React from 'react'; 
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InfoPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy Information</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>
          The 2024 Census Registration collects personal information to ensure accurate representation of the population.
        </Text>
        <Text style={styles.text}>
         Collection Authority: the information asked for is collected under the authority of the Statistical Services Act 1980 (rev.1981).
        </Text>
        <Text style={styles.text}>
         Privacy: The law protects your privacy. No one outside of the office can link your answers with your name and address.
        </Text>
        <Text style={styles.text}>
        Coverage: All persons present in the household must be counted.
        </Text>
        <Text style={styles.text}>
          Self Administered Questionnaire (SAQ) for private dwellings.
        </Text>
        <Text style={styles.text}>
          If you have any questions or concerns about your privacy or the data collection process, please contact our support team.
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login2')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c0519',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    paddingBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
    color: '#fff',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#881337', // Change button color if needed
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InfoPage;
