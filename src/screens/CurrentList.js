import React from 'react';
import {SafeAreaView, FlatList, KeyboardAvoidingView, Text} from 'react-native';
import ListItem, {Separator} from '../components/ListItem';
import AddItem from '../components/AddItem';
import {useCurrentList} from '../util/ListManager';

// const updateStoredCurrentList = list => {
//   // A way of storing data into local storage
//   AsyncStorage.setItem('@@Grocery/currentList', JSON.stringify(list));
// };

export default () => {
  const {list, loading, addItem, removeItem} = useCurrentList();
  // const [list, setList] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const addItem = text => {
  //   const newList = [{id: uuid(), name: text}, ...list];
  //   setList(newList);
  //   updateStoredCurrentList(newList);
  // };

  // const removeItem = id => {
  //   const newList = list.filter(item => item.id !== id);
  //   setList(newList);
  //   updateStoredCurrentList(newList);
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     AsyncStorage.getItem('@@Grocery/currentList')
  //       .then(data => JSON.parse(data))
  //       .then(data => {
  //         if (data) {
  //           setList(data);
  //         }
  //         setLoading(false);
  //       });
  //   }, 1000);
  // }, []);

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
        <FlatList
          data={list}
          renderItem={({item, index}) => (
            <ListItem
              name={item.name}
              onFavoritePress={() => alert('todo: handle favorite')}
              isFavorite={index < 2}
              onAddedSwipe={() => removeItem(item.id)}
              onDeleteSwipe={() => removeItem(item.id)}
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
