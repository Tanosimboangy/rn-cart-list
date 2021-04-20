import React from 'react';
import {SafeAreaView, SectionList, KeyboardAvoidingView} from 'react-native';
import ListItem, {Separator, SectionHeader} from '../components/ListItem';
import AddItem from '../components/AddItem';
import {useCurrentList} from '../util/ListManager';

export default () => {
  const {favorite} = useCurrentList();
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <SectionList
          sections={[{title: 'favorite', data: favorite}]}
          renderSectionHeader={({section}) => (
            <SectionHeader title={section.title} />
          )}
          renderItem={({item}) => <ListItem name={item.name} />}
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
