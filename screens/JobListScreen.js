import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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
      { id: '1', title: 'Software Developer', company: 'Company A', location: 'Nairobi', salary: 'KSh 120,000 - 150,000' },
      { id: '2', title: 'Graphic Designer', company: 'Company B', location: 'Mombasa', salary: 'KSh 80,000 - 100,000' },
    ];
    setJobs(fetchedJobs);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended for You</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.job} onPress={() => console.log('Job Selected:', item.title)}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobCompany}>{item.company}</Text>
            <Text style={styles.jobLocation}>{item.location}</Text>
            <Text style={styles.jobSalary}>{item.salary}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  job: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#009B77',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  jobCompany: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FF0000',
  },
  jobLocation: {
    fontSize: 16,
    color: '#555555',
    marginTop: 5,
  },
  jobSalary: {
    fontSize: 16,
    color: '#009B77',
    marginTop: 5,
  },
});
