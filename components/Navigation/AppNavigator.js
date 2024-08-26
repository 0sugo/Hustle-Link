import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../screens/HomeScreen';
import JobListScreen from '../../screens/JobListScreen';
import ServiceSeeker from '../../screens/ServiceSeeker';
import ProfileScreen from '../../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import CareerAdviceScreen from '../../screens/CareerAdviceScreen';
import ActivityScreen from '../../screens/ActivityScreen';

// Create stack navigators
const HomeStack = createStackNavigator();

// Define stack navigators
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* <HomeStack.Screen name="Jobs" component={JobListScreen} /> */}
      <HomeStack.Screen
        name="ServiceSeeker"
        component={ServiceSeeker}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

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
        activeTintColor: '#FF0000',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#f1f1f1',
          borderTopColor: 'transparent',
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Recommended" component={JobListScreen} />
      <Tab.Screen name="My Activity" component={ActivityScreen} />
      <Tab.Screen name="Career" component={CareerAdviceScreen} />
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
