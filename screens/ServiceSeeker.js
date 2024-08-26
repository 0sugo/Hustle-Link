// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, FlatList } from 'react-native';
// import LottieView from 'lottie-react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // For location icon
// import * as Location from 'expo-location';
// import axios from 'axios';

// const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your Google Maps API key
// const GOOGLE_PLACES_API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY'; // Replace with your Google Places API key

// export default function ServiceSeeker() {
//   const [location, setLocation] = useState('');
//   const [address, setAddress] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [chosenItems, setChosenItems] = useState([]);

//   // Function to get the nearest place when no address is found
//   const fetchNearestPlace = async (latitude, longitude) => {
//     try {
//       const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&key=${GOOGLE_PLACES_API_KEY}`;
//       const response = await axios.get(placesUrl);
//       const results = response.data.results;
//       if (results.length > 0) {
//         return results[0].name;
//       } else {
//         return `Lat: ${latitude}, Lon: ${longitude}`;
//       }
//     } catch (error) {
//       console.warn('Error fetching nearby places:', error);
//       return `Lat: ${latitude}, Lon: ${longitude}`;
//     }
//   };

//   // Function to request location permissions and get the current location
//   const handleAutoFillLocation = async () => {
//     setLoading(true); // Show loading animation
//     // Request permission
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'Location permission is required.');
//       setLoading(false); // Hide loading animation
//       return;
//     }

//     // Get location
//     try {
//       let { coords } = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.High,
//       });
//       const { latitude, longitude } = coords;
//       setLocation(`Lat: ${latitude}, Lon: ${longitude}`);

//       // Reverse geocoding
//       const reverseGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
//       const response = await axios.get(reverseGeocodeUrl);
//       const results = response.data.results;
//       if (results.length > 0) {
//         setAddress(results[0].formatted_address);
//       } else {
//         // Fetch nearest place if no address found
//         const nearestPlace = await fetchNearestPlace(latitude, longitude);
//         setAddress(nearestPlace);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to fetch location');
//     } finally {
//       setLoading(false); // Hide loading animation
//     }
//   };

//   const handleAddItem = () => {
//     if (inputValue.trim() !== '' && !chosenItems.includes(inputValue.trim())) {
//       setChosenItems([...chosenItems, inputValue.trim()]);
//       setInputValue(''); // Clear input field
//     }
//   };

//   const handleRemoveItem = (item) => {
//     setChosenItems(chosenItems.filter(i => i !== item));
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.chosenItem}>
//       <Text style={styles.chosenItemText}>{item}</Text>
//       <TouchableOpacity onPress={() => handleRemoveItem(item)}>
//         <Icon name="times" size={20} color="#FF0000" />
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.topSection}>
//         <Text style={styles.label}>What:</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter job or task"
//             value={inputValue}
//             onChangeText={(text) => setInputValue(text)}
//           />
//           <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
//             <Text style={styles.addButtonText}>Add</Text>
//           </TouchableOpacity>
//         </View>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.chosenItemsContainer}
//         >
//           {chosenItems.map((item) => (
//             <View key={item} style={styles.chosenItem}>
//               <Text style={styles.chosenItemText}>{item}</Text>
//               <TouchableOpacity onPress={() => handleRemoveItem(item)}>
//                 <Icon name="times" size={20} color="#FF0000" />
//               </TouchableOpacity>
//             </View>
//           ))}
//         </ScrollView>
//         <Text style={styles.label}>Where:</Text>
//         <View style={styles.locationContainer}>
//           <TextInput
//             style={styles.locationInput}
//             placeholder="Enter location"
//             value={address}
//             onChangeText={(text) => setAddress(text)}
//           />
//           <TouchableOpacity style={styles.locationButton} onPress={handleAutoFillLocation}>
//             <Icon name="location-arrow" size={20} color="#fff" />
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>SEARCH</Text>
//         </TouchableOpacity>
//       </View>

//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <LottieView
//             source={require('../assets/loading.json')}
//             autoPlay
//             loop
//             style={styles.loadingAnimation}
//           />
//           <Text style={styles.loadingText}>Fetching location...</Text>
//         </View>
//       ) : (
//         <View style={styles.bottomSection}>
//           <View style={styles.animationContainer}>
//             <LottieView
//               source={require('../assets/look.json')}
//               autoPlay
//               loop
//               style={styles.animation}
//             />
//           </View>

//           <Text style={styles.infoText}>
//             Manage your hustle-link profile, view recommended jobs, save searches, and save jobs
//           </Text>

//           <TouchableOpacity style={styles.signInButton}>
//             <Text style={styles.signInButtonText}>SIGN IN</Text>
//           </TouchableOpacity>

//           <View style={styles.registerContainer}>
//             <Text style={styles.registerText}>Don't have an account? </Text>
//             <TouchableOpacity>
//               <Text style={styles.registerLink}>Register</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f1f1f1',
//   },
//   topSection: {
//     paddingTop: 40,
//     padding: 16,
//     backgroundColor: '#f1f1f1',
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//   },
//   addButton: {
//     backgroundColor: '#009B77', // Button color
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     marginLeft: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   chosenItemsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   chosenItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#e0e0e0',
//     borderRadius: 20,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     marginRight: 10,
//     marginBottom: 10,
//   },
//   chosenItemText: {
//     fontSize: 16,
//     marginRight: 10,
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   locationInput: {
//     flex: 1,
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//   },
//   locationButton: {
//     backgroundColor: '#009B77',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     marginLeft: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#009B77',
//     paddingVertical: 12,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   loadingContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     marginTop: 20,
//   },
//   loadingAnimation: {
//     width: 200,
//     height: 200,
//   },
//   loadingText: {
//     fontSize: 18,
//     color: '#000',
//     marginTop: 10,
//   },
//   animationContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   animation: {
//     width: 200,
//     height: 200,
//   },
//   infoText: {
//     fontSize: 16,
//     color: '#000',
//     textAlign: 'center',
//   },
//   signInButton: {
//     backgroundColor: '#FF0000',
//     paddingVertical: 12,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   signInButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   registerText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   registerLink: {
//     fontSize: 16,
//     color: '#FF0000',
//     fontWeight: 'bold',
//   },
// });
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For location icon
import * as Location from 'expo-location';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your Google Maps API key
const GOOGLE_PLACES_API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY'; // Replace with your Google Places API key

export default function ServiceSeeker() {
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [chosenItems, setChosenItems] = useState([]);

  // Function to get the nearest place when no address is found
  const fetchNearestPlace = async (latitude, longitude) => {
    try {
      const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&key=${GOOGLE_PLACES_API_KEY}`;
      const response = await axios.get(placesUrl);
      const results = response.data.results;
      if (results.length > 0) {
        return results[0].name;
      } else {
        return `Lat: ${latitude}, Lon: ${longitude}`;
      }
    } catch (error) {
      console.warn('Error fetching nearby places:', error);
      return `Lat: ${latitude}, Lon: ${longitude}`;
    }
  };

  // Function to request location permissions and get the current location
  const handleAutoFillLocation = async () => {
    setLoading(true); // Show loading animation
    // Request permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required.');
      setLoading(false); // Hide loading animation
      return;
    }

    // Get location
    try {
      let { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = coords;
      setLocation(`Lat: ${latitude}, Lon: ${longitude}`);

      // Reverse geocoding
      const reverseGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await axios.get(reverseGeocodeUrl);
      const results = response.data.results;
      if (results.length > 0) {
        setAddress(results[0].formatted_address);
      } else {
        // Fetch nearest place if no address found
        const nearestPlace = await fetchNearestPlace(latitude, longitude);
        setAddress(nearestPlace);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch location');
    } finally {
      setLoading(false); // Hide loading animation
    }
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== '' && !chosenItems.includes(inputValue.trim())) {
      setChosenItems([...chosenItems, inputValue.trim()]);
      setInputValue(''); // Clear input field
    }
  };

  const handleRemoveItem = (item) => {
    setChosenItems(chosenItems.filter(i => i !== item));
  };

  const renderItem = ({ item }) => (
    <View style={styles.chosenItem}>
      <Text style={styles.chosenItemText}>{item}</Text>
      <TouchableOpacity onPress={() => handleRemoveItem(item)}>
        <Icon name="times" size={20} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.label}>What:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter job or task"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chosenItemsContainer}
        >
          {chosenItems.map((item) => (
            <View key={item} style={styles.chosenItem}>
              <Text style={styles.chosenItemText}>{item}</Text>
              <TouchableOpacity onPress={() => handleRemoveItem(item)}>
                <Icon name="times" size={20} color="#FF0000" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.label}>Where:</Text>
        <View style={styles.locationContainer}>
          <TextInput
            style={styles.locationInput}
            placeholder="Enter location"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <TouchableOpacity style={styles.locationButton} onPress={handleAutoFillLocation}>
            <Icon name="location-arrow" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require('../assets/loading.json')}
            autoPlay
            loop
            style={styles.loadingAnimation}
          />
          <Text style={styles.loadingText}>Fetching location...</Text>
        </View>
      ) : (
        <View style={styles.bottomSection}>
          <View style={styles.animationContainer}>
            <LottieView
              source={require('../assets/look.json')}
              autoPlay
              loop
              style={styles.animation}
            />
          </View>

          <Text style={styles.infoText}>
            Manage your hustle-link profile, view recommended jobs, save searches, and save jobs
          </Text>

          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>SIGN IN</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  topSection: {
    paddingTop: 40,
    padding: 16,
    backgroundColor: '#f1f1f1',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#009B77', // Button color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40, // Ensure consistent height with input
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chosenItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chosenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  chosenItemText: {
    fontSize: 16,
    marginRight: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  locationButton: {
    backgroundColor: '#009B77',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40, // Ensure consistent height with input
  },
  button: {
    backgroundColor: '#009B77',
    paddingVertical: 12,
    paddingHorizontal: 15, // Adjust for consistent width
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    height: 40, // Ensure consistent height with other buttons
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 20,
  },
  loadingAnimation: {
    width: 200,
    height: 200,
  },
  loadingText: {
    fontSize: 18,
    color: '#000',
    marginTop: 10,
  },
  animationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
  infoText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  signInButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 15, 
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
    height: 40, // Ensure consistent height with other buttons
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: '#000',
  },
  registerLink: {
    fontSize: 16,
    color: '#FF0000',
    fontWeight: 'bold',
  },
});
