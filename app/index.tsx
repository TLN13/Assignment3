import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Welcome to Assignment 3!</Text>
      <StatusBar style="auto" />
      <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/assignment3')}
        >
          <Text style={styles.buttonText}>Go to Assignment 3</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#40E0D0',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: 9,
    height: 60,
    width: 120,
    marginTop: 20,
    borderRadius: 20,
  },
  buttonText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
  }
});
