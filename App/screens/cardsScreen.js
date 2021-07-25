import React, { Component } from 'react';
import { Button, View, Text, ImageBackground, Dimensions, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Overlay from 'react-native-modal-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const image = { uri: "https://www.teahub.io/photos/full/16-165638_cool-dark-pokemon-backgrounds.jpg" };
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

global.uName = AsyncStorage.getItem('username');
global.setID = AsyncStorage.getItem('setid');
global.sets = '';
global.cards = AsyncStorage.getItem('cards');
global.request = '';
global.id = '';
global.temp = '';
global.background = '';
global.selected = [];


const styles = StyleSheet.create(
{
    selected : {width:viewportWidth/1.5, height:viewportHeight/2, resizeMode: 'contain', backgroundColor: 'green'},
    normal : {width:viewportWidth/1.5, height:viewportHeight/2, resizeMode: 'contain', backgroundColor: 'red'}
}
)

export default class Cardscreen extends Component 
{  
    
    

    getListViewItem = async (item, index) => {  
            this.setState({check: item.id});
            
            const value = await AsyncStorage.getItem('sets')
            global.sets = JSON.parse(value);
           
            const pos = global.sets[setID].indexOf(item.id)

            

            if(!global.selected.includes(item.id))
            {
                global.selected.push(item.id)
            }
            else
            {
                const where = global.selected.indexOf(item.id);
                global.selected.splice(where, 1);
            }

            console.log(global.selected);

            


            if(pos > -1)
            {
                global.sets[setID].splice(pos, 1);
                global.temp = JSON.stringify(global.sets);

                AsyncStorage.setItem('sets', global.temp);
                
                global.temp = await AsyncStorage.getItem('sets')
                global.sets = JSON.parse(global.temp);
            
            }
            else
            {
                global.sets[setID].push(item.id);
                global.temp = JSON.stringify(global.sets);

                AsyncStorage.setItem('sets', global.temp);
            
                global.temp = await AsyncStorage.getItem('sets')
                global.sets = JSON.parse(global.temp);
            }
            
            //console.log(global.sets);
            
            console.log(global.uName);

            await axios.post(
                    'http://198.199.67.109:3000/api/update',
                    {sets: global.sets},
                    {
                        params: {
                            username: global.uName,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                })

   }
   
   constructor(props) {
    super(props);

    this.state = {
        check: '',
    };
}
    
    componentWillMount()
    {
        global.uName = global.uName.slice(1,global.uName.length-1);
    }


    render() 
    {
        return (      
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>       
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent:"center", width: viewportWidth, height : viewportHeight}}>
        
        <FlatList
          horizontal={true}
          style={{flex:1}}
          data={global.cards}
          renderItem={({item,index}) => 
          <TouchableOpacity onPress={this.getListViewItem.bind(this, item, index)} style={{padding:20}}>
            <View style={{flex:1, 
            justifyContent: 'center', 
            alignItems: 'center'}}>
                <Image source={{uri:item.images.small}}  style={global.selected.includes(item.id) ? styles.selected : styles.normal} />
                <Text style={{textAlign: "center", fontSize: 15, color: "white"}}>{item.name}</Text>
            </View>
            </TouchableOpacity> 
          }
          keyExtractor={(item) => item.id}
          extraData={global.selected}
        />
       
        </ImageBackground>   
        </View>    )  
    }

}         
