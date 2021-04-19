import {createStackNaviagtor, createAppContainer} from 'react-navigation';

import CurrentList from '../screens/CurrentList';

const CurrentListStack = createStackNaviagtor({
  CurrentList: {
    screen: CurrentList,
    navigationOptions: {
      HeaderTitle: 'Shopping List',
    },
  },
  ItemDetails: {
    screen: ItemDetails,
    navigationOptions: ({navigation}) => ({
      HeaderTitle: navigation.getParam('item', {}).name,
    }),
  },
});

export default createAppContainer(CurrentListStack);
