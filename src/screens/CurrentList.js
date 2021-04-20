import React from 'react';
import {
  SafeAreaView,
  SectionList,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import ListItem, {Separator, SectionHeader} from '../components/ListItem';
import AddItem from '../components/AddItem';
import {useCurrentList} from '../util/ListManager';

export default ({navigation}) => {
  const {
    list,
    loading,
    addItem,
    removeItem,
    cart,
    addToCart,
    addToFavorite,
  } = useCurrentList();

  if (loading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <SectionList
          sections={[
            {title: 'List', data: list},
            {title: 'Cart', data: cart},
          ]}
          renderSectionHeader={({section}) => (
            <SectionHeader title={section.title} />
          )}
          renderItem={({item}) => (
            <ListItem
              name={item.name}
              isFavorite={false}
              onFavoritePress={() => addToFavorite(item)}
              onAddedSwipe={() => addToCart(item)}
              onDeleteSwipe={() => removeItem(item.id)}
              onRowPress={() => {
                navigation.navigate('ItemDetails', {item});
              }}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <Separator />}
          ListHeaderComponent={() => {
            return (
              <AddItem
                onSubmitEditing={({nativeEvent: {text}}) => addItem(text)}
              />
            );
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
