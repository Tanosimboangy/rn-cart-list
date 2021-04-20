import {useState, useEffect} from 'react';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';

const updateStoredCurrentList = list => {
  // A way of storing data into local storage
  AsyncStorage.setItem('@@Grocery/currentList', JSON.stringify(list));
};

const updateStoredCurrentCart = list => {
  // A way of storing data into local storage
  AsyncStorage.setItem('@@Grocery/currentCart', JSON.stringify(list));
};

const updateStoredCurrentFavorite = list => {
  // A way of storing data into local storage
  AsyncStorage.setItem('@@Grocery/currentFavorite', JSON.stringify(list));
};

export const useCurrentList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [favorite, setFavorite] = useState([]);

  const addToFavorite = item => {
    const newFavorite = [item, ...favorite];
    setFavorite(newFavorite);
    updateStoredCurrentFavorite(newFavorite);
  };

  const addItem = text => {
    const newList = [{id: uuid(), name: text}, ...list];
    setList(newList);
    updateStoredCurrentList(newList);
  };

  const addToCart = item => {
    removeItem(item.id);
    const newCart = [item, ...cart];
    setCart(newCart);
    updateStoredCurrentCart(newCart);
  };

  const removeItem = id => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
    updateStoredCurrentList(newList);
  };

  useEffect(() => {
    setTimeout(() => {
      Promise.all([
        AsyncStorage.getItem('@@Grocery/currentList'),
        AsyncStorage.getItem('@@Grocery/currentCart'),
        AsyncStorage.getItem('@@Grocery/currentFavorite'),
      ])
        .then(([list, cartItems, favorite]) => [
          JSON.parse(list),
          JSON.parse(cartItems),
          JSON.parse(favorite),
        ])
        .then(([list, cartItems, favorite]) => {
          if (list) {
            setList(list);
          }

          if (cartItems) {
            setList(cartItems);
          }

          if (favorite) {
            setFavorite(favorite);
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
    cart,
    addToCart,
    favorite,
    addToFavorite,
  };
};
