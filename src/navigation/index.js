import React from 'react';
import CurrentList from '../screens/CurrentList';
import ItemDetails from '../screens/ItemDetails';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, Image, Platform} from 'react-native';
import FavoriteList from '../screens/FavoriteList';

const Stack = createStackNavigator();
const CurrentListStack = () => {
  return (
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
  );
};

const FavoriteListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavouriteList" component={FavoriteList} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, focused}) => {
            let image;
            if (route.name === 'CurrentList') {
              image = Platform.select({
                ios: require('../assets/icons/ios-list.png'),
                android: require('../assets/icons/md-list.png'),
              });
            } else if (route.name === 'FavoriteList') {
              image = Platform.select({
                ios: focused
                  ? require('../assets/icons/ios-star.png')
                  : require('../assets/icons/ios-star-outline.png'),
                android: focused
                  ? require('../assets/icons/md-star.png')
                  : require('../assets/icons/md-star-outline.png'),
              });
            }

            return (
              <Image
                source={image}
                resizeMode="contain"
                style={{width: 25, tintColor: color}}
              />
            );
          },
        })}>
        <Tab.Screen name="CurrentList" component={CurrentListStack} />
        <Tab.Screen name="FavoriteList" component={FavoriteListStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;
