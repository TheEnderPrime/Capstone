import React from 'react';
import Colors from '../Colors/Colors';
import { Text, Alert, } from 'react-native';
import { Button } from 'react-native-elements';
import { TabNavigator, StackNavigator, DrawerNavigator, TabBarBottom, withNavigation, } from 'react-navigation';
import Icon  from "react-native-vector-icons/FontAwesome";

import Splash                 from '../components/Splash/Splash';
import Welcome                from '../components/Welcome/Welcome';
import KiteTimeline           from '../components/Timeline/KiteTimeline';
import Profile                from '../components/Profile/Profile';
import Community              from '../components/Community/Community';
import CommunitySelection     from '../components/Community_Selection/communitySelection';
import CommunityCreator       from '../components/Community_Creator/communityCreator';
import Discover               from '../components/Discover/Discover';
import Notifications          from '../components/Notifications/Notifications';
import Calendar               from '../components/Calendar/Calendar';

import Search                 from '../components/Search/Search';
import SearchResults          from '../components/Search_Results/searchResults';
import SearchProfile          from '../components/Search_Profile/searchProfile';
import SearchEvent            from '../components/Search_Event/searchEvent';
import SearchCommunity        from '../components/Search_Community/searchCommunity';

import PostCreator            from '../components/PostCreator/PostCreator';
import PostImageCreator       from '../components/PostCreator/PostImageCreator';
import PostEdit               from '../components/Posts_Edit/PostEdit';
import PostImageEdit          from '../components/Posts_Edit/PostImageEdit';
import EventCreator           from '../components/EventCreator/EventCreator';
import Events                 from '../components/Events/Event';
import EventEdit              from '../components/Events_Edit/EventEdit';
import Posts                  from '../components/Posts/Posts';
import CommentCreator         from '../components/Comment_Creator/CommentCreator';

import MainSettings           from '../components/Settings_Main/mainSettings';

import ProfileSettings        from '../components/Settings_Profile/profileSettings';
import EmailSettings          from '../components/Settings_Profile/emailSettings';
import PasswordSettings       from '../components/Settings_Profile/passwordSettings';
import ProfilePictureSettings from '../components/Settings_Profile/profilePictureSettings';
import PersonalInfoSettings   from '../components/Settings_Profile/personalInfoSettings';
import FollowingSettings      from '../components/Settings_Profile/followingSettings';

import CommunitySettings        from '../components/Settings_Community/communitySettings';
import CommunityPictureSettings from '../components/Settings_Community/communityPictureSettings';
import CommunityInfoSettings    from '../components/Settings_Community/communityInfoSettings';
import FollowerSettings         from '../components/Settings_Community/followerSettings';

// opening stack navigator for Login/Signup Welcome pages - Called from Splash.js
// needs to navigate('Tabs'); to navigate to the main pages of the app

// --- Login and Signup Screens ---
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

// --- Timeline Screens Including Event and Post pages ---
export const TimelineStack = StackNavigator({
    Timeline: {
        screen: KiteTimeline,
        navigationOptions: ( {  navigation } ) => ({
            title: 'Timeline',
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
        }), 
    },
    Event: {
        screen: Events,
        navigationOptions: ( {  navigation } ) => ({
            title: 'Timeline Event',
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
        }), 
    },
    Posts: {
        screen: Posts,
        navigationOptions: ( {  navigation } ) => ({
            title: 'Event Post',
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
        }), 
    },
    PostCreator: {
        screen: PostCreator,
        navigationOptions: {
            title: 'Post Creator',
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
        },
    },
    PostImageCreator: {
        screen: PostImageCreator,
        navigationOptions: {
            title: 'Post Image Creator',
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
    CommentCreator: {
        screen: CommentCreator,
        navigationOptions: {
            title: 'Comment Creator',
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
    EventEdit: {
        screen: EventEdit,
        navigationOptions: {
            title: 'Edit Event',
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
    PostEdit: {
        screen: PostEdit,
        navigationOptions: {
            title: 'Edit Post',
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
    PostImageEdit: {
        screen: PostImageEdit,
        navigationOptions: {
            title: 'Edit Post Images',
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

// --- Community Screens ---
export const CommunityStack = StackNavigator({
    CommunitySelection: {
        screen: CommunitySelection,
        navigationOptions: ( {  navigation } ) => ({
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
        }), 
    },
    CommunityCreator: {
        screen: CommunityCreator,
        navigationOptions: ( {  navigation } ) => ({
            title: 'Community Creator',
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
        }), 
    },
    Community: {
        screen: Community,
        navigationOptions: ( {  navigation } ) => ({
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
                    name='gear'
                    size={20}
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
                onPress = {() => { navigation.navigate('Settings') } }
                />
            ),
        }), 
    },
    Event: {
        screen: Events,
        navigationOptions: ( {  navigation } ) => ({
            title: 'Event',
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
        }), 
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
    CommunityPictureSettings: {
        screen: CommunityPictureSettings,
        navigationOptions: {
            title: 'Community Profile Picture',
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
    CommunityInfoSettings: {
        screen: CommunityInfoSettings,
        navigationOptions: {
            title: 'Community Information',
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
    FollowerSettings: {
        screen: FollowerSettings,
        navigationOptions: {
            title: 'Community Followers',
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
        screen: Events,
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
                onPress = {() => navigation.navigate("Settings")}
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
    },
    PostImageCreator: {
        screen: PostImageCreator,
        navigationOptions: {
            title: 'Post Image Creator',
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
    CommentCreator: {
        screen: CommentCreator,
        navigationOptions: {
            title: 'Comment Creator',
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
    EventEdit: {
        screen: EventEdit,
        navigationOptions: {
            title: 'Edit Event',
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
    PostEdit: {
        screen: PostEdit,
        navigationOptions: {
            title: 'Edit Post',
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
    PostImageEdit: {
        screen: PostImageEdit,
        navigationOptions: {
            title: 'Edit Post Images',
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

// --- Profile Screens ---
export const ProfileStack = StackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: ( {  navigation } ) => ({
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
                    name='gear'
                    size={20}
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
                onPress = {() => { navigation.navigate('Settings') } }
                />
            ),
        }), 
    },
    Event: {
        screen: Events,
        navigationOptions: ( {  navigation } ) => ({
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
        }),
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
    EmailSettings: {
        screen: EmailSettings,
        navigationOptions: {
            title: 'Profile Settings - Email',
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
    ProfilePictureSettings: {
        screen: ProfilePictureSettings,
        navigationOptions: {
            title: 'Profile Settings - Profile Picture',
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
            title: 'Profile Settings - Personal Info',
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
    FollowingSettings: {
        screen: FollowingSettings,
        navigationOptions: {
            title: 'Following & Followers',
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
    },
    PostImageCreator: {
        screen: PostImageCreator,
        navigationOptions: {
            title: 'Post Image Creator',
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
    EventEdit: {
        screen: EventEdit,
        navigationOptions: {
            title: 'Edit Event',
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
    PostEdit: {
        screen: PostEdit,
        navigationOptions: {
            title: 'Edit Post',
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
    PostImageEdit: {
        screen: PostImageEdit,
        navigationOptions: {
            title: 'Edit Post Images',
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

// --- Post Screens including creation pages --- 
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
    CommentCreator: {
        screen: CommentCreator,
        navigationOptions: {
            title: 'Comment Creator',
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
    PostEdit: {
        screen: PostEdit,
        navigationOptions: {
            title: 'Edit Post',
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
    PostImageEdit: {
        screen: PostImageEdit,
        navigationOptions: {
            title: 'Edit Post Images',
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

// --- Notification Screens ---
export const NotificationStack = StackNavigator({
    Notifications: {
        screen: Notifications,
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

// --- Settings Screen ---
export const SettingsStack = StackNavigator({
    Settings: {
        screen: MainSettings,
        navigationOptions: {
            title: 'App Settings',
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

// --- Events Screen ---
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
        screen: Events,
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
                onPress = {() => navigation.navigate("Settings")}
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
    },
    PostImageCreator: {
        screen: PostImageCreator,
        navigationOptions: {
            title: 'Post Image Creator',
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
    CommentCreator: {
        screen: CommentCreator,
        navigationOptions: {
            title: 'Comment Creator',
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
    CommentCreator: {
        screen: CommentCreator,
        navigationOptions: {
            title: 'Comment Creator',
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
    EventEdit: {
        screen: EventEdit,
        navigationOptions: {
            title: 'Edit Event',
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
    PostEdit: {
        screen: PostEdit,
        navigationOptions: {
            title: 'Edit Post',
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
    PostImageEdit: {
        screen: PostImageEdit,
        navigationOptions: {
            title: 'Edit Post Images',
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

// --- Discover Screen ---
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

// --- Searching Screen ---
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
    },
    SearchResults: {
        screen: SearchResults,
        navigationOptions: {
            title: 'Search Results',
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
    SearchProfile: {
        screen: SearchProfile,
        navigationOptions: {
            title: 'Search Profile',
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
    SearchEvent: {
        screen: SearchEvent,
        navigationOptions: {
            title: 'Event',
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
    SearchCommunity: {
        screen: SearchCommunity,
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
});

// --- Calendar Screen ---
export const CalendarStack = StackNavigator({
    Calendar: {
        screen: Calendar,
        navigationOptions: {
            title: 'Calendar',
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