import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    TextInput, 
    Alert, 
    TouchableOpacity, 
    Text,
    Button } from 'react-native';
import Colors from '../../Colors/Colors';
import DatePicker from 'react-native-datepicker'
class SignupForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            UserFirstName: "",
            UserLastName: "",
            UserEmail: "",
            UserPassword: "",
            date: "2017-05-15",
        };
    }
    UserSignUpFunction = () =>{
        const { UserFirstName } = this.state;
        const { UserLastName } = this.state;
        const { UserEmail } = this.state;
        const { UserPassword } = this.state;
        const { date } = this.state;

        fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/user_registration.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: UserFirstName,
                lastName: UserLastName,
                email: UserEmail,
                password: UserPassword,
                date: date,
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
                    placeholder="First Name"
                    placeholderTextColor={Colors.kite_greenMediumDark}
                    onSubmitEditing={() => this.lastNameInput.focus()}
                    autoCapitalize ="none"
                    autoCorrect={false}
                    style={styles.textInputBox}
                    onChangeText={(UserFirstName) => this.setState({UserFirstName})}
                    value={this.state.UserFirstName}
                    
                />
                <TextInput
                    placeholder="Last Name"
                    placeholderTextColor={Colors.kite_greenMediumDark}
                    onSubmitEditing={() => this.emailInput.focus()}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInputBox}
                    onChangeText={(UserLastName) => this.setState({UserLastName})}
                    value={this.state.UserLastName}
                    ref={(input) => this.lastNameInput = input}
                />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={Colors.kite_greenMediumDark}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInputBox}
                    onChangeText={(UserEmail) => this.setState({UserEmail})}
                    ref={(input) => this.emailInput = input}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={Colors.kite_greenMediumDark}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInputBox}
                    onChangeText={(UserPassword) => this.setState({UserPassword})}
                    ref={(input) => this.passwordInput = input}
                />
                <DatePicker
                    style={{ width: 200 }}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2000-01-01"
                    maxDate="2018-07-02"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    androidMode = "spinner"
                    onDateChange={(date) => { this.setState({ date: date }) }}
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
 export default SignupForm;