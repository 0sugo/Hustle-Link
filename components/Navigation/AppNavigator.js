import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../screens/HomeScreen';
import JobListScreen from '../../screens/JobListScreen';
import ServiceSeeker from '../../screens/ServiceSeeker';
// import RecommendedScreen from '../../screens/RecommendedScreen'; // Example screen
// import MyActivityScreen from '../../screens/MyActivityScreen'; // Example screen
// import CareerScreen from '../../screens/CareerScreen'; // Example screen
// import ProfileScreen from '../../screens/ProfileScreen'; // Example screen
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileScreen from '../../screens/ProfileScreen';

// Create stack navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for the screens
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Jobs" component={JobListScreen} />
      <Stack.Screen name="ServiceSeeker" component={ServiceSeeker} />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Recommended':
              iconName = 'star';
              break;
            case 'My Activity':
              iconName = 'list';
              break;
            case 'Career':
              iconName = 'briefcase';
              break;
            case 'Profile':
              iconName = 'user';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FF0000', // Red color for active tab
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#f1f1f1', // Tab bar background color
          borderTopColor: 'transparent', // Hide the top border
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Recommended" component={HomeStack} />
      <Tab.Screen name="My Activity" component={HomeStack} />
      <Tab.Screen name="Career" component={HomeStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
}

export default AppNavigator;
