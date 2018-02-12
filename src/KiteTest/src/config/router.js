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
import Posts    from '../components/Posts/Posts';
import { STATUS_CODES } from 'http';

//Create navigator for each page that contains the tab navigation
//create overarching stack navigator that contains the different pages?
//add drawer to stack navigator

//headerLeft: <Button title="Menu" onPress={(navigation)=>{ navigation.navigate('DrawerOpen'); }} />,

// opening stack navigator for Login/Signup pages - Called from Splash.js
// needs to navigate('Tabs'); to navigate to the main pages of the app
export const WelcomeStack = StackNavigator({
    Welcome: { 
        screen: Welcome,
        navigationOptions: {
            title: 'Welcome',
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
  });

export const TimelineStack = StackNavigator({
    Timeline: {
        screen: Timeline,
    },
});

export const CommunitiyStack = StackNavigator({
    Timeline: {
        screen: Timeline,
    },
});

export const ProfileStack = StackNavigator({
    Timeline: {
        screen: Timeline,
    },
});

export const PostStack = StackNavigator({
    Timeline: {
        screen: Timeline,
    },
});

export const NotificationStack = StackNavigator({
    Timeline: {
        screen: Timeline,
    },
});

export const SettingsStack = StackNavigator({
    Timeline: {
        screen: Timeline,
    },
});

export const EventsStack = StackNavigator({
    Timeline: {
        screen: Timeline,
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
    //Communities?
    },
});

// navigator for the drawer navigation
export const Drawer = DrawerNavigator({
    Profile: {
        screen: Profile,
    },
});

// main navigator that moves between all the major navigators
export const Root = StackNavigator({ 
    Splash : {
        screen: Splash,
    },
    WelcomeStack : {
        screen: WelcomeStack,
    },
    Tabs : {
        screen: Tabs,
    },
    Drawer: {
        screen: Drawer,
    }
},  {
        mode: 'modal',
        headerMode: 'none',
});