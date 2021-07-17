import React, { Component } from 'react';
import { Button, ImageBackground ,View, Text, TextInput,Dimensions} from 'react-native';
import Overlay from 'react-native-modal-overlay';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const image = { uri: "https://cdn1.vectorstock.com/i/1000x1000/74/05/pokemon-go-logo-icon-vector-23237405.jpg" };
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class Homescreen extends Component 
{ 
    onClose = () => this.setState({modalVisible: false});
    state = {modalVisible: false,}
    toggleOverlayOpen = () => this.setState({modalVisible: true});
    toggleOverlayClose = () => this.setState({modalVisible: false});
   
    render() 
    {    
        state = {
            modalVisible: true, 
          }
          
          onClose = () => this.setState({ modalVisible: false});

        return (      
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>        
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent:"center", width: viewportWidth, height : viewportHeight}}>
        <View>
        <Overlay visible={this.state.modalVisible} onClose={this.onClose} closeOnTouchOutside>
        <ImageBackground source={{uri:'https://image.shutterstock.com/image-vector/hi-there-inscription-handwritten-lettering-260nw-1798736197.jpg',}}style={{flex: 1}}/>
         
        <View style={{alignItems: 'flex-end', alignItems: 'center'}}>        
        <View style={{ flexDirection:'row' }}>          
        <Text style={{fontSize:20, color: 'black', backgroundColor : 'transparent'}}>Username: </Text>          
        <TextInput style={{height: 30,fontSize:20, backgroundColor:'transparent',color: 'black'}}  placeholder="Username" />                
        </View>        
        
        <View style={{ flexDirection:'row' }}>          
        <Text style={{fontSize:20, color: 'black', backgroundColor : 'transparent'}}>Password: </Text>          
        <TextInput style={{height: 30,fontSize:20, backgroundColor:'transparent', color : 'black'}}  placeholder="Password" secureTextEntry={true}/>  
        </View>        
        </View> 
        <Button title="Login" onPress={() => {this.props.navigation.navigate('Card'); this.setState({modalVisible: false});}}/>
        </Overlay>
        </View>

        <Button title="Login" onPress={this.toggleOverlayOpen}/>        
        </ImageBackground>
            
        </View>    
        )  
        
    }
}
