import React, { Component } from 'react';
import { Button, View, Text, ImageBackground, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Overlay from 'react-native-modal-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {data} from "./sets";

const image = { uri: "https://www.teahub.io/photos/full/16-165638_cool-dark-pokemon-backgrounds.jpg" };
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

global.sets = AsyncStorage.getItem('sets');
global.uName = AsyncStorage.getItem('username');
global.setID = '';
global.id = '';
global.request = '';
global.cards = '';
global.trynow = '';
global.cardsInSetOwned = [];

export default class Cardscreen extends Component 
{  


    getListViewItem = async (item) => {  
         global.setID = item.id;
         AsyncStorage.setItem('setid', global.setID);
         id = item.id;
         

        request = "set.id:" + id;
        
        
        const response =  await axios.get('https://api.pokemontcg.io/v2/cards', {
                         params: {
                             q: request
                         },
                     })
     
                     global.cards = response.data.data;
                     AsyncStorage.setItem('cards', global.cards);
        
        this.props.navigation.navigate('Set');
        
    }  

    render() 
    {
        return (      
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>       
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent:"center", width: viewportWidth, height : viewportHeight}}>
        
        <View style = {{padding:10,
            backgroundColor:"transparent",
            width: viewportWidth,
            height: viewportHeight/5,
            flex: 1/100,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf:"center",
            flexDirection:"column",
            borderRadius:5,
            position: 'absolute',
            top: 0, }}>
            <Text style={{color: 'white', fontSize:20}}>Click a set you wish to browse</Text>
        </View>


        <FlatList
          horizontal={true}
          style={{flex:1}}
          data={data}
          renderItem={({item}) => 
          <TouchableOpacity onPress={this.getListViewItem.bind(this, item)} style = {{padding:10,
            backgroundColor:"transparent",
            width:viewportWidth,
            height: viewportHeight/2,
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf:"center",
            flexDirection:"column",
            borderRadius:5}}>
            <View>
                <Image source={{uri:item.images.logo}}  style={{width:viewportWidth/1.5, height:viewportHeight/1.5, resizeMode: 'contain'}} />
                <Text style={{textAlign: "center", fontSize: 15, color: "white"}}>{item.name}</Text>
            </View>
            </TouchableOpacity> 
          }
          keyExtractor={(item) => item.id}
        />
       
        </ImageBackground>   
        </View>    )  
    }

}
