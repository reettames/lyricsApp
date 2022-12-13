import { Button, Text, View, TextInput, StyleSheet, FlatList, Pressable} from "react-native";
import { push, ref, onValue } from'firebase/database';
import { useState, useEffect } from "react";
import { NavigationContainer } from'@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import initApp from "./firebaseconf";
import getPlaylists from "./playlists";
  
  export default function Favorites() {
      const db = initApp();
      const [playlist, setPlaylist] = useState({
        name: '',
        songs: []
      });

      const playlists = getPlaylists();

    const makePlaylist = () => {
      if (playlist.name.trim().length !== 0) {
        push(ref(db, 'playlist/'), {
            'name': playlist.name,
            'songs': playlist.songs
          });
      } else {
        alert('Insert a name first!')
      }
      };
 

    return(
        <View style={styles.container}>
          <Button style={styles.button} title='New Playlist' onPress={makePlaylist}/>
            <TextInput
                style={styles.textinput}
                placeholder='The name of your playlist..'
                onChangeText={text => setPlaylist({...playlist, name:text})}
                value={playlist.name}/>
            <FlatList style={styles.list}
              data={playlists}
              renderItem={({ item }) =>
              <Pressable /*onPress={showSongs(item)}*/>
                <Text style={styles.listElement}>{item.name}</Text>
              </Pressable>
            }/>
        </View>
    
    )
}
    const styles = StyleSheet.create({
        container: {
          flex: 5,
          backgroundColor: '#c1d6c6',
          alignItems: 'center',
          justifyContent: 'center',
      
        },
        textinput: {
          width:250,
          borderColor:'white', 
          borderWidth:1,
          height: 35,
          backgroundColor: '#e4f0e9',
          margin: 5
        },
        list: {
          flex: 1,
          margin: 1,
          marginTop: 15
        },
        listElement:{
          fontSize: 20,
          alignSelf: "center",
          height: 50,
          marginTop: 5,
          width: 320,
          backgroundColor: 'white',
          textAlign: "center",
        }
      });

