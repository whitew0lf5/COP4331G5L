import React, { Component } from 'react';
import { Button, View, Text, ImageBackground, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Overlay from 'react-native-modal-overlay';
import sets from '../data/sets.json';


const image = { uri: "https://www.teahub.io/photos/full/16-165638_cool-dark-pokemon-backgrounds.jpg" };
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
//const set = require('../data/sets.json')

class Cardscreen extends Component 
{  
    constructor()   
    {    
        super()    
        this.state =     
        {       
            data: () => ({
                setsData: sets.data,
                height: 50,
                mySets:{},
                userName: "",
            })
        }  
    }
    render() 
    {
        return (      
            <View>
            {
               // I couldn't get this map method to work which should interate over the array of items and render each one
               this.state.data.map((item) => (
                  // I planned to add a onPress to TouchableOpacity but I couldn't get the Sets to display
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}>
                     <Text style = {styles.text}>
                        {item.name}
                     </Text>
                  </TouchableOpacity>
               ))
            }
            </View>
        )
    }
}
export default Cardscreen

const styles = StyleSheet.create ({
   container: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   text: {
      color: '#4f603c'
   }
})