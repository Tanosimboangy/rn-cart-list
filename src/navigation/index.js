import React from 'react';
import CurrentList from '../screens/CurrentList';
import ItemDetails from '../screens/ItemDetails';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';

const Stack = createStackNavigator();
const CurrentListStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CurrentList" component={CurrentList} />
        <Stack.Screen
          name="ItemDetails"
          component={ItemDetails}
          options={({route}) => {
            return {
              headerTitle: () => {
                return <Text>{route.params.item.name}</Text>;
              },
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default CurrentListStack;
