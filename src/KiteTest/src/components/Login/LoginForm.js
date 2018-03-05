import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    TextInput,
    Alert,
    TouchableOpacity,
    Text,
    Button
} from 'react-native';
import Colors from '../../Colors/Colors';
import{ Root, Tabs, WelcomeStack, Drawers } from '../../config/router';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserEmail: "",
            UserPassword: ""
        };
    }

    UserLoginFunction = () => {

        const { UserEmail } = this.state;
        const { UserPassword } = this.state;


        fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions.Login.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                email: UserEmail,

                password: UserPassword

            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson === 'Data Matched') {
                    
                    this.props.navigation.navigate('Drawers')
                    //this.setState(userName: responseJson.User);

                    //Then open Profile activity and send user email to profile activity.
                    //this.props.navigation.navigate('Second', { Email: UserEmail });
                    //Alert.alert(responseJson);
                }
                else {

                    Alert.alert(responseJson);
                }

            }).catch((error) => {
                console.error(error);
            });
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={Colors.kite_greenMediumDark}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInputBox}
                    onChangeText={(UserEmail) => this.setState({ UserEmail })}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={Colors.kite_greenMediumDark}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInputBox}
                    onChangeText={(UserPassword) => this.setState({ UserPassword })}
                    ref={(input) => this.passwordInput = input}
                />
                <View style={styles.button}>
                    <Button style={buttonColor = '#78B494'} title="Login" onPress={this.UserLoginFunction} />
                </View>
                <TouchableOpacity onPress={() => navigate('Drawers')}>
                    <Text style={styles.password}> Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    button: {
        marginTop: 15,
        marginBottom: 10,
    },
    password: {
        marginTop: 5,
        textAlign: 'center',
        color: Colors.kite_greenMediumDark
    },
    textInputBox: {
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,
        height: 45,
        borderColor: Colors.kite_greenMediumLight,
        backgroundColor: Colors.kite_greenMediumLight,
        color: Colors.kite_greenMediumDark,
        borderWidth: 1,
        fontSize: 20,
    },
});
export default LoginForm;