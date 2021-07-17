import React, { Component, useState } from 'react';
import { Button, ImageBackground ,View, Text, TextInput,Dimensions} from 'react-native';
import Overlay from 'react-native-modal-overlay';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import axios from 'axios';

const image = { uri: "https://cdn1.vectorstock.com/i/1000x1000/74/05/pokemon-go-logo-icon-vector-23237405.jpg" };
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

global.loginName = '';
global.password = '';
global.registerName = '';
global.registerPassword = '';
global.registerSecondPassword = '';

export default class Homescreen extends Component 
{ 
    onClose = () => this.setState({modalVisible: false});
    toggleOverlayOpen = () => this.setState({modalVisible: true});
    toggleOverlayClose = () => this.setState({modalVisible: false});

    onCloseR = () => this.setState({registerVisible: false});
    toggleOverlayOpenR = () => this.setState({registerVisible: true});
    toggleOverlayCloseR = () => this.setState({registerVisible: false});

    constructor()   
    {    
        super()    
        this.state =     
        {       
            message: "",
            registerMessage: "",
            modalVisible: false,
            registerVisible: false  
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

        <Overlay visible={this.state.registerVisible} onClose={this.onCloseR} closeOnTouchOutside>
        <ImageBackground source={{uri:'https://image.shutterstock.com/image-vector/hi-there-inscription-handwritten-lettering-260nw-1798736197.jpg',}}style={{flex: 1}}/>
         
        <View style={{alignItems: 'flex-end', alignItems: 'center'}}>        
        <View style={{ flexDirection:'row' }}>          
        <Text style={{fontSize:20, color: 'black', backgroundColor : 'transparent'}}>Username: </Text>          
        <TextInput style={{height: 30,fontSize:20, backgroundColor:'transparent',color: 'black'}}  placeholder="Username" onChangeText={(val) => { this.changeRegisterNameHandler(val) }}  />                
        </View>        
        
        <View style={{ flexDirection:'row' }}>          
        <Text style={{fontSize:20, color: 'black', backgroundColor : 'transparent'}}>Password: </Text>          
        <TextInput style={{height: 30,fontSize:20, backgroundColor:'transparent', color : 'black'}}  placeholder="Password" secureTextEntry={true} onChangeText={(val) => { this.changeRegisterPasswordHandler(val) }}/>  
        </View>

        <View style={{ flexDirection:'row' }}>          
        <Text style={{fontSize:20, color: 'black', backgroundColor : 'transparent'}}>Re-enter Password: </Text>          
        <TextInput style={{height: 30,fontSize:20, backgroundColor:'transparent', color : 'black'}}  placeholder="Password" secureTextEntry={true} onChangeText={(val) => { this.changePass2Handler(val) }}/>  
        </View> 

        </View> 
        <Button title="Register" onPress={this.handleRegister}/>
        <Text style={{fontSize:15, backgroundColor: 'transparent', color: 'black'}}>{this.state.registerMessage}</Text>
        </Overlay>
        
        </View>

        <Button title="Login" onPress={this.toggleOverlayOpen}/>
        <Button title="Register" onPress={this.toggleOverlayOpenR}/>        
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


    handleRegister = async () =>   
    {    
        
        if(global.registerPassword != global.registerSecondPassword)
        {
            this.setState({registerMessage: "Both passwords must match" });
        }
        else
        {
            this.setState({registerMessage: "" }); 
        }
    }

    changeRegisterNameHandler = async (val) =>  
    {    
        global.registerName = val;  
    }    
    
    changeRegisterPasswordHandler = async (val) =>  
    {
        global.registerPassword = val;  
    }

    changePass2Handler = async (val) =>  
    {    
        global.registerSecondPassword = val;  
    }  
}   
