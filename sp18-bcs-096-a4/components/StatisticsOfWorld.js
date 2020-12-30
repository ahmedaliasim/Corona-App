import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, View, Text, StyleSheet,TouchableOpacity  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function StatisticsOfWorld({ navigation }) {
  const[confirmedcases,setConfirmedcases]=useState()
  const[wraps,setWraps]=useState()
  const[recovered,setRecovered]=useState()
  const[critical,setCritical]=useState()
  const[deaths,setDeaths]=useState()
  const[lastUpdate,setlastUpdate]=useState()
  const[worldpopulation,setWorldpopulation]=useState()
  useEffect(() => {
    
    getData();
    getworlddata();
  },[])
    
  function getworlddata(){
    const option= {
  method: 'GET',
  url: 'https://world-population.p.rapidapi.com/worldpopulation',
  headers: {
    'x-rapidapi-key': '022d297466mshe99fc8604e4e2cap165ea1jsnf1f578053cc6',
    'x-rapidapi-host': 'world-population.p.rapidapi.com'
  }
};

axios.request(option).then(function (response) {
  setWorldpopulation(response.data.body.world_population);
  console.log("check",response.data.body.world_population)
}).catch(function (error) {
  console.error(error);
});

  }
  
  function getData() {
    

const option= {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/totals',
  params: {code: 'it'},
  headers: {
    'x-rapidapi-key': '022d297466mshe99fc8604e4e2cap165ea1jsnf1f578053cc6',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
  }
};

axios.request(option).then(function (response) {
  setConfirmedcases(response.data[0].confirmed)
  setRecovered(response.data[0].recovered)
  setCritical(response.data[0].critical)
  setDeaths(response.data[0].deaths)
  setlastUpdate(response.data[0].lastUpdate)

}).catch(function (error) {
  console.error(error);
});
  }
  function datacal(value){
    const val =(100 * value) / worldpopulation
    return val.toFixed(2)
  }

  const Header =({ openDrawer})=> (
  <View style={styles.header}>
    <TouchableOpacity onPress={()=>openDrawer()}>
      <Icon name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text style={{width:50}}></Text>
  </View>
)

  return (
    <View style={styles.container}>

    <Header openDrawer={navigation.openDrawer}/>

    <View style={styles.textzz}> 
    <Text style={styles.textzz2}> Confirmed Cases </Text>
      
      <Text > {confirmedcases} which makes {datacal(confirmedcases)}% of the World  population which is {worldpopulation} </Text>
      </View>

    <View style={styles.textzz}> 
        <Text style={styles.textzz2}> Recovered Cases </Text>
          
          <Text> {recovered} which makes {datacal(recovered)}% of World population which is {worldpopulation}</Text>
          </View>

    <View style={styles.textzz}> 
        <Text style={styles.textzz2}> Critical Cases </Text>
          
          <Text> {critical} which makes {datacal(critical)}% of World population which is {worldpopulation} </Text>
          </View>



    <View style={styles.textzz}> 
        <Text style={styles.textzz2}> Deaths </Text>
          
          <Text> {deaths} which makes {datacal(deaths)}% of World population which is {worldpopulation}</Text>
          </View>


      <Text style={styles.textzz3}>lastUpdated {lastUpdate} </Text>

      <Button color= 'black' onPress={() => navigation.navigate('Statistics of Country')} title="Back to Country" />
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
    paddingTop: 22,
    paddingBottom: 30,
  },
header:{
    width:"100%",
    height:30,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:0,
    
  }
  
});


