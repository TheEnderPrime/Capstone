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

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserNameOrEmail: "",
            UserPassword: ""
        };
    }
    UserLoginFuction = () => {
        const { UserNameOrEmail } = this.state;
        const { UserPassword } = this.state;

        fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/user_login.php', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                userNameOrEmail: UserNameOrEmail,
                password: UserPassword
            })
        }).then((response) => response.json()).then((responseJson) =>{
            // if server response message same as Data Matched
            if(responseJson == 'Data Matched'){
                //then open Profile activity and send user email to profile activity
                //this.props.navigation.navigate('Second', {Email: UserEmail });
                Alert.alert(responseJson);
            }
            else{
                Alert.alert(responseJson);
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    render() {
        return (
            <View>
                <TextInput
                    placeholder="UserName or Email"
                    placeholderTextColor='black'
                    onSubmitEditing={()=> this.passwordInput.focus()}
                    autoCapitalize = "none"
                    autoCorrect={false}
                    style={styles.textInputBox}
                    onChangeText={(UserNameOrEmail) => this.setState({ UserNameOrEmail })}
                    value={this.state.UserNameOrEmail}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor='black'
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInputBox}
                    onChangeText={(UserPassword) => this.setState({ UserPassword })}
                    ref={(input) => this.passwordInput = input}
                />
                <View style={styles.button}>
                    <Button title="Login" onPress={this.UserLoginFuction} />
                </View>
                <TouchableOpacity onPress={() => { }}>
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
    },
    textInputBox: {
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,
        height: 45,
        borderColor: 'grey',
        backgroundColor: 'grey',
        color: 'black',
        borderWidth: 1,
        fontSize: 20,
    },
});
export default LoginForm;