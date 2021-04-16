import {useState, useEffect} from 'react';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';

const updateStoredCurrentList = list => {
  // A way of storing data into local storage
  AsyncStorage.setItem('@@Grocery/currentList', JSON.stringify(list));
};

export const useCurrentList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const addItem = text => {
    const newList = [{id: uuid(), name: text}, ...list];
    setList(newList);
    updateStoredCurrentList(newList);
  };

  const removeItem = id => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
    updateStoredCurrentList(newList);
  };

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('@@Grocery/currentList')
        .then(data => JSON.parse(data))
        .then(data => {
          if (data) {
            setList(data);
          }
          setLoading(false);
        });
    }, 1000);
  }, []);

  return {
    list,
    loading,
    addItem,
    removeItem,
  };
};
