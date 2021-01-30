import React, {useState, useEffect} from "react";
import axios from "axios";

import { TrackInfoItem } from "./TrackInfoItem";

import { Row, Col, ListGroup, Button} from "react-bootstrap";

interface TrackInfoProps {
    playlist: any[]
    playlistID: string
}

type Track = {
    album: any,
    artists: any[],
    id: string,
    name: string,
    popularity: number,
    uri: string,
};

export const TrackInfo: React.FC<TrackInfoProps> = ({playlist, playlistID}) => {
    
    const [doneFetching = false, toggleDoneFetching] = useState(Boolean);
    const [updating = false, toggleUpdating] = useState(Boolean);

    const [trackInPlaylistValues, toggleTrackInPlaylist] = useState({
        isInPlaylist: false,
        dateAdded: ""
    });

    const [token, setToken] = useState("");
    const [track, setTrack] = useState<Track>();

    useEffect(() => {
        let _token = (localStorage.getItem("TOKEN"));
        if(_token) {
            setToken(_token);
            axios("https://api.spotify.com/v1/tracks/" + window.location.pathname.split('/')[3], {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + _token
            },
            data: "grant_type=client_credentials",
            method: "GET"
            })
            .then(response => {
                for(let listTrack of playlist) {
                    if(listTrack.track.id === response.data.id) {
                        toggleTrackInPlaylist({
                            isInPlaylist: true,
                            dateAdded: listTrack.added_at.slice(0, 10)
                        });
                        break;
                    }
                }

                toggleDoneFetching(true);
                setTrack(response.data);
            });
        }
    }, [playlist]);

    function addRemoveTrack(found: Boolean) {
        toggleUpdating(true);

        axios("https://api.spotify.com/v1/playlists/" + playlistID + "/tracks", {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + token
            },
            data: { uris: [track?.uri] },
            method: (found) ? "DELETE" : "POST"
        })
        .then(() => {
            toggleTrackInPlaylist({isInPlaylist: !trackInPlaylistValues.isInPlaylist, dateAdded: "Just now"});
            toggleUpdating(false);
        });
    }

    function renderActionButton() {
        return (
            <Button className={(trackInPlaylistValues.isInPlaylist) ? "white remove-btn bold" : "gray add-btn bold"} disabled={updating} onClick={() => addRemoveTrack(trackInPlaylistValues.isInPlaylist)}>
                {
                    (updating) ? 
                        <React.Fragment>
                            <i className="fas fa-spinner fa-spin" /> Making it so...
                        </React.Fragment>
                    :
                        (trackInPlaylistValues.isInPlaylist) ? 
                            "Remove From Playlist" 
                        : 
                            "Add To Playlist"
                }
            </Button>
        )
    }
  
    if(!doneFetching) {
        return (
            <header className="track-view lightgray thicc">
                <i className="fas fa-spinner fa-spin fa-7x" /><span style={{marginLeft: "30px", fontSize: "30px"}}>Getting some info...</span>
            </header>
        );
    } else {
        return (
            <header className="track-view">
                <Row>
                    <Col style={{marginBottom: "50px"}} className="d-flex justify-content-center" md={12}>
                        <div style={{backgroundImage: "url(" + track?.album.images[0].url + ")", backgroundSize: "cover", backgroundRepeat: "no-repeat",height: "350px", width: "350px"}}></div>
                    </Col>

                    <Col style={{marginBottom: "50px"}} className="text-center" md={12}>
                        <span className="thicc green" style={{fontSize: "35px", display: "block" }}>{track?.name}</span>
                        <span className="medium gray" style={{fontSize: "18px", display: "block" }}>{track?.artists[0].name}</span>
                    </Col>
                    <Col md={12} style={{marginBottom: "50px"}}>
                        <Row>
                            <Col md={{span: 6, offset: 3}}>
                                <ListGroup className="boxShadow">
                                    <TrackInfoItem label="Popularity" value={track?.popularity}/>
                                    <TrackInfoItem label="Date Of Release" value={track?.album.release_date}/>                 
                                    {
                                        (trackInPlaylistValues.isInPlaylist) ?
                                            <TrackInfoItem label="Date Added To Playlist" value={trackInPlaylistValues.dateAdded}/>
                                        :
                                            null
                                    }
                                </ListGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={12} className="text-center">
                        {renderActionButton()}
                    </Col>
                </Row>
            </header>
        );
    }
}