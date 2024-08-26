import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Icon name="cog" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="user" size={200} color="#9a9a9a" />
      </View>
      <Text style={styles.title}>Be seen with a Hustle link profile</Text>
      <Text style={styles.paragraph}>
        Receive job opportunities, manage your information, and apply for roles faster.
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 16,
  },
  header: {
    width: '100%',
    height: 60, // Height of the banner
    // backgroundColor: '#fff', // Banner color
    justifyContent: 'center',
    alignItems: 'flex-end', // Align items to the right
    // paddingRight: 20, // Space from the right edge
    position: 'absolute', // Position banner at the top
    top: 0,
    left: 0,
  },
  settingsButton: {
    padding: 10,

  },
  iconContainer: {
    marginTop: 60, // Add margin to prevent overlap with header
    marginBottom: 20, // Space between icon and title
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#009B77', // Color
    textAlign: 'center',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  signInButton: {
    backgroundColor: '#009B77', // Color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
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
    color: '#FF0000', // Red
    fontWeight: 'bold',
  },
});
