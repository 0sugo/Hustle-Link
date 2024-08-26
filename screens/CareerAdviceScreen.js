import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, Text, StyleSheet, View, FlatList } from 'react-native';
import LottieView from 'lottie-react-native'; // Import LottieView

const CareerAdviceScreen = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const newsSlideAnim = useRef(new Animated.Value(-100)).current;

  // Start animations on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start(),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }).start(),
      Animated.timing(newsSlideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }).start(),
    ]);
  }, [fadeAnim, slideAnim, newsSlideAnim]);

  // Data for the news section
  const newsData = [
    { id: '1', title: 'Tech Startups Securing Major Investments', description: 'Several tech startups in Kenya have recently secured significant investments from international venture capitalists.' },
    { id: '2', title: 'New Government Initiative for Youth Employment', description: 'The Kenyan government has launched a new initiative aimed at increasing youth employment through training and subsidies.' },
    { id: '3', title: 'Top Job Fair Events in Nairobi This Month', description: 'Don’t miss the upcoming job fairs in Nairobi, offering networking opportunities and direct interviews with top companies.' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDescription}>{item.description}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Trendy News Section */}
      <Animated.View style={[styles.newsContainer, { transform: [{ translateY: newsSlideAnim }] }]}>
        <Text style={styles.sectionTitle}>Trendy News of Opportunities</Text>
        <FlatList
          data={newsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.newsList}
        />
      </Animated.View>

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.title}>Career Advice for Kenya</Text>

        {/* First Section */}
        <Animated.View style={[styles.section, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.subtitle}>1. Emerging Sectors</Text>
          <Text style={styles.paragraph}>
            In Kenya, sectors like technology, agribusiness, and renewable energy are growing rapidly. 
            Acquiring skills in these areas can be highly beneficial for career growth.
          </Text>
        </Animated.View>

        {/* Lottie Animation */}
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/tech.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>

        {/* Second Section */}
        <Animated.View style={[styles.section, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.subtitle}>2. Professional Certifications</Text>
          <Text style={styles.paragraph}>
            Consider certifications in fields like IT, project management, and finance. Certifications 
            from recognized institutions can enhance your job prospects.
          </Text>
        </Animated.View>

        {/* Lottie Animation */}
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/certification.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>

        {/* Third Section */}
        <Animated.View style={[styles.section, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.subtitle}>3. Networking and Events</Text>
          <Text style={styles.paragraph}>
            Attend local networking events, career fairs, and industry conferences to connect with 
            professionals and discover job opportunities.
          </Text>
        </Animated.View>

        {/* Lottie Animation */}
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/networking.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>

        {/* Fourth Section */}
        <Animated.View style={[styles.section, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.subtitle}>4. Job Portals</Text>
          <Text style={styles.paragraph}>
            Utilize Kenyan job portals like BrighterMonday, MyJobMag, and Fuzu for job searching and career 
            development resources.
          </Text>
        </Animated.View>

        {/* Lottie Animation */}
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/jobs_scan.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>

        {/* Fifth Section */}
        <Animated.View style={[styles.section, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.subtitle}>5. Cultural Insights</Text>
          <Text style={styles.paragraph}>
            Understanding local workplace culture and expectations can help you navigate your career 
            more effectively in Kenya.
          </Text>
        </Animated.View>

        {/* Lottie Animation */}
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/culture.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  newsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 15,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  newsList: {
    paddingBottom: 10,
  },
  newsItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  newsDescription: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
  },
  content: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 15,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  section: {
    marginTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555555',
  },
  paragraph: {
    fontSize: 16,
    marginTop: 10,
    lineHeight: 24,
    color: '#666666',
  },
  animationContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  animation: {
    width: 150,
    height: 150,
  },
});

export default CareerAdviceScreen;
