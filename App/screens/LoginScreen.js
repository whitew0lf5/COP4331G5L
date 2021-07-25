import React, { Component, useState } from 'react';
import { Button, ImageBackground ,View, Text, TextInput,Dimensions, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Overlay from 'react-native-modal-overlay';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import axios from 'axios';
import emailjs from 'emailjs-com';

const image = { uri: "https://cdn1.vectorstock.com/i/1000x1000/74/05/pokemon-go-logo-icon-vector-23237405.jpg" };
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

global.loginName = '';
global.password = '';
global.registerName = '';
global.registerPassword = '';
global.registerSecondPassword = '';
global.email1 = '';
global.email2 = '';
global.res = -1;
global.forgotName = '';
global.uName = '';
global.sets = '';

export default class Homescreen extends Component 
{ 
    onClose = () => 
    {  
        this.setState({modalVisible: false});
        this.setState({message: ''});
    }
    toggleOverlayOpen = () => this.setState({modalVisible: true});
    toggleOverlayClose = () => this.setState({modalVisible: false});

    onCloseR = () => 
    {
        this.setState({registerVisible: false});
        this.setState({registerMessage: ''});
    }
    toggleOverlayOpenR = () => this.setState({registerVisible: true});
    toggleOverlayCloseR = () => this.setState({registerVisible: false});

    onCloseF = () => 
    {
        this.setState({forgotVisible: false});
        this.setState({forgotMessage: ''});
    }

    toggleOverlayOpenF = () => this.setState({forgotVisible: true});
    toggleOverlayCloseF = () => this.setState({forgotVisible: false});

    constructor()   
    {    
        super()    
        this.state =     
        {       
            message: "",
            registerMessage: "",
            forgotMessage: "",
            modalVisible: false,
            registerVisible: false,
            forgotVisible: false 
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

        <View style={{ flexDirection:'row' }}>          
        <Text style={{fontSize:20, color: 'black', backgroundColor : 'transparent'}}>Email: </Text>          
        <TextInput style={{height: 30,fontSize:20, backgroundColor:'transparent', color : 'black'}}  placeholder="Email" onChangeText={(val) => { this.changeEmailHandler(val) }}/>  
        </View> 

        </View> 
        <Button title="Register" onPress={this.handleRegister}/>
        <Text style={{fontSize:15, backgroundColor: 'transparent', color: 'black'}}>{this.state.registerMessage}</Text>
        </Overlay>

        <Overlay visible={this.state.forgotVisible} onClose={this.onCloseF} closeOnTouchOutside>
        <ImageBackground source={{uri:'https://image.shutterstock.com/image-vector/hi-there-inscription-handwritten-lettering-260nw-1798736197.jpg',}}style={{flex: 1}}/>
         
        <View style={{alignItems: 'flex-end', alignItems: 'center'}}>        
        <View style={{ flexDirection:'row' }}>          
        <Text style={{fontSize:20, color: 'black', backgroundColor : 'transparent'}}>Username: </Text>          
        <TextInput style={{height: 30,fontSize:20, backgroundColor:'transparent',color: 'black'}}  placeholder="Username" onChangeText={(val) => { this.changeForgotNameHandler(val) }}  />                
        </View>        
        
        </View> 
        <Button title="Reset Password" onPress={this.handleResetPassword}/>
        <Text style={{fontSize:15, backgroundColor: 'transparent', color: 'black'}}>{this.state.forgotMessage}</Text>
        </Overlay>
        
        </View>

        <Button title="Login" onPress={this.toggleOverlayOpen}/>
        <Button title="Register" onPress={this.toggleOverlayOpenR}/>
        <View style={{width: '100%',
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick}}>
        }}>
        <Text style={{color: 'blue', textAlign: "center",}}
            onPress={this.toggleOverlayOpenF}>
        Forgot Password?
        </Text>
        </View>       
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

            global.setList = JSON.stringify(response.data.sets);
            global.uName = JSON.stringify(response.data.username);
           

            if(!response.data.verified)
            {
                this.setState({message: "User not yet verified"});
            }
            else
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

        

        AsyncStorage.setItem('username', global.uName);
        AsyncStorage.setItem('sets', global.setList);
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
        
        if(global.registerName == '' )
        {
            this.setState({registerMessage: "Username required"});
        }
        else if(global.registerPassword != global.registerSecondPassword)
        {
            this.setState({registerMessage: "Both passwords must match" })
        }
        else
        {
            this.setState({registerMessage: "" }); 

            var obj = {login:global.registerName.trim(),password:global.registerPassword.trim()};     
            var js = JSON.stringify(obj);
            await axios.post('http://198.199.67.109:3000/api/register', null, {
                params: 
                {
                        username: global.registerName,
                        email: global.email1,
                        password: global.registerPassword,
                },
            })
            .then(function (response) 
             {
                emailjs.send(
                    'dream5Team',
                    'template_y5so3r9',
                    {
                        username: global.registerName,
                        to: global.email1,
                    },
                    'user_K6vGRZGvw7nrh6PmSSw3N'
                );
                global.res = JSON.stringify(response.status);
            })
            .catch(function (error) 
            {
                global.res = 409;
            });

            if(res == 200)
            {
                this.setState({registerVisible: false});
                this.setState({registerMessage: ''});
            }
            else if(res == 409)
            {
                this.setState({registerMessage: "User already exists"});
            }
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

    changeEmailHandler = async (val) =>  
    {    
        global.email1 = val;  
    }    
    
    changeEmail2Handler = async (val) =>  
    {
        global.email2 = val;  
    }

    changeForgotNameHandler = async (val) =>  
    {
        global.forgotName = val;  
    }

    handleResetPassword = async () =>   
    {    
        try    
        {      
            var obj = {login:global.loginName.trim(),password:global.password.trim()};     
            var js = JSON.stringify(obj);  
            const response = await axios.get('http://198.199.67.109:3000/api/email', {
                params: {
                    username: global.forgotName,
                },
            });

            const email = response.data.email;

            if(response.status == 200)
            {
                this.setState({forgotVisible: false});
                this.setState({forgotMessage: ''});   
            }

            emailjs.send(
                'dream5Team',
                'template_8kxjp6j',
                {
                    username: global.forgotName,
                    to: email,
                },
                'user_K6vGRZGvw7nrh6PmSSw3N'
            );   
        }    
        catch(e)   
        {
            this.setState({forgotMessage: "User does not exist" });
        }  
    }
    
}   
