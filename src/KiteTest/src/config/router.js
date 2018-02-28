import React from 'react';
import Colors from '../Colors/Colors';
import { Text, } from 'react-native';
import {TabNavigator, StackNavigator, DrawerNavigator, Button, TabBarBottom, } from 'react-navigation';

import Splash   from '../components/Splash/Splash';

import { WelcomeStack, TimelineStack, CommunityStack, ProfileStack, SettingsStack, EventsStack, PostStack, NotificationStack, } from './stackNavigators';


//Create navigator for each page that contains the tab navigation
//create overarching stack navigator that contains the different pages?
//add drawer to stack navigator



// - - - - - - - TABS NAVIGATION - - - - - - - - - -
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
        screen: CommunityStack,
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
    tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    
},
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
}
);

// - - - - - - - - - - - DRAWER NAVIAGTION - - - - - - - - - -
//navigator for the drawer navigation
export const Drawers = DrawerNavigator({
    Home: {
        screen: Tabs,
    },
	Notifications: {
		screen: NotificationStack,
	},
	Settings: {
		screen: SettingsStack,
	},
}, {
});

// - - - - - - - - - - - - - - MAIN NAVIGATOR - - - - - - - - - - - - -
//main navigator that moves between all the major navigators
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
    Drawers: {
        screen: Drawers,
    }
},  {
		headerMode: 'none',
		title: 'Main',
		initialRouteName: 'Splash'
});