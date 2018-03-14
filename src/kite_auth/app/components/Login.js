import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  View,
  ScrollView,
  Image,
  Type
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Dimensions} from 'react-native';

export default class Login extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
      }  
    }
  componentDidCatch () {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    if (value !== null) {
      this.props.navigation.navigate('Profile');
    }
  }

  WholeNews() {
    var tmp_array = [
      { text: "Test1", img: require("./pic1.jpg") },
      { text: "Test2", img: require("./pic2.jpg") },
      { text: "Test3", img: require("./pic3.jpg") },
      { text: "Test4", img: require("./pic4.jpg") },
      { text: "Test5", img: require("./pic5.jpg") }
     ];
    return tmp_array.map(function(news, i){
      return(
        <View key={i}>
          <Text>{news.text}</Text>
          <View>
            <Image style={styles.imagewrap}
              source={news.img}
            />
          </View>
        </View>
      );
    });
  }
  // tmp_array = [
  //   { text: "Test", img: require("./pic1.jpg") },
  //   { text: "Test1", img: require("./pic2.jpg") },
  //   { text: "Test2", img: require("./pic3.jpg") }
  //  ]; 

//   Details = [
//     {
//       Text: "Party",
//       image: require("../images/pic1.jpg")
//     },
//     {
//       Text: "Wedding",
//       image: img: require("../images/pic2.jpg")
//     },
//     {
//       Text: "Architecture",
//       image: require("../images/pic3.jpg")
//     }
// ];

  render() {
    // let type = [];    
    // let renderPhotoTypes = () => {
          
    
    //       this.tmp_array.map( ( item )=> {
    //         type.push(
    //           <View key={item.Text}>
    //             <TouchableWithoutFeedback>
    //               <View>
    //                 <View >
    //                   <Image source={item.image}/>
    //                 </View>
    //                 <Text >{item.Text}</Text>
    //               </View>
    //             </TouchableWithoutFeedback>
    //           </View>
    //         );
    //       } );
    //       return type;
    //     };
     
     return (
      <ScrollView>
        {this.WholeNews()}
      </ScrollView>
     );
      
      // <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
      //   <View style={styles.container}>
          
      //     <Text tyle={styles.header}>- LOGIN -</Text>
          
      //     <TextInput
      //       style={styles.TextInput} placeholder='Username'
      //       onChangeText={ (username) => this.setState({username})}
      //       underLineColorAndroid='transparent'
      //       />
          
      //     <TextInput
      //       style={styles.TextInput} placeholder='Paswword'
      //       onChangeText={ (password) => this.setState({password})}
      //       underLineColorAndroid='transparent'
      //       />
          
      //     <TouchableOpacity
      //       style={styles.btn}
      //       onPress={this.login}
      //       >
      //       <Text>Log in</Text>
      //     </TouchableOpacity>

      //   </View>
      // </KeyboardAvoidingView>
    //);
  }

  login = () => {
    alert('test');
  }
}

const styles = StyleSheet.create({
  imagewrap:{
    justifyContent: 'center',
    height: (Dimensions.get('window').height/3) - 12,
    width: (Dimensions.get('window').width) - 50,
    padding: 15
  },
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2896d3',
    paddingLeft: 40,
    paddingRight: 40,
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: '#01c853',
    padding: 20,
    alignItems: 'center',
  }
})
