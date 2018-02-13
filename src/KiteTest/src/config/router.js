import React from 'react';
import Colors from '../Colors/Colors';
import {TabNavigator, StackNavigator, DrawerNavigator, Button, TabBarBottom } from 'react-navigation';

import Splash   from '../components/Splash/Splash';
import Welcome  from '../components/Welcome/Welcome';
import Login    from '../components/Login/Login';
import Signup   from '../components/Signup/Signup';
import Timeline from '../components/Timeline/Timeline';
import Profile  from '../components/Profile/Profile';
import Events   from '../components/Events/Events';
import Posts    from '../components/Posts/Posts';
import Community from '../components/Community/Community';


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
    Community: {
        screen: Community,
    },
});

export const ProfileStack = StackNavigator({
    Profile: {
        screen: Profile,
    },
});

export const PostStack = StackNavigator({
    Posts: {
        screen: Posts,
    },
});

export const NotificationStack = StackNavigator({
    Notifications: {
        screen: Timeline,
    },
});

export const SettingsStack = StackNavigator({
    Settings: {
        screen: Timeline,
    },
});

export const EventsStack = StackNavigator({
    Events: {
        screen: Events,
    },
});


export const Tabs = TabNavigator({
    Timeline: {
        screen: TimelineStack,
        navigationOptions: {
          tabBarLabel: 'Timeline',
        },
    },
    Events: {
        screen: EventsStack,
        navigationOptions: {
          tabBarLabel: 'Events',
        },
    },
    Community: {
        screen: CommunitiyStack,
        navigationOptions: {
            tabBarLabel: 'Community',
        },
    }, 
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
          tabBarLabel: 'Profile',
        },
    },
},
{
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
}
);

// navigator for the drawer navigation
export const Drawer = DrawerNavigator({
    Profile: {
        screen: Profile,
    },
});

// main navigator that moves between all the major navigators
export const Root = StackNavigator({ 
    // Splash : {
    //     screen: Splash,
    // },
    // WelcomeStack : {
    //     screen: WelcomeStack,
    // },
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