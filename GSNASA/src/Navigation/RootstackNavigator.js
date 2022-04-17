import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from '../screens/Homescreen';
import TabScreen from '../screens/TabScreen';
import ImageScreen from '../screens/ImageScreen';
const RootStack = createStackNavigator( );

const RootStackScreen = () => (
    
    <RootStack.Navigator initialRouteName='TabScreen' >
                <RootStack.Screen name="TabScreen" component={TabScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="Homescreen" component={Homescreen} options={{headerShown: false}}/>

        <RootStack.Screen name="ImageScreenRoot" component={ImageScreen} options={{headerShown: false}}/>

    </RootStack.Navigator>
);

export default RootStackScreen;