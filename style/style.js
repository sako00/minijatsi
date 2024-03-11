import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    
    marginBottom: 15,
    backgroundColor: '#b0b0f5',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    

  },
  rulesheader:{
    marginTop: 20,
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Ojuju',
    color: '#09021c'
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#b0b0f5',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
    
    
  },
  author: {
    color: "black",
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Ojuju'
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10,
    
  },
  infologo: {
    textAlign: 'center',
    justifyContent: 'center',
    margin: 2
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    
    padding: 10,
    backgroundColor: "#d7b3d0",
    width: 100,
    borderRadius: 15,
    textAlign: 'center',
    margin: 10,
        
  },
  buttonText: {
    color:"#8080d8",
    fontSize: 20,
    
  },
  textline: {
    margin: 2,
    padding: 5,
   alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderTopWidth: 0.2,
    fontFamily: 'Ojuju',
    color: '#060017',
    
  
  },
  input:{
    textAlign:'center', 
    fontSize: 20, 
    margin: 10, 
    padding: 10,
    borderColor: 'black',
    borderWidth: 1
  }
  
 
    
  
  
});