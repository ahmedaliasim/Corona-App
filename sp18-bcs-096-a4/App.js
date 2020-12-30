import * as React from 'react';
import { Button, View, Ionicons, FontAwesome } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CountryStatistics from './components/CountryStatistics';
import StatisticsOfWorld from './components/StatisticsOfWorld';
import FavCountry from './components/FavCountry';
import StatisticsByCountry from './components/StatisticsByCountry';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Statistics of world">
        <Drawer.Screen name="Statistics of Country" component={StackNavigator} />
      
        <Drawer.Screen name="Statistics of world" component={StatisticsOfWorld} />
        <Drawer.Screen name="Favorite Countries" component={FavCountry} />
      </Drawer.Navigator>
      
    </NavigationContainer>
  );
}
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Statistics of Country"}
      
    >
    
      <Stack.Screen
        name="Statistics of Country"
        component={CountryStatistics}
        options={{
         
          headerStyle: {
            backgroundColor: '#2f3b39',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
        
      />
      <Stack.Screen
        name="StatisticsByCountry"
        component={StatisticsByCountry}
         options={{
         
          headerStyle: {
            backgroundColor: '#2f3b39',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
        
        
      />
      
    </Stack.Navigator>
  )
}
