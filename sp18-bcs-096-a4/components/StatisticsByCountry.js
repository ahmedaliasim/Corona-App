import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 


export default function StatisticsByCountry({ route,navigation }) {
  
  const[confirmedcases,setConfirmedcases]=useState()
  const[recovered,setRecovered]=useState()
  const[critical,setCritical]=useState()
  const[deaths,setDeaths]=useState()
  const[lastUpdate,setlastUpdate]=useState()
  const[country,setCountry]=useState()
  useEffect(() => {
    setCountry(route.params.country)
    console.log(route.params.country)
    getData(route.params.country);
  },[route.params.country])
    
  
  function getData(count) {
    const option= {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/country',
  params: {name: count},
  headers: {
    'x-rapidapi-key': '022d297466mshe99fc8604e4e2cap165ea1jsnf1f578053cc6',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
  }
};

axios.request(option).then(function (response) {
  console.log(response.data[0]);
  setConfirmedcases(response.data[0].confirmed)
  setRecovered(response.data[0].recovered)
  setCritical(response.data[0].critical)
  setDeaths(response.data[0].deaths)
  setlastUpdate(response.data[0].lastUpdate)
}).catch(function (error) {
  console.error(error);
});
    
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

      <Text style={styles.textzz1}>{country} Cases</Text>
      
      <View style={styles.textzz}>
      <Text style={styles.textzz2}> Confirmed Cases </Text>
      <Text style={styles}>{confirmedcases}</Text>
      </View>

      <View style={styles.textzz}>
       <Text style={styles.textzz2}> Recovered Cases </Text>
      <Text style={styles}> {recovered}</Text>
      </View>

      <View style={styles.textzz}>
      <Text style={styles.textzz2}> Critical Cases </Text>
      <Text style={styles}> {critical}</Text>
      </View>

      <View style={styles.textzz}>
      <Text style={styles.textzz2}> Deaths </Text>
      <Text style={styles}> {deaths}</Text>
      </View>

      <View>
      <Text style={styles.textzz3}>lastUpdated {lastUpdate}</Text>
      </View>
       <Button onPress={() => navigation.goBack()} title="Back To Country Stats" color= 'black' /> 
    </View>
      
    
  );
}
const styles = StyleSheet.create({
   container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: 'brown'
  },
  
   textzz2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop:8
  },
     textzz:{
    textAlign: 'center',
    fontSize: 18,
   borderColor: 'black',
    color: 'black',
    borderRadius:10,
    height: 70,
    width: 320,
    fontFamily: 'serif',
    borderWidth: 2,
    
  },

   textzz3: {
    color: 'black',
    fontSize: 15,
    paddingTop: 18,
    paddingBottom: 20,
  },

   textzz1: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    paddingBottom:12
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
