import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

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
        'X-RapidAPI-Key': 'c7dd415fc3msh7e1748d1a037958p148028jsnc826e0244201', // Replace with your RapidAPI key
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
});

export default Assignment3;