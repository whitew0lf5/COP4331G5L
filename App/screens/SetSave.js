import React, { Component } from 'react';
import { Button, View, Text, ImageBackground, Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Overlay from 'react-native-modal-overlay';

const image = { uri: "https://www.teahub.io/photos/full/16-165638_cool-dark-pokemon-backgrounds.jpg" };
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


export default class Cardscreen extends Component 
{  

    render() 
    {
        return (      
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>       
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent:"center", width: viewportWidth, height : viewportHeight}}>
        <View>
        
        <Button title="To Login" onPress={() => this.props.navigation.navigate('Login')}/>  
        
        </View> 
        </ImageBackground>   
        </View>    )  
    }
}
