import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Image, Button } from 'react-native';
import { Rating } from 'react-native-ratings'; // For displaying ratings
import * as ImagePicker from 'expo-image-picker'; // To handle image picking

const PAGE_SIZE = 2; // Number of jobs per page

const ActivityPage = () => {
  // State for managing jobs
  const [allJobs] = useState([
    { id: '1', role: 'Freelance Web Developer', company: 'Freelance', rating: 4.2 },
    { id: '2', role: 'Event Coordinator', company: 'EventWorks', rating: 4.5 },
    { id: '3', role: 'Content Writer', company: 'WriteRight', rating: 3.8 },
    { id: '4', role: 'Graphic Designer', company: 'DesignCo', rating: 4.0 },
    { id: '5', role: 'Marketing Specialist', company: 'MarketMakers', rating: 4.3 },
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const [jobs, setJobs] = useState(allJobs.slice(0, PAGE_SIZE));
  const [loading, setLoading] = useState(false);

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState(null);

  // Rating and Job Description
  const currentRating = 4.3;
  const [isEditing, setIsEditing] = useState(false);
  const [jobDescription, setJobDescription] = useState(
    'Providing quick fixes for draining pipes/leakages and performs  new installations in minutes.'
  );

  const currentJob = {
    role: 'Plumber',
    company: 'Fix,cut,drain',
  };

  const loadMoreJobs = () => {
    if (loading) return;

    setLoading(true);
    const nextPage = currentPage + 1;
    const startIndex = nextPage * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    // Simulate loading more jobs
    setTimeout(() => {
      setJobs(prevJobs => [
        ...prevJobs,
        ...allJobs.slice(startIndex, endIndex)
      ]);
      setCurrentPage(nextPage);
      setLoading(false);
    }, 1000); // Simulate network delay
  };

  const handleEditPress = () => {
    if (isEditing) {
      // Save changes if in edit mode
      console.log('Description updated:', jobDescription);
    }
    setIsEditing(!isEditing); // Toggle edit mode
  };

  // Handle profile picture selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <Text style={styles.jobRole}>{item.role}</Text>
      <Text style={styles.jobCompany}>{item.company}</Text>
      <Rating
        imageSize={20}
        readonly
        startingValue={item.rating}
        style={styles.rating}
        ratingColor="#009B77"
      />
      <Text style={styles.ratingText}>{item.rating ? item.rating.toFixed(1) : 'No Rating'}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Picture Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickImage} style={styles.profilePictureContainer}>
          <Image
            source={profilePicture ? { uri: profilePicture } : require('../assets/profile.jpg')}
            style={styles.profilePicture}
          />
        </TouchableOpacity>
        <Text style={styles.profileName}>Joseck Osugo</Text>
      </View>

      {/* Current Job Description */}
      <View style={styles.currentJobContainer}>
        <Text style={styles.sectionTitle}>Role : Plumber</Text>
        {/* <Text style={styles.currentJobRole}>Duties : {currentJob.role}</Text> */}
        {/* <Text style={styles.currentJobCompany}>{currentJob.company}</Text> */}
        <TextInput
          style={styles.currentJobDescription}
          multiline
          value={jobDescription}
          onChangeText={setJobDescription}
          editable={isEditing}
        />
        <TouchableOpacity onPress={handleEditPress} style={styles.editButton}>
          <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      {/* Ratings */}
      <View style={styles.ratingsContainer}>
        <Text style={styles.sectionTitle}>Current Rating</Text>
        <Rating
          imageSize={30}
          readonly
          startingValue={currentRating}
          style={styles.rating}
          ratingColor="#009B77"
        />
        <Text style={styles.ratingText}>{currentRating.toFixed(1)} out of 5</Text>
      </View>

      {/* Previous Jobs */}
      <View style={styles.previousJobsContainer}>
        <Text style={styles.sectionTitle}>Previous Jobs</Text>
        <FlatList
          data={jobs}
          renderItem={renderJobItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.jobsList}
          onEndReached={loadMoreJobs}
          onEndReachedThreshold={0.5} // Trigger load more when scrolled to half of the list
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#009B77" /> : null
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // White background to contrast with flag colors
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePictureContainer: {
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#009B77', // Kenyan flag green
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000', // Black for text
  },
  currentJobContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    borderColor: '#000000', // Black border
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // Black for section titles
    marginBottom: 12,
  },
  currentJobRole: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000', // Black for job role
  },
  currentJobCompany: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FF0000', // Red for company name
    marginVertical: 6,
  },
  currentJobDescription: {
    fontSize: 18,
    color: '#666666',
    marginTop: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    borderColor: '#009B77', // Kenyan flag green
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#009B77', // Kenyan flag green
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    color: '#ffffff',
  },
  ratingsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    borderColor: '#000000', // Black border
    borderWidth: 1,
  },
  rating: {
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 18,
    color: '#666666',
  },
  previousJobsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    borderColor: '#000000',
    borderWidth: 1,
  },
  jobItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#009B77', // Kenyan flag green
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  jobRole: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000', // Black for job role
  },
  jobCompany: {
    fontSize: 18,
    fontWeight: '500',
    color: '#009b77', // Red for company name
  },
  jobsList: {
    paddingBottom: 10,
  },
});

export default ActivityPage;
