// screens/JobListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import * as Location from 'expo-location';

export default function JobListScreen() {
  const [location, setLocation] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Simulate fetching job data
      fetchJobs(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchJobs = async (latitude, longitude) => {
    // Simulate an API call to fetch jobs
    // Replace this with an actual API call
    const fetchedJobs = [
      { id: '1', title: 'Software Developer', company: 'Company A' },
      { id: '2', title: 'Graphic Designer', company: 'Company B' },
    ];
    setJobs(fetchedJobs);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jobs Near You</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.job}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobCompany}>{item.company}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  job: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  jobTitle: {
    fontSize: 18,
  },
  jobCompany: {
    fontSize: 16,
    color: '#555',
  },
});
