import React from 'react';
import Colors from '../Colors/Colors';
import {TabNavigator, StackNavigator, DrawerNavigator, Button } from 'react-navigation';

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
                backgroundColor: Colors.kite_greenMediumDark,
            },
            headerTitleStyle: {
                alignSelf: 'center',
                color: Colors.kite_greenLight,
            },
            headerBackTitleStyle: {
                color: Colors.kite_greenLight,
            },
            headerTintColor: Colors.kite_greenLight,
        },
    },
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Login',
            //headerLeft: <Button title="Menu" onPress={(navigation)=>{ navigation.navigate('DrawerOpen'); }} />,
            headerStyle: {
                backgroundColor: Colors.kite_greenMediumDark,
            },
            headerTitleStyle: {
                color: Colors.kite_greenLight,
            },
            headerBackTitleStyle: {
                color: Colors.kite_greenLight,
            },
            headerTintColor: Colors.kite_greenLight,
        },
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            title: 'Signup',
            headerStyle: {
                backgroundColor: Colors.kite_greenMediumDark,
            },
            headerTitleStyle: {
                color: Colors.kite_greenLight,
            },
            headerBackTitleStyle: {
                color: Colors.kite_greenLight,
            },
            headerTintColor: Colors.kite_greenLight,
        },
    },
    Timeline: {
        screen: Timeline,
        navigationOptions: {
            title: 'Timeline',
            headerStyle: {
                backgroundColor: Colors.kite_greenMediumDark,
            },
            headerTitleStyle: {
                color: Colors.kite_greenLight,
            },
            headerBackTitleStyle: {
                color: Colors.kite_greenLight,
            },
            headerTintColor: Colors.kite_greenLight,
        },
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profile',
            headerStyle: {
                backgroundColor: Colors.kite_greenMediumDark,
            },
            headerTitleStyle: {
                color: Colors.kite_greenLight,
            },
            headerBackTitleStyle: {
                color: Colors.kite_greenLight,
            },
            headerTintColor: Colors.kite_greenLight,
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

export const MainScreen = DrawerNavigator({
    Profile: {
        screen: Profile,
    },
});

export const Root = StackNavigator({
    OpeningStack : {
        screen: OpeningStack,
    },
    Tabs : {
        screen: Tabs,
    },
    MainScreen : {
        screen: Profile,
    },
},  {
        mode: 'modal',
        headerMode: 'none',
});