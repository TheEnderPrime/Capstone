import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    TextInput, 
    Alert, 
    TouchableOpacity, 
    Text,
    Button } from 'react-native';

class SignupForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            UserName: "",
            UserEmail: "",
            UserPassword: ""
        };
    }
    UserSignUpFunction = () =>{
        const { UserName } = this.state;
        const { UserEmail } = this.state;
        const { UserPassword } = this.state;

        fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/user_registration.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: UserName,
                email: UserEmail,
                password: UserPassword
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
        }).catch((error) => {
            console.error(error);
        });
    }
    render() {
        return(
            <View>
                <TextInput
                    placeholder="UserName"
                    placeholderTextColor='#277552'
                    onSubmitEditing={() => this.emailInput.focus()}
                    autoCapitalize ="none"
                    autoCorrect={false}
                    style={styles.textInputBox}
                    onChangeText={(UserName) => this.setState({UserName})}
                    value={this.state.UserName}
                    
                />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor='#277552'
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInputBox}
                    onChangeText={(UserEmail) => this.setState({UserEmail})}
                    value={this.state.UserEmail}
                    ref={(input) => this.emailInput = input}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor='#277552'
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInputBox}
                    onChangeText={(UserPassword) => this.setState({UserPassword})}
                    ref={(input) => this.passwordInput = input}
                />
                
                <View style={styles.button}>
                    <Button title="Sign Up" onPress={this.UserSignUpFunction} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
    },
    button: {
    	marginTop: 15,
    	marginBottom: 10,
  	},
  	password: {
   	 	marginTop: 5,
    	textAlign: 'center',
        color:'#277552'
    },
    textInputBox: {
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,
        height: 45, 
        borderColor: '#78B494',
        backgroundColor: '#78B494',
        color:'#277552',
        borderWidth: 1,
        fontSize: 20,
    }, 
});
 export default SignupForm;