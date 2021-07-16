import React, { Component } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class Homescreen extends Component 
{ 
    render() 
    {    
        return (      
        <View style={{ backgroundColor:'#0000ff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>        
        <View style={{alignItems: 'flex-end'}}>        
        <View style={{ flexDirection:'row' }}>          
        <Text style={{fontSize:20}}>Login Screen: </Text>          
        <TextInput style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}  placeholder="Login Name"/>                
        </View>        
        
        <View style={{ flexDirection:'row' }}>          
        <Text style={{fontSize:20}}>Password: </Text>          
        <TextInput style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}  placeholder="Password" secureTextEntry={true}/>        
        </View>        
        </View>        
        <Button title="Do Login" onPress={() => this.props.navigation.navigate('Card')}/>      
        </View>    )  
        
    }
}
