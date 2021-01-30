import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";

import logo from "./img/logo.png";
import loginAnimation from "./img/login.json";
import manageAnimation from "./img/manage.json";
import trackingAnimation from "./img/track.json";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Row, Col} from "react-bootstrap";

import { Main } from "./components/Main";
import { TrackInfo } from "./components/TrackInfo";
import { Me } from "./components/Me";

import { NavigationBar } from "./components/NavigationBar";

import { getCurrentUser, getCurrentUsersPlaylists, getPopularDailyPlaylist, createUndergroundMarketPlaylist } from "./utils/APIController";
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

    const [, updateState] = useState();

    const loginOptions = {
        loop: true,
        autoplay: true, 
        animationData: loginAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const manageOptions = {
        loop: true,
        autoplay: true, 
        animationData: manageAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };


    const trackingOptions = {
        loop: true,
        autoplay: true, 
        animationData: trackingAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

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

    console.log("render");

    return (
        <Router>
            <NavigationBar token={token} spotify={spotify} authEndpoint={authEndpoint} updateState={updateState}/>

            {
                token || localStorage.getItem("TOKEN") ? 
                    (
                        <Switch>
                            <Route exact path="undergroundmarket/">
                                <Main 
                                    token={token}
                                    name={user.fn} 
                                    undergroundPlaylist={undergroundPlaylist}  
                                    undergroundPlaylistID={undergroundPlaylistID}
                                    popularDailyPlaylist={popularDailyPlaylist}

                                    createUndergroundMarketPlaylist={() => createUndergroundMarketPlaylist(token, user.id, setUnderGroundPlaylist, setUndergroundPlaylistID)}
                                />
                            </Route>

                            <Route path={"undergroundmarket/track/:trackId"}>
                                <TrackInfo
                                    playlist={undergroundPlaylist}
                                    playlistID={undergroundPlaylistID}
                                />
                            </Route>

                            <Route path="undergroundmarket/me">
                                <Me 
                                    playlist={undergroundPlaylist}
                                    playlistID={undergroundPlaylistID}
                                />
                            </Route>

                        </Switch>
                    )
                :
                <div className="App">
                    <header className="track-view">
                        <Row>
                            <Col md={12} style={{marginBottom: "100px"}}>
                                <img src={logo} alt="logo" height={"80px"}/>
                            </Col>
                            <Col md={4}>
                                <h1 className="thicc blue">Step 1</h1>
                                <span className="medium gray">
                                    Log into your Spotify account.
                                </span>

                                <Lottie 
                                    options={loginOptions}
                                    height={400}
                                    width={400}
                                    isStopped={false}
                                    isPaused={false}
                                />
                            </Col>

                            <Col md={4}>
                                <h1 className="thicc blue">Step 2</h1>
                                <span className="medium gray">
                                    Add / Update your "Underground Market" playlist (Add when popularity is low, remove when high)!
                                </span>

                                <Lottie 
                                    options={manageOptions}
                                    height={400}
                                    width={400}
                                    isStopped={false}
                                    isPaused={false}
                                />
                            </Col>

                            <Col md={4}>
                                <h1 className="thicc blue">Step 3</h1>
                                <span className="medium gray">
                                    Track how "underground" your playlist is!
                                </span>

                                <Lottie 
                                    options={trackingOptions}
                                    height={400}
                                    width={400}
                                    isStopped={false}
                                    isPaused={false}
                                />
                            </Col>
                        </Row>
                    </header>
                </div>
            }

        <Navbar fixed="bottom" bg="transparent">
            <span className="thin black" style={{fontSize: "12px"}}>Made with ❤️ by Ali Sanaknaki</span>
        </Navbar>
        </Router>
    );
}

export default App;
