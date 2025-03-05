// Code for Assignment 3.
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

// Map of month numbers to their maximum days.
// For February, we allow up to 29 days.
const monthDays: { [key: string]: number } = {
  '1': 31,
  '2': 29,
  '3': 31,
  '4': 30,
  '5': 31,
  '6': 30,
  '7': 31,
  '8': 31,
  '9': 30,
  '10': 31,
  '11': 30,
  '12': 31,
};

const Assignment3: React.FC = () => {
  const router = useRouter();
  const [month, setMonth] = useState<string>('1');
  const [day, setDay] = useState<string>('');
  const [fact, setFact] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Only fetch if month and day are provided and there is no error.
    if (month && day) {
      const url = `https://numbersapi.p.rapidapi.com/${month}/${day}/date`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'c7dd415fc3msh7e1748d1a037958p148028jsnc826e0244201',
          'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
        }
      };

      const fetchFact = async () => {
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.text();
          setFact(data);
        } catch (error) {
          console.error(error);
          setFact('Failed to fetch fact. Please try again.');
        }
      };

      fetchFact();
    }
  }, [month, day]);

  // Validate the day input against the maximum day allowed for the selected month.
  const handleDayChange = (text: string) => {
    // Allow the field to be cleared.
    if (text === '') {
      setDay('');
      setError('');
      return;
    }

    const dayNumber = Number(text);
    if (isNaN(dayNumber)) {
      setError('Please enter a valid number for the day.');
      return;
    }
    // Check if the day exceeds the max allowed for the selected month.
    if (month in monthDays) {
      const maxDay = monthDays[month];
      if (dayNumber > maxDay) {
        setError(`Invalid day for selected month. Maximum is ${maxDay}.`);
        return;
      } else {
        setError('');
      }
    }
    setDay(text);
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
          onValueChange={(value) => {
            setMonth(value);
            // When month changes, validate the current day value.
            if (day !== '') {
              const dayNumber = Number(day);
              const maxDay = monthDays[value] || 31;
              if (dayNumber > maxDay) {
                setError(`Invalid day for selected month. Maximum is ${maxDay}.`);
              } else {
                setError('');
              }
            }
          }}
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

        <Text style={styles.label}>Enter a day:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={day}
          onChangeText={handleDayChange}
          placeholder="e.g. 7"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {fact ? (
          <View style={styles.factContainer}>
            <Text style={styles.factLabel}>Fun Fact:</Text>
            <Text style={styles.factText}>{fact}</Text>
          </View>
        ) : null}
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
  input: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  factContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
  },
  factLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  factText: {
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Assignment3;
