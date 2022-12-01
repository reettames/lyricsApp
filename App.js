import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from "./Search";
import Favorites from "./Favorites";
import Music from "./Music";
const Tab = createBottomTabNavigator();
export default function App() { 
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={({route }) => ({
        tabBarIcon: ({ focused, color, size }) => { 
          let iconName;
      
          if (route.name === 'Music') {
              iconName = 'musical-notes-outline';
          } else if (route.name === 'Favorites') {
             iconName = 'heart-circle';
          } else if (route.name === 'Search') {
            iconName = 'ios-search-circle-outline';
         }
           return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Music"component={Music} />
        <Tab.Screen name="Favorites"component={Favorites} />
        <Tab.Screen name="Search"component={Search} />
      </Tab.Navigator>
    </NavigationContainer>  
    );
  }
