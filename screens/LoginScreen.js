import React, { Component, useState } from 'react';
import { Button, ImageBackground ,View, Text, TextInput,Dimensions} from 'react-native';
import Overlay from 'react-native-modal-overlay';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import axios from 'axios';

const image = { uri: "https://cdn1.vectorstock.com/i/1000x1000/74/05/pokemon-go-logo-icon-vector-23237405.jpg" };
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

global.loginName = '';
global.password = '';
global.userId = -1;
global.firstName = '';
global.lastName = '';
global.search = '';
global.card = '';

export default class Homescreen extends Component 
{ 
    onClose = () => this.setState({modalVisible: false});
    toggleOverlayOpen = () => this.setState({modalVisible: true});
    toggleOverlayClose = () => this.setState({modalVisible: false});

    constructor()   
    {    
        super()    
        this.state =     
        {       
            message: "",
            modalVisible: false    
        }  
    }

   
    render() 
    {    
        return (      
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>        
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent:"center", width: viewportWidth, height : viewportHeight}}>
        <View>
        
        <Overlay visible={this.state.modalVisible} onClose={this.onClose} closeOnTouchOutside>
        <ImageBackground source={{uri:'https://image.shutterstock.com/image-vector/hi-there-inscription-handwritten-lettering-260nw-1798736197.jpg',}}style={{flex: 1}}/>
         
        <View style={{alignItems: 'flex-end', alignItems: 'center'}}>        
        <View style={{ flexDirection:'row' }}>          
        <Text style={{fontSize:20, color: 'black', backgroundColor : 'transparent'}}>Username: </Text>          
        <TextInput style={{height: 30,fontSize:20, backgroundColor:'transparent',color: 'black'}}  placeholder="Username" onChangeText={(val) => { this.changeLoginNameHandler(val) }}  />                
        </View>        
        
        <View style={{ flexDirection:'row' }}>          
        <Text style={{fontSize:20, color: 'black', backgroundColor : 'transparent'}}>Password: </Text>          
        <TextInput style={{height: 30,fontSize:20, backgroundColor:'transparent', color : 'black'}}  placeholder="Password" secureTextEntry={true} onChangeText={(val) => { this.changePasswordHandler(val) }}/>  
        </View>        
        </View> 
        <Button title="Login" onPress={this.handleClick}/>
        <Text style={{fontSize:15, backgroundColor: 'transparent', color: 'black'}}>{this.state.message}</Text>
        </Overlay>
        
        </View>

        <Button title="Login" onPress={this.toggleOverlayOpen}/>        
        </ImageBackground>
            
        </View>    
        )  
        
    }
    handleClick = async () =>   
    {    
        try    
        {      
            var obj = {login:global.loginName.trim(),password:global.password.trim()};     
            var js = JSON.stringify(obj);  
            const response = await axios.get('http://198.199.67.109:3000/api/login', {
                params: {
                    username: global.loginName,
                    password: global.password,
                },
            });


            if(JSON.stringify(response.status) == 200)
            {
                this.setState({modalVisible: false});
                this.setState({message: "" });
                this.props.navigation.navigate('Card');
            }
              
        }    
        catch(e)   
        {
            this.setState({message: "Username/Password combination incorrect" });
        }  
    }   
    
    changeLoginNameHandler = async (val) =>  
    {    
        global.loginName = val;  
    }    
    
    changePasswordHandler = async (val) =>  
    {
        global.password = val;  
    }
}
