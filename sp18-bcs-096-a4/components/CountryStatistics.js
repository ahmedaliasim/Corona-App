import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, View, Text, FlatList ,TextInput,SearchBar, TouchableOpacity,StyleSheet  } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import Iconz from 'react-native-vector-icons/Entypo'

export default function CountryStatistics({ navigation }) {
  
  const[countries,setCountries]=useState([])
  const[favcountries,setFavcountries]=useState('')
  const [arrayz,setArrayz] =useState([])
  const[text, setText] = useState('')
  useEffect(() => {
    loadingData()
    getData();
    
  },[])
  const loadingData=async()=>{
    try{
      AsyncStorage.getItem('favlist').then(
      (value) =>{
        console.log("val",value)
        }
        
    );

    } catch{
      console.log('error')

    }
    
    
  }
  
  const addItem=async(country)=>{
    
    try {
      const value = await AsyncStorage.getItem('favlist');
      console.log("Does it run",favcountries, value)
     
    
    
           await AsyncStorage.setItem('favlist', value+","+country);
          
        } catch (error) {
            // Error saving data
        }
        
  }
    const viewStatistics=(item)=>{
       console.log("Its here",item)
       navigation.navigate('StatisticsByCountry',{
         country: item
          })
     }
  
  function getData() {
    const option= {
  method: 'GET',
  url: 'https://world-population.p.rapidapi.com/allcountriesname',
  headers: {
    'x-rapidapi-key': '022d297466mshe99fc8604e4e2cap165ea1jsnf1f578053cc6',
    'x-rapidapi-host': 'world-population.p.rapidapi.com'
  }
};

axios.request(option).then(function (response) {
  console.log(response.data.body.countries);
  setCountries(response.data.body.countries)
  setArrayz(response.data.body.countries)
}).catch(function (error) {
  console.error(error);
});
  } 
  const searchData= (text)=>  {
    console.log("It searches")
    const newData = arrayz.filter(item => {
      const itemData = item.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });
    console.log("It gets back")

      setCountries(newData)
      setText(text)
    }
  
  const Header =({openDrawer})=> (
  <View style={styles.header}>
    <TouchableOpacity onPress={()=>openDrawer()}>
      <Icon name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text style={{width:50}}></Text>
  </View>
)

  return (
    <View style={styles.container}>

    <Header openDrawer={navigation.openDrawer} />
    
      <View style = {styles.container3}>
      <TextInput 
         style={styles.textInput1}
         onChangeText={(text) => searchData(text)}
         value={text}
         underlineColorAndroid='transparent'
         placeholder="Search Here" />
      </View>
      <FlatList
      style={styles.textInput}
        data={countries}
        renderItem={({item})=>(<View>
        <TouchableOpacity  style={styles.container2} >
        <Text onPress={()=>{viewStatistics(item)}} >{item}{item.check}></Text>
        <Iconz onPress={()=>{addItem(item)}} name="star-outlined" color={'yellow'}></Iconz>
        </TouchableOpacity>
        
        
  
        </View>)}
        keyExtractor={(item, index) => item.id}
        
      />
      
<Button onPress={() => navigation.navigate('Favorite Countries')} title="Go see favorite countries" color = 'black' />.

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: 'brown',
  },
   container2: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: 'brown',
   
  },
    container3: {
 
    paddingTop: 1,
    alignItems: 'center',
    backgroundColor: 'brown',
    paddingBottom: 22
  
     
  },
  
  
  textInput: {

    textAlign: 'center',
    height: 42,
  },
   textInput1: {
  
    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#2f3b39',
    paddingTop: 22,
    paddingBottom: 30,

  },
  header:{
    width:"100%",
    height:30,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20
  }

  
});


