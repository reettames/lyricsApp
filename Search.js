
import { useState, useEffect, FlatList } from "react";
import { Text, View, Button, TextInput, StyleSheet} from "react-native";
import initApp from "./firebaseconf";
import { SelectList } from "react-native-dropdown-select-list";
import getPlaylists from "./playlists";
import { push, child, ref } from "firebase/database";

export default function SearchSong() {
  const [song, setSong] = useState({
    song_id: '',
    title: '',
    artist:'',
    lyrics: ''
  });

  const apiKey = 'adfc92617ff431533f50f582c4e6f303';
  const db = initApp();

  const checkNull = () => {
    if (song.title.trim().length !== 0 && song.artist.trim().length !== 0){
      getData();

    } else{
      alert('Insert artist and a song title!')
    }
  };

  const getData = () => {
    fetch( `http://api.musixmatch.com/ws/1.1/track.search?apikey=${apiKey}&q_artist=${song.artist}&q_track=${song.title}`)
      .then(res => res.json())
      .then(data => setSong({
        ...song,
         song_id: data.message.body.track_list[0].track.track_id}))

      fetch(`http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${apiKey}&track_id=${song.song_id}`)
      .then(res => res.json())
      .then(data => setSong({
        ...song,
        lyrics: data.message.body.lyrics.lyrics_body}))
    };

    const hideLyrics = () => {
      setSong({...song,
        song_id: '',
         lyrics: '',
         artist: '',
         title: ''
    })
  };
    const [keys, setKeys] = useState([]);
    const [playlist, setPlaylist] = useState({});
    const playlists = getPlaylists();
    playlists.map((item) =>{
      keys.push({key: item.key, value: item.name})
    })
    

  const addToPlaylist = () => {
      /*push((ref(db, 'playlist/' + playlist.key + '/songs')), {
          song_id: song.song_id,
          title: song.title,
          artist: song.artist,
          lyrics: song.lyrics
        });*/
      }

    return(
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput
            style={styles.textinput}
            placeholder='Artist'
            placeholderTextColor= '#37593f'
            onChangeText={artist => setSong({...song, artist: artist})}
            value={song.artist}
        />
        <TextInput
            style={styles.textinput}
            placeholder='Song'
            placeholderTextColor= '#37593f'
            onChangeText={songTitle => setSong({...song, title: songTitle})}
            value={song.title}
        />
        <Button title="Search" onPress={checkNull}/>
        <Text>{song.lyrics}</Text>
  
      </View>
      <View style={styles.buttons}>
        <SelectList 
          setSelected={(val) => setPlaylist(val)}
          data={keys}
          onSelect={addToPlaylist}
          placeholder='Add to a playlist'
      /> 
        <Button color='red' title='Hide' onPress={hideLyrics}/>
      </View>
    </View>
    )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c1d6c6'

  },
  search: {
    flex: 5,
    backgroundColor: '#c1d6c6',
    alignItems: 'center',
    justifyContent: "center"
  },
  textinput: {
    textAlign: "center",
    width:300,
    borderColor:'white', 
    borderWidth:1,
    height: 35,
    backgroundColor: '#e4f0e9',
    margin: 5
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  
});



