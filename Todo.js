import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet  } from 'react-native';

export default class TodoScreen extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true,
        dataSource: [],
        errorMessage: ''}
  }

  componentDidMount(){
            return fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((responseJson) => {
      
              this.setState({
                isLoading: false,
                dataSource: responseJson,
              }, function(){  
       
              });
      
            }) 
            .catch((error) =>{
              console.log(error)
              this.setState({
                  isLoading:false,
                  errorMessage:error
              })
            });
    
  }

  renderSeparator = () => {  
    return (  
        <View  
            style={{  
                height: 1,  
                width: "100%",  
                backgroundColor: "#000",  
            }}  
        />  
    );  
};  



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )  
    }

    if(this.state.errorMessage.trim()!=""){
      return(
        <View style={{flex: 1, padding: 20}}>
          <Text style={styles.h2text}>
          Error
        </Text>
        </View>
      )  
    }

    return(
      <View style={styles.container} >
        <Text style={styles.h2text}>
          Todo List
        </Text>
          <FlatList
          data={this.state.dataSource}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View style={styles.flatview}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.completed}>{'' +item.completed}</Text>
           
          </View>
          }
          ItemSeparatorComponent={this.renderSeparator}  
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
  
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    h2text: {
      marginTop: 10,
      fontFamily: 'Helvetica',
      fontSize: 20,
      fontWeight: 'bold',
    },
    flatview: {
      justifyContent: 'center',
      padding: 10,
      borderRadius: 2,
    },
    name: {
      fontSize: 16
    },
    completed: {
      color: 'red'
    }
    
  });