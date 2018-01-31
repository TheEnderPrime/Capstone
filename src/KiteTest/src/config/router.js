import React from 'react';
import {TabNavigator, StackNavigator } from 'react-navigation';

import Splash   from '../components/Splash/Splash';
import Welcome  from '../components/Welcome/Welcome';
import Login    from '../components/Login/Login';
import Signup   from '../components/Signup/Signup';
import Timeline from '../components/Timeline/Timeline';
import Profile  from '../components/Profile/Profile';
import Events   from '../components/Events/Events';
import Posts   from '../components/Posts/Posts';

export const OpeningStack = StackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: {
            header: null,
        },
    },
    Welcome: { 
        screen: Welcome,
        navigationOptions: {
            title: 'Welcome',
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#78B494',
            },
            headerTitleStyle: {
                alignSelf: 'center',
                color: '#D5EAE0',
            },
            headerBackTitleStyle: {
                color: '#D5EAE0',
            },
            headerTintColor: '#D5EAE0',
        },
    },
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Login',
            headerStyle: {
                backgroundColor: '#78B494',
            },
            headerTitleStyle: {
                color: '#D5EAE0',
            },
            headerBackTitleStyle: {
                color: '#D5EAE0',
            },
            headerTintColor: '#D5EAE0',
        },
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            title: 'Signup',
            headerStyle: {
                backgroundColor: '#78B494',
            },
            headerTitleStyle: {
                color: '#D5EAE0',
            },
            headerBackTitleStyle: {
                color: '#D5EAE0',
            },
            headerTintColor: '#D5EAE0',
        },
    },
    Timeline: {
        screen: Timeline,
        navigationOptions: {
            title: 'Timeline',
            headerStyle: {
                backgroundColor: '#78B494',
            },
            headerTitleStyle: {
                color: '#D5EAE0',
            },
            headerBackTitleStyle: {
                color: '#D5EAE0',
            },
            headerTintColor: '#D5EAE0',
        },
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profile',
            headerStyle: {
                backgroundColor: '#78B494',
            },
            headerTitleStyle: {
                color: '#D5EAE0',
            },
            headerBackTitleStyle: {
                color: '#D5EAE0',
            },
            headerTintColor: '#D5EAE0',
        },
    },
  });

export const Tabs = TabNavigator({
    Timeline: {
        screen: Timeline,
        navigationOptions: {
          tabBarLabel: 'Timeline',
        },
    },
    Events: {
        screen: Events,
        navigationOptions: {
          tabBarLabel: 'Events',
        },
    },
    Posts: {
        screen: Posts,
        navigationOptions: {
          tabBarLabel: 'Posts',
        },
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
          tabBarLabel: 'Profile',
        },
    },
});

export const Root = StackNavigator({
    OpeningStack : {
        screen: OpeningStack,
    },
    Tabs: {
      screen: Tabs,
    },
   // Settings: {
   //   screen: SettingsStack,
   // },
  }, {
    mode: 'modal',
    headerMode: 'none',
  });