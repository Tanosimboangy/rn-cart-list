import React, {useState} from 'react';
import {v4 as uuid} from 'uuid';
import {SafeAreaView, FlatList, KeyboardAvoidingView} from 'react-native';
import nachos from '../data/nachos';
import ListItem, {Separator} from '../components/ListItem';
import AddItem from '../components/AddItem';
export default () => {
  const [list, setList] = useState(nachos);
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <FlatList
          data={list}
          renderItem={({item, index}) => (
            <ListItem
              name={item.name}
              onFavoritePress={() => alert('todo: handle favorite')}
              isFavorite={index < 2}
              onAddedSwipe={() => alert('todo: on added swipe')}
              onDeleteSwipe={() => alert('todo: on delete swipe')}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <Separator />}
          ListHeaderComponent={() => {
            return (
              <AddItem
                onSubmitEditing={({nativeEvent: {text}}) => {
                  setList([{id: uuid(), name: text}, ...list]);
                }}
              />
            );
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
