import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet,TouchableOpacity ,Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageScreen from './ImageScreen';
import FavoriteScreen  from './Favourites';
 import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from './Homescreen';
 const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const FavoriteStack= createStackNavigator();
const FavoriteStackScreen = ({navigation,route}) =>{ 
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false })
  } else {
    navigation.setOptions({ tabBarVisible: true })
  }
  return(
  
  
  <FavoriteStack.Navigator >
          <FavoriteStack.Screen name="Favoritescreen" component={FavoriteScreen} options={{headerShown: false }} />
          <FavoriteStack.Screen name="ImageScreen" component={ImageScreen} options={{headerTitle: "Favorites",  headerLeft: () => (
                 <MaterialCommunityIcons
              name="keyboard-backspace" size={40} color="black" onPress={() =>navigation.navigate("Favoritescreen")}>

              </MaterialCommunityIcons>  )   }} />

 </FavoriteStack.Navigator>
 );}


const HomeStackScreen = ({ navigation, route }) => {
 
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false })
  } else {
    navigation.setOptions({ tabBarVisible: true })
  }
   return(
  <HomeStack.Navigator screenOptions={{
    headerShown: true,
          headerStyle: {
          backgroundColor: "#fff",
          },
      }}>

<HomeStack.Screen name="Homescreen" component={Homescreen} 
          options={{
            headerShown: false,
          }} />

          <HomeStack.Screen name="ImageScreen" component={ImageScreen} 
          options={{
              title:"",
              headerShown: false,

        
        
          }} />
    
  </HomeStack.Navigator>
  );
  
}

//  Tabs in the bottom bar

const TabScreen = () => (
    <>
    <Tab.Navigator
      activeColor="#fff"
      screenOptions={{
        activeTintColor: '#062929',
        inactiveTintColor: '#357373',
        tabStyle: { backgroundColor: 'red' },
        style:{height:55}
      }}
    >
      <Tab.Screen
        name="Hometab"
        component={ HomeStackScreen}
        options={{
            headerShown:false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialIcons
            name="home" size={30}  color="black" >
        
            </MaterialIcons> 
                  ),
        }}
      />
      <Tab.Screen

        name="Favorite"
        component={FavoriteStackScreen}
        options={{
            headerShown:false,

          tabBarLabel: 'Favorites',

  tabBarIcon: ({ color }) => (

    <MaterialIcons
    color="black" 
    name="favorite" size={30}  >

    </MaterialIcons> 

          ),
        }}
      />
       
      
    </Tab.Navigator>
    </>
);

export default TabScreen;
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#fff',
        elevation: 10, 
    },
    container: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-between',
    
    },
    title: {
        color: 'red'
    },
    back:{
     height:55,
        marginLeft:15,
       
      
       },
       logo:{
    height:50,
        marginLeft:10,
       
      
       },
})
