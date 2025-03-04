import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';


const Assignment3: React.FC = () => {
  const router = useRouter();

  const [month, setMonth] = useState<string>('1');
  const [day, setDay] = useState<string>('');
  const [fact, setFact] = useState<string>('');

  useEffect(() => {
    if (day && month) {
      fetchDateFact(month, day);
    }
  }, [month, day]);

  const fetchDateFact = async (month: string, day: string) => {
    const url = `https://numbersapi.p.rapidapi.com/${month}/${day}/date`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c7dd415fc3msh7e1748d1a037958p148028jsnc826e0244201', 
        'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com' 
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.text();
      setFact(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setFact('Failed to fetch fact. Please try again.');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.backButton} onPress={() => router.back()}>
        Go Back
      </Text>
      <View style={styles.container}>
      <Text style={styles.label}>Select a month:</Text>
      <Picker
        selectedValue={month}
        style={styles.picker}
        onValueChange={(value) => setMonth(value)}
      >
        <Picker.Item label="--Choose Month--" value="" />
        <Picker.Item label="January" value="1" />
        <Picker.Item label="February" value="2" />
        <Picker.Item label="March" value="3" />
        <Picker.Item label="April" value="4" />
        <Picker.Item label="May" value="5" />
        <Picker.Item label="June" value="6" />
        <Picker.Item label="July" value="7" />
        <Picker.Item label="August" value="8" />
        <Picker.Item label="September" value="9" />
        <Picker.Item label="October" value="10" />
        <Picker.Item label="November" value="11" />
        <Picker.Item label="December" value="12" />
      </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    marginTop: 20,
    color: '#40E0D0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
      marginVertical: 10,
  },
});

export default Assignment3;