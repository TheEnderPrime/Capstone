import React from 'react';
import Colors from '../Colors/Colors';
import { Text, Alert, } from 'react-native';
import { Button } from 'react-native-elements';
import {TabNavigator, StackNavigator, DrawerNavigator, TabBarBottom, } from 'react-navigation';
import Icon  from "react-native-vector-icons/MaterialIcons";

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
import ProfileSettings      from '../components/Settings_Profile/profileSettings';
import CommunitySettings      from '../components/Settings_Community/communitySettings';
import Discover             from '../components/Discover/Discover';
import Search               from '../components/Search/Search';

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
});

export const TimelineStack = StackNavigator({
    Timeline: {
        screen: KiteTimeline,
        navigationOptions: {
            title: 'Timeline',
            drawerLabel: 'Home',
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
            headerRight: (
                <Button
                title=''
                icon={
                    <Icon
                    name='create'
                    size={15}
                    color='white'
                    />
                }
                buttonStyle={{
                    backgroundColor: "rgba(92, 99,216, 1)",
                    width: 40,
                    height: 40,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                }}
                containerStyle={{ marginRight: 20 }}
                onPress = {() => Alert.alert("You Pressed A Button!")}
                // onPress = {() => this.props.navigation.navigate("Settings")}
                />
            ),
        },
    },
    Event: {
        screen: Event,
        navigationOptions: {
            title: 'Event',
            drawerLabel: 'Home',
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
            headerRight: (
                <Button
                title=''
                icon={
                    <Icon
                    name='create'
                    size={15}
                    color='white'
                    />
                }
                buttonStyle={{
                    backgroundColor: "rgba(92, 99,216, 1)",
                    width: 40,
                    height: 40,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                }}
                containerStyle={{ marginRight: 20 }}
                onPress = {() => Alert.alert("You Pressed A Button!")}
                // onPress = {() => this.props.navigation.navigate("Settings")}
                />
            ),
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
            headerRight: (
                <Button
                title=''
                icon={
                    <Icon
                    name='create'
                    size={15}
                    color='white'
                    />
                }
                buttonStyle={{
                    backgroundColor: "rgba(92, 99,216, 1)",
                    width: 40,
                    height: 40,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                }}
                containerStyle={{ marginRight: 20 }}
                onPress = {() => Alert.alert("You Pressed A Button!")}
                // onPress = {() => this.props.navigation.navigate("Settings")}
                />
            ),
        },
    },
    PostCreator: {
        screen: PostCreator,
        navigationOptions: {
            title: 'Post Creator',
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
            headerRight: (
                <Button
                title=''
                icon={
                    <Icon
                    name='create'
                    size={15}
                    color='white'
                    />
                }
                buttonStyle={{
                    backgroundColor: "rgba(92, 99,216, 1)",
                    width: 40,
                    height: 40,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                }}
                containerStyle={{ marginRight: 20 }}
                onPress = {() => Alert.alert("You Pressed A Button!")}
                // onPress = {() => this.props.navigation.navigate("Settings")}
                />
            ),
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
            headerRight: (
                <Button
                title=''
                icon={
                    <Icon
                    name='create'
                    size={15}
                    color='white'
                    />
                }
                buttonStyle={{
                    backgroundColor: "rgba(92, 99,216, 1)",
                    width: 40,
                    height: 40,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                }}
                containerStyle={{ marginRight: 20 }}
                onPress = {() => Alert.alert("You Pressed A Button!")}
                // onPress = {() => this.props.navigation.navigate("Settings")}
                />
            ),
        },
    },
    Settings: {
        screen: CommunitySettings,
        navigationOptions: {
            title: 'Community Settings',
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
            headerRight: (
                <Button
                title=''
                icon={
                    <Icon
                    name='create'
                    size={15}
                    color='white'
                    />
                }
                buttonStyle={{
                    backgroundColor: "rgba(92, 99,216, 1)",
                    width: 40,
                    height: 40,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                }}
                containerStyle={{ marginRight: 20 }}
                onPress = {() => Alert.alert("You Pressed A Button!")}
                // onPress = {() => this.props.navigation.navigate("Settings")}
                />
            ),
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
            headerRight: (
                <Button
                title=''
                icon={
                    <Icon
                    name='create'
                    size={15}
                    color='white'
                    />
                }
                buttonStyle={{
                    backgroundColor: "rgba(92, 99,216, 1)",
                    width: 40,
                    height: 40,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                }}
                containerStyle={{ marginRight: 20 }}
                onPress = {() => Alert.alert("You Pressed A Button!")}
                // onPress = {() => this.props.navigation.navigate("Settings")}
                />
            ),
        },
    },
    Settings: {
        screen: ProfileSettings,
        navigationOptions: {
            title: 'Profile Settings',
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
            headerRight: (
                <Button
                title=''
                icon={
                    <Icon
                    name='create'
                    size={15}
                    color='white'
                    />
                }
                buttonStyle={{
                    backgroundColor: "rgba(92, 99,216, 1)",
                    width: 40,
                    height: 40,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                }}
                containerStyle={{ marginRight: 20 }}
                onPress = {() => Alert.alert("You Pressed A Button!")}
                // onPress = {() => this.props.navigation.navigate("Settings")}
                />
            ),
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

export const DiscoverStack = StackNavigator({
    Discover: {
        screen: Discover,
        navigationOptions: {
            title: 'Discover',
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

export const SearchStack = StackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Search',
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