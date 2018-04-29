/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDpbDjvHHsLvdkOxwgSXohkVOErHMqPNWw",
  authDomain: "kite-mobile.firebaseapp.com",
  storageBucket: "kite-mobile.appspot.com",
}
firebase.initializeApp(config);
const storage = firebase.storage();

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (uri, mime = 'image/jpeg') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      const sessionId = new Date().getTime()
      let uploadBlob = null
      const imageRef = storage.ref('images').child(`${sessionId}`)

      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}



class Demo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      size: 0,
      imgURL1: null,
      imgURL2: null,
      imgURL3: null
    }
  }

  UserCreatePost() {
  fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Post.php?f=createPost', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UserID: 219575471,
            EventID: 46,
            Title: 'Bla3e23',
            Desc: 'Stuff',
            Story: 'Please work for me',
          })
      }).then((response) => response.json())
          .then((responseJson) => {
            Alert.alert("we did it");
              // If server response message same as Data Matched

          });
}

  // UserCreatePost = () => {
  //   // let img1 = {uri : this.state.imgURL1 }
  //   // let img2 = {uri : this.state.imgURL2 }
  //   // let img3 = {uri : this.state.imgURL3 }
  //   var formData = new FormData();
  //   formData.append('UserID', 908796775);
  //   formData.append('EventID', 106);
  //   formData.append('Title', 'Lil Pup');
  //   formData.append('Desc', 'Bla bla bla');
  //   formData.append('Story', 'ok well then');
  //   // formData.append('PhotoOne', img1.uri)
  //   // formData.append('PhotoTwo', img2.uri)
  //   // formData.append('PhotoThree', img3.uri)
    
  //   fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Post.php?f=createPost', {
  //     method: 'POST',
  //     headers: {
  //         // 'Accept': 'application/json',
  //         'Content-Type': 'multipart/form-data',
  //     },
  //     body: formData
  //     }).then((response) => response.json())
  //     .then((responseJson) => {
  //       alert(responseJson)
  //   })
  //   .done();
  // //   .catch((error) => {
  // //     console.error(error);
  // // });
  // }


  _pickImage() {
    if (this.state.size == 3) {
      alert("Maximum nuber of images selected.");
    }
    else if (this.state.imgURL1 == null) {
      // this.setState({ imgURL1: '' })
      console.log("I'm trying to pick an image");
      ImagePicker.launchImageLibrary({}, response  => {
        this.setState({ imgURL1: response.uri});
      })
      this.setState({size: 1})
    }
    else if (this.state.imgURL2 == null) {
      // this.setState({ imgURL2: '' })
      console.log("I'm trying to pick an image");
      ImagePicker.launchImageLibrary({}, response  => {
        this.setState({ imgURL2: response.uri});
      })
      this.setState({size: 2})
    }
    else if (this.state.imgURL3 == null) {
      // this.setState({ imgURL3: '' })
      console.log("I'm trying to pick an image");
      ImagePicker.launchImageLibrary({}, response  => {
        this.setState({ imgURL3: response.uri});
      })
      this.setState({size: 3})
    };
  }

  _uploadImage() {
    if (this.state.size == 0) {
      alert ("You have no images to upload.")
    }
    else if(this.state.size == 3 && this.state.imgURL1 != null) {
      uploadImage(this.state.imgURL1)
        .then(url => this.setState({ imgURL1: url }))
        .catch(error => console.log(error));
      uploadImage(this.state.imgURL2)
        .then(url => this.setState({ imgURL2: url }))
        .catch(error => console.log(error));
      uploadImage(this.state.imgURL3)
        .then(url => this.setState({ imgURL3: url }))
        .catch(error => console.log(error));
    }
    else if (this.state.size == 2 && this.state.imgURL1 != null) {
      uploadImage(this.state.imgURL1)
        .then(url => this.setState({ imgURL1: url }))
        .catch(error => console.log(error));
      uploadImage(this.state.imgURL2)
        .then(url => this.setState({ imgURL2: url }))
        .catch(error => console.log(error));
    }
    else if (this.state.size == 1 && this.state.imgURL1 != null) {
      uploadImage(this.state.imgURL1)
        .then(url => this.setState({ imgURL1: url }))
        .catch(error => console.log(error));
        () => this.UserCreatePost();
    }
    else {
      alert("didn't upload for some reason!")
    }

   
    // uploadImage(this.state.uploadURL)
    //     .then(url => this.setState({ uploadURL: url }))
    //     .catch(error => console.log(error))
  }

  //###############################################################

  // WholeNews() {
  //   // var bla = "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee";
  //   // var bla2 = bla.replace(/.{10}\S*\s+/g, "$&@").split(/\s+@/);
    
  //   //var tmp_array = objectBuilder(BigLongStringFromDataBase, ListOfPhotos);
  //   var tmp_array = [{text: "The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is.The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators."}];
  //   //var txt_arr = text.replace(/.{100}\S*\s+/g, "$&@").split(/\s+@/);
  //   //var img_arr = ["./pic1.jpg", "./pic2.jpg", "./pic3.jpg", "./pic4.jpg", "./pic5.jpg"];
  //   // var tmp_array = [
  //   //   { text: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself,", img: require("./pic1.jpg") },
  //   //   { text: "because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.", img: require("./pic2.jpg") },
  //   //   { text: "To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences,", img: require("./pic3.jpg") },
  //   //   { text: "or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are", img: require("./pic4.jpg") },
  //   //   { text: "so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee", img: require("./pic5.jpg") }
  //   //  ];
  //   // var check;
  //   // if (txt_arr.length < img_arr.length) {
  //   //   check = txt_arr.length;
  //   // }
  //   // else {
  //   //   check = img_arr.length
  //   // }
  //   // var element = {}, tmp_array = [];
  //   // var count = 0;
  //   // while (count < check) {
  //   //   element.txt = txt_arr[count];
  //   //   element.img = img_arr[count].toString();
  //   //   tmp_array.push(element);
  //   //   count++;
  //   // }

  //   return tmp_array.map(function(news, i){
  //     return(
  //       <View key={i} >
  //         {/* <View style={styles.boxcontainer}>
  //           <Text>{txt_arr[i]} </Text>
  //         </View> */}
  //         {/* <View style={styles.boxContainer}>
  //           <Image style={styles.imagewrap} 
  //             source={news.img}
  //           />
  //         </View> */}
  //         <View style={styles.textContainer}>
  //           <Text>{news.text}</Text>
  //         </View>
  //       </View>
  //     );
  //   });
  // }
  

  // render() {
  //    return (
  //     <ScrollView>
  //       {this.WholeNews()}
  //     </ScrollView>
  //    );
  // }

  //##############################################################

  render() {
    return (
      <View style={ styles.container }>
        {
          (() => {
            switch (this.state.size) {
              case 0:
                return null
              case '':
                return <ActivityIndicator />
              case 3:
              return (
                <ScrollView>
                  <Image
                    source={{ uri: this.state.imgURL1 }}
                    style={ styles.image }
                  />
                  <Text selectable={true}>{ this.state.imgURL1 }</Text>

                  <Image
                    source={{ uri: this.state.imgURL2 }}
                    style={ styles.image }
                  />
                  <Text selectable={true}>{ this.state.imgURL2 }</Text>

                  <Image
                    source={{ uri: this.state.imgURL3 }}
                    style={ styles.image }
                  />
                  <Text selectable={true}>{ this.state.imgURL3 }</Text>
                </ScrollView>
              )
              case 2: 
              return (
                <ScrollView>
                  <Image
                    source={{ uri: this.state.imgURL1 }}
                    style={ styles.image }
                  />
                  <Text selectable={true}>{ this.state.imgURL1 }</Text>

                  <Image
                    source={{ uri: this.state.imgURL2 }}
                    style={ styles.image }
                  />
                  <Text selectable={true}>{ this.state.imgURL2 }</Text>
                </ScrollView>
              )
              default:
                return (
                  <ScrollView>
                    <Image
                      source={{ uri: this.state.imgURL1 }}
                      style={ styles.image }
                    />
                    <Text selectable={true}>{ this.state.imgURL1 }</Text>
                  </ScrollView>
                )
            }
          })()
        }
        <ScrollView>
        <TouchableOpacity onPress={ () => this._pickImage() }>
          <Text style={ styles.upload }>
            Pick Image
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => this._uploadImage() }>
          <Text style={ styles.upload }>
            Post
          </Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
  },
  image: {
    height: 200,
    resizeMode: 'contain',
  },
  upload: {
    textAlign: 'center',
    color: '#333333',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray'
  },
})

export default Demo

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
