import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Modal,FlatList,Keyboard,TouchableWithoutFeedback,} from 'react-native';
import { useRouter } from 'expo-router';
 
const Assignment3: React.FC = () => {
  const router = useRouter();
 
  const [month, setMonth] = useState<string>('1');
  const [day, setDay] = useState<string>('');
  const [fact, setFact] = useState<string>('');
 
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
 
  const months = [
    { label: 'January', value: '1' },
    { label: 'February', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'September', value: '9' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];
 
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
        'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com',
      },
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
 
  const handleMonthSelect = (value: string) => {
    setMonth(value);
    setDropdownVisible(false);
    Keyboard.dismiss(); // Dismiss keyboard when a month is selected
  };
 
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Get Interesting Facts About Dates</Text>
 
        <Text>Month:</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => {
            setDropdownVisible(true);
            Keyboard.dismiss();
          }}
        >
          <Text>{months.find((m) => m.value === month)?.label || 'Select Month'}</Text>
        </TouchableOpacity>
 
        <Text>Day:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter day"
          keyboardType="numeric"
          value={day}
          onChangeText={(text) => setDay(text)}
        />
 
        <Text style={styles.fact}>{fact}</Text>
 
        <Text style={styles.backButton} onPress={() => router.back()}>
          Go Back
        </Text>
 
        <Modal
          visible={dropdownVisible}
          transparent={true}
          onRequestClose={() => setDropdownVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownMenu}>
              <FlatList
                data={months}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleMonthSelect(item.value)}
                  >
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dropdownButton: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  fact: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    marginTop: 20,
    color: '#40E0D0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownMenu: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 5,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
 
export default Assignment3;