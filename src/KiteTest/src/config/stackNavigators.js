import React from 'react';
import Colors from '../Colors/Colors';
import { Text, } from 'react-native';
import {TabNavigator, StackNavigator, DrawerNavigator, Button, TabBarBottom, } from 'react-navigation';

import Splash               from '../components/Splash/Splash';
import Welcome              from '../components/Welcome/Welcome';
import Login                from '../components/Login/Login';
import Signup               from '../components/Signup/Signup';
import KiteTimeline         from '../components/Timeline/KiteTimeline';
import Profile              from '../components/Profile/Profile';
import PostCreator          from '../components/Events/PostCreator';
import EventCreator         from '../components/Events/EventCreator';
import Event                from '../components/Events/Event';
import Posts                from '../components/Posts/Posts';
import Community            from '../components/Community/Community';
import Settings             from '../components/Settings/Settings';
import PersonalInfoSettings from '../components/Settings/PersonalInfoSettings';
import FollowSettings       from '../components/Settings/FollowSettings';
import PrivacySettings      from '../components/Settings/PrivacySettings';
import CommunitiesSettings  from '../components/Settings/CommunitiesSettings';
import LoginSettings        from '../components/Settings/LoginSettings';

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
        screen: KiteTimeline,
        navigationOptions: {
            title: 'Timeline',
            drawerLabel: 'Home', //doesn't work yet
			//headerLeft: drawerButton(this.props.navigation),
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
    Event: {
        screen: Event,
        navigationOptions: {
            title: 'Event Timeline',
            drawerLabel: 'Home', //doesn't work yet
			//headerLeft: drawerButton(this.props.navigation),
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
    Posts: {
        screen: Posts,
        navigationOptions: {
            title: 'Post',
            drawerLabel: 'Home', //doesn't work yet
			//headerLeft: drawerButton(this.props.navigation),
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
    }
});

export const CommunityStack = StackNavigator({
    Community: {
        screen: Community,
        navigationOptions: {
            title: 'Community',
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
    Event: {
        screen: Event,
        navigationOptions: {
            title: 'Community Events',
            drawerLabel: 'Home', //doesn't work yet
			//headerLeft: drawerButton(this.props.navigation),
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
});

export const ProfileStack = StackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profile',
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
    Event: {
        screen: Event,
        navigationOptions: {
            title: 'Your Events',
            drawerLabel: 'Home', //doesn't work yet
			//headerLeft: drawerButton(this.props.navigation),
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
});

export const PostStack = StackNavigator({
    Posts: {
        screen: Posts,
        navigationOptions: {
            title: 'Posts',
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
});

export const NotificationStack = StackNavigator({
    Notifications: {
        screen: KiteTimeline, ////////////////////////CHANGE ME
        navigationOptions: {
            title: 'Notifications',
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
});

export const SettingsStack = StackNavigator({
    Settings: {
        screen: Settings,
        navigationOptions: {
            title: 'Settings',
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
    PersonalInfoSettings: {
        screen: PersonalInfoSettings,
        navigationOptions: {
            title: 'Personal Information Settings',
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
    FollowSettings: {
        screen: FollowSettings, 
        navigationOptions: {
            title: 'Following and Follower Settings',
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
    PrivacySettings: {
        screen: PrivacySettings,
        navigationOptions: {
            title: 'Privacy Settings',
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
    CommunitiesSettings: {
        screen: CommunitiesSettings,
        navigationOptions: {
            title: 'Communities Settings',
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
    LoginSettings: {
        screen: LoginSettings, //////////////////CHANGE ME
        navigationOptions: {
            title: 'Login Settings',
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
});

export const EventsStack = StackNavigator({
    EventCreator: {
        screen: EventCreator,
        navigationOptions: {
            title: 'Event Creator',
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
    Event: {
        screen: Event,
        navigationOptions: {
            title: 'Event',
            headerStyle: {
                backgroundColor: Colors.kite_greenMediumDark,
            },
            headerTitleStyle: {
                //alignSelf: 'center',
                color: Colors.kite_greenLight,
            },
            headerBackTitleStyle: {
                color: Colors.kite_greenLight,
            },
            headerTintColor: Colors.kite_greenLight,
        },
    },
    PostCreator: {
        screen: PostCreator,
        navigationOptions: {
            title: 'Post Creator',
            headerStyle: {
                backgroundColor: Colors.kite_greenMediumDark,
            },
            headerTitleStyle: {
                //alignSelf: 'center',
                color: Colors.kite_greenLight,
            },
            headerBackTitleStyle: {
                color: Colors.kite_greenLight,
            },
            headerTintColor: Colors.kite_greenLight,
        },
    }
});