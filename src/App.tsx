import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Main } from "./components/Main";
import { TrackInfo } from "./components/TrackInfo";
import { Me } from "./components/Me";

import { NavigationBar } from "./components/NavigationBar";

import { getCurrentUser, getCurrentUsersPlaylists, getPopularDailyPlaylist, createUndergroundMarketPlaylist, checkTokenValidity } from "./utils/APIController";
import { Credentials, authEndpoint } from "./utils/Credentials";
import hash from "./utils/Hash";

import './css/App.css';

const App: React.FC<{}> = () => {

    const spotify = Credentials();

    const [token, setToken] = useState("");
    const [user, setUser] = useState({fn: "", id: ""});
    
    const [undergroundPlaylist, setUnderGroundPlaylist] = useState([]);
    const [undergroundPlaylistID, setUndergroundPlaylistID] = useState("");

    const [popularDailyPlaylist, setPopularDailyPlaylist] = useState([]);

    useEffect(() => {
        let _token = (localStorage.getItem("TOKEN")) ? (localStorage.getItem("TOKEN")) : hash.access_token;
        if(_token) {
            localStorage.setItem("TOKEN", _token)
            setToken(_token);
            getCurrentUser(_token, setUser);
            getCurrentUsersPlaylists(_token, setUnderGroundPlaylist, setUndergroundPlaylistID);
            getPopularDailyPlaylist(_token, setPopularDailyPlaylist);
        }

        window.location.hash = "";
    }, []);
    
    // if(localStorage.getItem("TOKEN")) {
    //     checkTokenValidity();
    // }

    return (
    <Router>
        <NavigationBar token={token} spotify={spotify} authEndpoint={authEndpoint}/>

        {
            token || localStorage.getItem("TOKEN") ? 
                (
                    <Switch>
                        <Route exact path="/undergroundmarket/">
                            <Main 
                                token={token}
                                name={user.fn} 
                                undergroundPlaylist={undergroundPlaylist}  
                                undergroundPlaylistID={undergroundPlaylistID}
                                popularDailyPlaylist={popularDailyPlaylist}

                                createUndergroundMarketPlaylist={() => createUndergroundMarketPlaylist(token, user.id, setUnderGroundPlaylist, setUndergroundPlaylistID)}
                            />
                        </Route>

                        <Route path={"/undergroundmarket/track/:trackId"}>
                            <TrackInfo
                                playlist={undergroundPlaylist}
                                playlistID={undergroundPlaylistID}
                            />
                        </Route>

                        <Route path="/undergroundmarket/me">
                            <Me 
                                playlist={undergroundPlaylist}
                                playlistID={undergroundPlaylistID}
                            />
                        </Route>

                    </Switch>
                )
            :
                <h1>YOU ARE NOT LOGGED IN!</h1>
        }

    </Router>
    );
}

export default App;
