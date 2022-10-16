import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Greet from './views/Greet'
import Thanks from './views/Thanks'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Greet" component={Greet} />
          <Tab.Screen name="Thanks" component={Thanks} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
