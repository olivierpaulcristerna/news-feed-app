import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import {createSwitchNavigator,createAppContainer,createDrawerNavigator,createBottomTabNavigator,createStackNavigator} from 'react-navigation';

import postDetailView from './components/postDetailView';
import PostsCategoryView from './components/PostsView';

export default class App extends React.Component {

  render() {
    return (
      <AppContainer />
    );
  }
}

const DashboardStackNavigator = createStackNavigator(
  {
    Noticias: { 
      screen: PostsCategoryView,
      navigationOptions: () => ({
        title: 'Noticias',
      }),
    },
    Agropecuaria: { 
      screen: PostsCategoryView,
      navigationOptions: () => ({
        title: 'Agropecuaria',
      }),
      params: {cat_id:'63'}
    },
    Campo: { 
      screen: PostsCategoryView,
      navigationOptions: () => ({
        title: 'Campo',
      }),
      params: {cat_id:'196'}
    },
    Centro: { 
      screen: PostsCategoryView,
      navigationOptions: () => ({
        title: 'Centro',
      }),
      params: {cat_id:'12'}
    },
    Clima: { 
      screen: PostsCategoryView,
      navigationOptions: () => ({
        title: 'Clima',
      }),
      params: {cat_id:'96'}
    },
    Cultura: { 
      screen: PostsCategoryView,
      navigationOptions: () => ({
        title: 'Cultura',
      }),
      params: {cat_id:'519'}
    },
    Deportes: {
      screen: PostsCategoryView,
      navigationOptions: () => ({
        title: 'Deportes',
      }),
      params: {cat_id:'310'}
    },
    DeportesSinaloa: {
      screen: PostsCategoryView,
      navigationOptions: () => ({
        title: 'Deportes Sinaloa',
      }),
      params: {cat_id:'245'}
    },
    Economia: {
      screen: PostsCategoryView,
      navigationOptions: () => ({
        title: 'Economía',
      }),
      params: {cat_id:'414'}
    },
    Entretenimiento: {
      screen: PostsCategoryView,
      navigationOptions: () => ({
        title: 'Entretenimiento',
      }),
      params: {cat_id:'310'}
    },
    Details: { 
      screen: postDetailView,
      navigationOptions: ({ navigation }) => ({
        title: 'Noticia',
        headerLeft: (
          <Icon
            style={{ paddingLeft: 15 }}
            onPress={() => navigation.goBack()}
            name="md-arrow-round-back"
            size={30}
          />
        )
      }),
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 15 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        ),
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Periódico: DashboardStackNavigator,
  Noticias: PostsCategoryView,
  Campo: PostsCategoryView,
  Centro: PostsCategoryView,
  Clima: PostsCategoryView,
  Cultura: PostsCategoryView,
  Deportes: PostsCategoryView,
  DeportesSinaloa: {
    screen: PostsCategoryView,
      navigationOptions: () => ({
        title: 'Deportes Sinaloa',
    }),
  },
  Economia: PostsCategoryView,
  Entretenimiento: PostsCategoryView,
});

const AppContainer = createAppContainer(AppDrawerNavigator);
