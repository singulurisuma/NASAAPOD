import React ,{useEffect,useState}from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch,useSelector} from 'react-redux';
import WebView  from 'react-native-webview';

import { Text, View ,Image,ScrollView,Dimensions,TouchableOpacity,StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ImageScreen = (props,{navigation}) => {
    const dispatch = useDispatch()
    const [Imagedata, setImagedata] = useState([])
    const [estado, setEstado] = useState(false);
    //dispatching the image to add into favorites 
    const addedtoFavourites =async()=>{
        setEstado(!estado);
        if(!estado)
            dispatch({type:"ADDEDFAV",details:Imagedata})
        else 
        {    
          dispatch({type:"REMOVEDFAV",details:Imagedata.date})
         }

    }

//checking if the image is already added to favorites 

    var ImageList= useSelector(state => state.AddFavorites)
    useEffect(()=>{
      
      const isFound = ImageList.some(element => {
        if (element.date === props.route.params.data.date) {
          return true;
        }
      });
      if(isFound)
      {
        setEstado(true)
      }
          setImagedata(props.route.params.data)



    },[] );
  return (
    <View
      style={{
        flex: 1
      }}>
        <ScrollView>
        {Imagedata.media_type=="video"&&
                               <WebView style={styles.imgView} source={{uri:Imagedata.url}}/>}
      
     { Imagedata.media_type=="image"&& 
       <Image style={styles.imgView} source={{uri:Imagedata.url}} resizeMode="stretch"/>}
<View style={{borderTopRadius:30,backgroundColor:"#191A18",flex:1}}>
<Text style={{color:"#fff",fontSize:25}}>
{Imagedata.title}
    
</Text>
<View style={styles.textView}>
<Text style={{color:"#fff",fontSize:20}}>
{Imagedata.date}
    
</Text>
<TouchableOpacity style={{marginRight:"5%"}} onPress={()=>{addedtoFavourites()}}>
                        <MaterialIcons name={(estado) ? 'favorite' : 'favorite-border'} size={30} color={"red"}  ></MaterialIcons> 
                      </TouchableOpacity>

</View>
<Text style={{color:"#fff"}}>
{Imagedata.explanation}
    
</Text>
</View>

</ScrollView>
    </View>
  )
}
export default ImageScreen;
const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  imgView:
  {height:height*0.65,
    width:width},
    textView:{flexDirection:"row",
    width:width,
    justifyContent:"space-between"}

})