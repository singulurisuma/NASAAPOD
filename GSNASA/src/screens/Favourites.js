import React, { useState,useEffect } from 'react';
import Realm from "realm";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import {useDispatch,useSelector} from 'react-redux';

const FavoriteScreen = (props,{navigation}) => {

  var favoritedata= useSelector(state => state.AddFavorites)
  //updating the async storage
  const  _retrieveData =  async () => {    
const datatostore=JSON.stringify(favoritedata)
    await AsyncStorage.setItem("Favorites",datatostore)

  }

  useEffect(()=>{
    _retrieveData();

    },[favoritedata])


    return (
      <View style={styles.container}>
        {favoritedata.length!=0&&
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={favoritedata}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.date;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.card}>
                <View style={styles.imageContainer}>
                  <TouchableOpacity  onPress={()=>{props.navigation.navigate("ImageScreen",{data:item})}}>
                  {item.media_type=="video"&&
                  <Image style={styles.cardImage} source={{uri:item.thumbnail_url}}/>}
                  {item.media_type=="image"&&
                  <Image style={styles.cardImage} source={{uri:item.url}}/>}
                  </TouchableOpacity>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                </View>
              </View>
            )
          }}/>
        }
        {favoritedata.length==0&&
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
          <Text style={{color:"black"}}>
            No favorites added
          </Text>
          </View>}
      </View>
    );
  
}

export default FavoriteScreen
const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    paddingHorizontal: 10,
  },
  listContainer:{
    alignItems:'center'
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    marginVertical: 8,
    backgroundColor:"white",
    flexBasis: '45%',
    marginHorizontal: 10,
  },
  cardContent: {
    paddingVertical: 17,
    justifyContent: 'space-between',
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  imageContainer:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
    color:"#778899"
  },
  count:{
    fontSize:18,
    flex:1,
    color:"#B0C4DE"
  },
}); 