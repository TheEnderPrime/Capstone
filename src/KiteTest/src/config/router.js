import React from 'react';
import Colors from '../Colors/Colors';
import { Text, } from 'react-native';
import {TabNavigator, StackNavigator, DrawerNavigator, Button, TabBarBottom, } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Splash   from '../components/Splash/Splash';
import Logout   from '../components/Logout/Logout';

import { 
    WelcomeStack, 
    TimelineStack, 
    CommunityStack, 
    ProfileStack, 
    SettingsStack, 
    EventsStack, 
    PostStack, 
    NotificationStack, 
    DiscoverStack,
    SearchStack,
    ProfileSettingsStack,
 } from './stackNavigators';


//Create navigator for each page that contains the tab navigation
//create overarching stack navigator that contains the different pages?
//add drawer to stack navigator



// - - - - - - - TABS NAVIGATION - - - - - - - - - -
export const Tabs = TabNavigator(
    {
    Timeline:  { screen: TimelineStack },
    Events:    { screen: EventsStack },
    Community: { screen: CommunityStack }, 
    Profile:   { screen: ProfileStack },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Timeline') {
                    iconName = `list${focused ? '' : ''}`;
                } else if (routeName === 'Events') {
                    iconName = `create${focused ? '' : ''}`;
                } else if (routeName === 'Community') {
                    iconName = `comment${focused ? '' : ''}`;
                } else if (routeName === 'Profile') {
                    iconName = `person${focused ? '' : '-outline'}`;
                }

            return <MaterialIcons name={iconName} size={25} color={tintColor} />;
            },
        }),
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
    Search: {
        screen: SearchStack,
    },
    Discover: {
        screen: DiscoverStack,
    },
	Settings: {
		screen: SettingsStack,
    },
    Logout: {
        screen: Logout,
    }
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