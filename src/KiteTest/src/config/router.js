import React from 'react';
import Colors from '../Colors/Colors';
import Text from 'react-native';
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
import DrawerContainer from './DrawerContainer';


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
        navigationOptions: {
			title: 'Timeline',
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

export const CommunitiyStack = StackNavigator({
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
        screen: Timeline,
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
        screen: Timeline,
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
    Events: {
        screen: Events,
        navigationOptions: {
            title: 'Events',
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

// - - - - - - - - - - - DRAWER NAVIAGTION - - - - - - - - - -
//navigator for the drawer navigation
export const DrawerStack = DrawerNavigator({
	Notifications: {
		screen: NotificationStack,
	},
	Profile: {
        screen: ProfileStack,
	},
	Settings: {
		screen: SettingsStack,
	},
}, {
});

const drawerButton = (navigation) =>
  <Text
    style={{padding: 5, color: 'white'}}
    onPress={() => {
      navigation.navigate('DrawerToggle')
    }
  }>Menu</Text>

const DrawerNavigation = StackNavigator({
	DrawerStack: { screen: DrawerStack }
  }, {
	headerMode: 'float',
	navigationOptions: ({navigation}) => ({
	  headerStyle: {backgroundColor: 'green'},
	  title: 'Logged In to your app!',
	  headerLeft: drawerButton(navigation)
	})
  })

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
    DrawerStack: {
        screen: DrawerStack,
    }
},  {
		headerMode: 'none',
		title: 'Main',
		initialRouteName: 'Splash'
});