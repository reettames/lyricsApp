import { useEffect, useState } from "react";
import initApp from "./firebaseconf";
import { onValue, ref } from "firebase/database";

export default function getPlaylists() {
    const [playlists, setPlaylists] = useState([]);
    const db = initApp();

    useEffect(() => {
        const playlistRef = ref(db, 'playlist/');
        onValue(playlistRef, (snapshot) => {const data = snapshot.val();
        setPlaylists(Object.values(data));
      })
    }, []);
    return playlists

}