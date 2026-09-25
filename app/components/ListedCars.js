import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import ListedCarItem from './ListedCarItem'

const FirstRoute = () => (
  <ListedCarItem/>
);

const SecondRoute = () => (
  <ListedCarItem/>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function ListedCars() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title:  'Pending'},
    { key: 'second', title: 'Approved' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: 'pink' }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      indicatorStyle={{ backgroundColor: 'white' }}
      renderTabBar={renderTabBar}
    />
  );
}