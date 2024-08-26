import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/working-animation2.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
      </View>
      <View style={styles.bottomHalf}>
        <Animatable.View 
          animation="fadeInDown"
          duration={1000}
          style={styles.banner}
        >
          <Animatable.Text 
            animation="bounceIn"
            duration={1000}
            style={styles.bannerText}
          >
            Get Connected
          </Animatable.Text>
          <Animatable.Text 
            animation="fadeIn"
            duration={1500}
            style={styles.subtitle}
          >
            Get connected to the latest Kenyan jobs
          </Animatable.Text>
        </Animatable.View>
        
        <View style={styles.buttonContainer}>
          <Animatable.View 
            animation="fadeInUp"
            duration={1500}
          >
            <TouchableOpacity
              style={[styles.button, styles.serviceProviderButton]}
              onPress={() => navigation.navigate('ServiceProvider')}
            >
              <Text style={styles.buttonText}>Service Provider</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View 
            animation="fadeInUp"
            duration={1500}
            delay={200}
          >
            <TouchableOpacity
              style={[styles.button, styles.serviceSeekerButton]}
              onPress={() => navigation.navigate('ServiceSeeker')}
            >
              <Text style={styles.buttonText}>Service Seeker</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f1f1f1',
  },
  topHalf: {
    flex: 2,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderBottomRightRadius: 75,
    borderBottomLeftRadius: 75,
    overflow: 'hidden',
    position: 'relative',
  },

  bottomHalf: {
    flex: 2,
    backgroundColor: '#f1f1f1',
    borderTopLeftRadius: 75,
    borderTopRightRadius: 75,
    padding: 16,
    justifyContent: 'flex-start',
    position: 'relative',
  },
  banner: {
    marginBottom: 20,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 70,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceProviderButton: {
    backgroundColor: '#009B77',
  },
  serviceSeekerButton: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  animationContainer: {
    alignItems: 'center',
  },
  animation: {
    width: 350,
    height: 350,
  },
});
