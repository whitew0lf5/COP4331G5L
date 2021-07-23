import React, { Component } from 'react';
import { Button, View, Text, ImageBackground, Dimensions, TouchableOpacity, StyleSheet, AsyncStorage, Card, CardDeck, Container } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Overlay from 'react-native-modal-overlay';
import axios from 'axios';
import sets from '../data/sets.json';


const image = { uri: "https://www.teahub.io/photos/full/16-165638_cool-dark-pokemon-backgrounds.jpg" };
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


export default class CardScreen extends Component {

    // function to navigate to correct cardset in cards screen
    /*
    handleClick = () => 
    {
      this.props.navigation.navigate('name');
    }
    */
    render() {
        return  (
			<>
				<Container fluid={true}>
                    <CardDeck className=" no-gutters ">
                        {sets.data.map((postData) => {
                            console.log(postData);
                            return (
                                <Card key={postData.id}>
                                        <Text style = {styles.text}>
                                            {postData.name}
                                        </Text>
                                </Card>
                            );
                        })}
                    </CardDeck>
				</Container>
			</>
		);
	}
}

// style
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
