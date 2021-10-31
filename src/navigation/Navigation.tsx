import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { DetailScreen } from '../screens/DetailScreen';
import { HomeScreen } from '../screens/HomeScreen';

// export type RootStackParamList = {
//   HomeScreen: undefined;
//   DetailScreen: undefined;
// };

// const Stack = createStackNavigator<RootStackParams>();
const Stack = createStackNavigator();

export const Navigation =() => {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#f0f0f5' },
    }}
    >
      <Stack.Screen name="HomeScreen" options={{title:"HomeScreen"}}  component={HomeScreen} />
      <Stack.Screen name="DetailScreen" options={{title:"DetailScreen"}} component={DetailScreen} />
    </Stack.Navigator>
  );
}