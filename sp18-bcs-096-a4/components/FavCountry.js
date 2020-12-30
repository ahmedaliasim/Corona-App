import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, View, Text, FlatList,StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function FavCountry({ route,navigation }) {

  const[favcountries,setFavcountries]=useState([])
  const isFocused = useIsFocused();
  useEffect(() => {
    
    loadingData()
    
  },[isFocused])
    
  const loadingData=async()=>{
    try{
      AsyncStorage.getItem('favlist').then(
      (value) =>{
        console.log("val",value)
        var array = value.split(",");
        console.log(array)
        var uniqueArray = [];
        
        
        for(var i=0; i < array.length; i++){
            if(uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        setFavcountries(uniqueArray)
        }
        
    );

    } catch{
      console.log('error')

    }
    
    
  }
  const viewStatistics=(item)=>{
       console.log("Its here",item)
       navigation.navigate('StatisticsByCountry',{
         country: item
          })
     }

  const Header =({openDrawer})=> (
  <View style={styles.header}>
    <TouchableOpacity onPress={()=>openDrawer()}>
      <Icon name="ios-menu" size={32}  />
    </TouchableOpacity>
    <Text style={{width:50}}></Text>
  </View>
)
   
  return (
    <View style={styles.container}>

     <Header openDrawer={navigation.openDrawer}/>
     
      <FlatList
      
        data={favcountries}
        renderItem={({item})=>(<View>
        <TouchableOpacity  style={styles.container2} >
        <Text onPress={()=>{viewStatistics(item)}} style={styles.fortext2}>{item}></Text>
        
        </TouchableOpacity>
 
        </View>)}
        keyExtractor={(item, index) => item.id}
        
      />

       <Button onPress={() => navigation.goBack()} title="Go back Statistics of Country" color = 'black' />

    </View>
  );
}
const styles = StyleSheet.create({
 container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: 'brown',
    paddingBottom:20
  },
    container2: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: 'brown',

  },
  
  fortext2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  header:{
    width:"100%",
    height:30,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20,
  }

  
});
