import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {

  const image = { uri: "https://reactjs.org/logo-og.png" };

  return (
    <View style={styles.container}>
      <View style={styles.rect}></View>
      <View style={styles.imageStack}>
        <ImageBackground
          source={require("./assets/images/cinema_background_02.jpg")}
          resizeMode="stretch"
          style={styles.image}
          imageStyle={styles.image_imageStyle}
        ></ImageBackground>
        <View gradientImage="Gradient_pESjp3Z.png" style={styles.group}>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require("./assets/images/mobile2.png")}
              resizeMode="contain"
              style={styles.image3}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.group2}>
          <TouchableOpacity style={styles.button2}>
            <Image
              source={require("./assets/images/circle-icon-youtube.png")}
              resizeMode="contain"
              style={styles.image4}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.group3}>
          <TouchableOpacity style={styles.button3}>
            <Image
              source={require("./assets/images/kissclipart-entertainment-icon-film-icon-a64c6a5a54bf237f.png")}
              resizeMode="contain"
              style={styles.image4}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.group4}>
          <TouchableOpacity style={styles.button4}>
            <Image
            source={require("./assets/images/FB-Goup-icon.png")}
            resizeMode="contain"
            style={styles.image2}
            ></Image>
          </TouchableOpacity>        
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  rect: {
    width: 100,
    height: 100,
    backgroundColor: "#E6E6E6",
    marginLeft: -103,
    marginTop: 317
  },
  image: {
    top: 0,
    left: 0,
    position: "absolute",
    right: 0,
    bottom: 0
  },
  image_imageStyle: {
    opacity: 0.56
  },
  image5: {
    width: 97,
    height: 56,
    marginTop: 328,
    marginLeft: 247
  },
  group: {
    top: 317,
    left: 19,
    width: 91,
    height: 78,
    position: "absolute"
  },
  button: {
    width: 91,
    height: 78,
    backgroundColor: "#E6E6E6",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 150,
    shadowOpacity: 1,
    shadowRadius: 50,
    borderRadius: 15,
    borderWidth: 0,
    borderColor: "#000000"
  },
  image3: {
    width: 80,
    height: 66,
    marginTop: 6,
    marginLeft: 6
  },
  group2: {
    top: 317,
    left: 134,
    width: 91,
    height: 78,
    position: "absolute"
  },
  button2: {
    width: 91,
    height: 78,
    backgroundColor: "#E6E6E6",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 150,
    shadowOpacity: 1,
    shadowRadius: 50,
    borderRadius: 15,
    borderWidth: 0,
    borderColor: "#000000"
  },
  image4: {
    width: 71,
    height: 72,
    marginTop: 4,
    marginLeft: 10
  },
  group3: {
    top: 317,
    left: 250,
    width: 91,
    height: 78,
    position: "absolute"
  },
  button3: {
    width: 91,
    height: 78,
    backgroundColor: "#E6E6E6",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 150,
    shadowOpacity: 1,
    shadowRadius: 50,
    borderRadius: 15,
    borderWidth: 0,
    borderColor: "#000000"
  },
  group4: {
    top: 30,
    left: 30,
    width: 91,
    height: 78,
    position: "absolute"
  },
  button4: {
    width: 85,
    height: 85,
    backgroundColor: "#E6E6E6",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 150,
    shadowOpacity: 1,
    shadowRadius: 50,
    borderRadius: 45,
    borderWidth: 0,
    borderColor: "#000000"
  },
  image2: {
    top: 0,
    left: 0,
    width: 85,
    height: 85,
    position: "absolute"
  },
  imageStack: {
    flex: 1,
    marginLeft: 3
  }
});
