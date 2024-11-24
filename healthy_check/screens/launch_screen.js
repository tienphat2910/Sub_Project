import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
const LaunchScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('../assets/images/hero.png')} style={styles.image} />
      </View>
      <View style={styles.logo}>
        <Image source={require('../assets/icons/logo.png')} style={styles.logoImage} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Let&#39;s start your health journey today with us!</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#535ce8',
    height: 844,
    width: 400,
    overflow: 'hidden',
    position: 'relative',
  },
  imgContainer: {
    width: 430,
    alignItems: 'center',
  },
  image: {
    borderBottomLeftRadius: 999,
    resizeMode: 'contain',
  },
  logo: {
    width: 58,
    height: 58,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    marginTop: 20,
    marginLeft: 20,
  },
  logoImage: {
    width: 42,
    height: 42,
    resizeMode: 'contain',

  },
  textContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'justify',
    fontWeight: 'bold',
    lineHeight: 36,
  },
  buttonContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 26,
    height: 52,
    width: 348,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#535ce8',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LaunchScreen;
