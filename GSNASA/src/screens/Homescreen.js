import React, { Component,useState,useEffect } from 'react';
import Realm from "realm";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,Dimensions
} from 'react-native';
import { Todaysdata,Todays_schema } from "../realmdb/realmschema"
import { NASA_BASE_URL } from '@env';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import WebView  from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
var reader;
const Homescreen =(props,{navigation}) => {


const [pullrefresh, onrefresh] = useState(false);
    const [todaydata, setTodaydata] = useState()
    const [randomdataset, setrandomdata] = useState([])
    const [open, setOpen] = useState()

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    //Image of a particular date
    const getImageData =async(date)=>{
      setDatePickerVisibility(false);
    const selectedDate=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
     await  fetch(NASA_BASE_URL+"&date="+selectedDate, {
            method: 'get',
            headers: {
                      'Accept'  : '/',
          }
        },
         ) .then((response) => response.json())
         .then((json) => {
             if(json!=null)
           { props.navigation.navigate("ImageScreen",{data:json})  }      })
         .catch((error) => console.error("areu entra",error))

    }


    //Offline storage for todays image stored in realm when service issue occurs
    const  storerealm =  async (json,base64data) => {
 Realm.open({
  schema: [Todaysdata]
}).then(realm => {

  realm.write(() => {
  realm.deleteAll()
  })
      
});
 Realm.open({
        schema: [Todaysdata]
      }).then(realm => {

        realm.write(() => {
          realm.create(Todays_schema,{
                    date: json.date,
                    explanation:json.explanation,
                    media_type: json.media_type,
                    title:json.title,
                    url:base64data
                  } ,
                  "modified");
        });
        realm.close();

      });

    }

    //Refresh mechanism for flat list 
    const onRefresh=()=> {
      onrefresh(true)
      _retrieveData();
        }
      
//Converting the image url to base64 to show offline
    const  offlinestorge =  async (json) => {
      fetch(json.url)
      .then(res => res.blob())
      .then(data => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          const base64data = reader.result;
          storerealm(json,base64data)
        };
      });

    }

    //Fetching the data from NASA API 
    const  _retrieveData =  async () => { 
      await  fetch(NASA_BASE_URL+"&thumbs=true", {
            method: 'get',
            headers: {
                      'Accept'  : '/',
          }
        },
         ) .then((response) => response.json())
         .then((json) => {
        setTodaydata(json) 
        onrefresh(false)  
        offlinestorge(json)
        })
         .catch((error) => {
          onrefresh(false)      
         })

   

        await fetch(NASA_BASE_URL+"&count=10", {
            method: 'get',
            headers: {
                      'Accept'  : '/',
          }
        },
         ) .then((response) => response.json())
         .then((json) => {             
            setrandomdata(json)
            onrefresh(false)  
          }

            )
         .catch((error) => {onrefresh(false)  
         })

         Realm.open({
          schema: [Todaysdata]
        }).then(realm => {
        var todaysimage = realm.objects(Todays_schema)
        setOpen(todaysimage[0])
        });
    }
    useEffect(()=>{
        _retrieveData();
        },[] )


  
    return (
      <View style={styles.container}>
          <View style={styles.mainHeaderView}>
              <View style={styles.mainHeader}>
            <Text style={styles.mainHeaderTitle}>
            Astronomy Picture of the Day         </Text>
              <MaterialIcons name="today" size={30} style={{marginRight:"5%",marginTop:"-1%"}} color="black" onPress={()=>{setDatePickerVisibility(true)}}></MaterialIcons> 
          </View>
          </View>
        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(date) => {
        getImageData(date)
      }}
        onCancel={hideDatePicker}
      />
{randomdataset.length!=0&&todaydata!=undefined&&
        <FlatList style={styles.list}
        onRefresh={() => onRefresh()}
        refreshing={pullrefresh}

          data={randomdataset}
          keyExtractor= {(item,index) => {

            return item.url;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={(post,index) => {

              
              if(post.index==0)
              {
                  var item =todaydata
              }else
              { var item = post.item;}

              return (
              
             
              <View style={styles.card}>

             
                 {post.index==0 &&item.media_type=="video"&&
                               <WebView style={styles.todayCardImage} source={{uri:item.url}}/>

              }
               {post.index!=0 &&item.media_type=="video"&&
                               <WebView style={styles.cardImage} source={{uri:item.url}}/>

              }
              
  <TouchableOpacity onPress={()=>{props.navigation.navigate("ImageScreen",{data:item})}}>

                  {post.index==0 &&item.media_type=="image"&&
                  <View>
                  <Text style={{fontSize:20,padding:4,fontWeight:"bold",color:"black",}}>
                      Today
                  </Text>
             <Image style={styles.todayCardImage} source={{uri:item.url}}/>

             </View>
                  }

{post.index!=0 &&item.media_type=="image"&&
                <Image style={styles.cardImage} source={{uri:item.url}}/>

}
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description} numberOfLines={2}>{item.explanation}</Text>
                    <View style={styles.timeContainer}>
                    <MaterialIcons name="today" size={25}  ></MaterialIcons> 

                    <Text style={styles.time}>{item.date}</Text>
                    </View>
                  </View>
                </View>
                </TouchableOpacity>


                {/* <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                        <TouchableOpacity style={styles.socialBarButton} onPress={()=>{addedtoFavourites()}}>
                        <MaterialIcons name={estado ? 'favorite' : 'favorite-border'} size={30}  ></MaterialIcons> 
                      </TouchableOpacity>
                    </View>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton}>
                      <MaterialIcons name="share" size={30}  ></MaterialIcons> 

                      </TouchableOpacity>
                    </View>
                  </View>
                </View> */}
              </View>
            )
          }}/>
        }

{randomdataset.length==0&&open!=undefined&&
<View style={styles.offlinecard}>
  
<TouchableOpacity onPress={()=>{props.navigation.navigate("ImageScreen",{data:open})}}>

    
      <View>
 <Image style={{height:"90%",width:"100%"}} source={{uri:open.url}}/>
 </View> 
    <View style={styles.cardHeader}>
      <View>
        <Text style={{color:"black"}}>{open.title}</Text>
        <Text  numberOfLines={2} style={{color:"black"}}>{open.explanation}</Text>
        <View style={styles.timeContainer}>
        <MaterialIcons name="today" size={25} style={{color:"black"}} ></MaterialIcons> 
        <Text style={{color:"black"}}>{open.date}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  </View>
}
      </View>

    );

}
export default Homescreen;
const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  mainHeaderTitle:{marginLeft:"5%",
  fontSize:20,
  fontWeight:"bold",
  color:"black"},
  mainHeaderView:{width:width,
    height:"4%"},
  mainHeader:
  {flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center"},
  list: {
    paddingHorizontal: 17,
    backgroundColor:"#E6E6E6",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white"
  },
  offlinecard:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white",
    height:height*0.3,
  },

  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor:"#EEEEEE",
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  todayCardImage:{
    flex: 1,
    height: 350,
    width: null,
  },
  /******** card components **************/
  title:{
    color:"black",
    fontSize:18,
    flex:1,
  }, 
  description:{
    color:"black",

    fontSize:15,
    color:"#888",
    flex:1,
    marginTop:5,
    marginBottom:5,
  },
  time:{
    fontSize:13,
    color: "#808080",
    marginTop: 5
  },
  icon: {
    width:25,
    height:25,
  },
  iconData:{
    width:15,
    height:15,
    marginTop:5,
    marginRight:5
  },
  timeContainer:{
    flexDirection:'row'
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});