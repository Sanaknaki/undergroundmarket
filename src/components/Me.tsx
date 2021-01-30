import React, { useState, useEffect } from "react";

import { TrackInfoItem } from "./TrackInfoItem";

import { ListGroup } from "react-bootstrap";

interface MeProps {
    playlist: any[],
    playlistID: string
}

export const Me: React.FC<MeProps> = ({playlist, playlistID}) => {
    
    useEffect(() => {
        if(playlistID !== "-1") {
            renderStats();
        }
    }, [playlistID]);

    const [stats, setStats] = useState({
        undergroundStatus: "",
        numTracks: 0,
        avgPopularity: 0,
        numArtists: 0,
    });

    const [doneFetching = false, toggleDoneFetching] = useState(Boolean);

    function renderStats() {        
        let numTracks = 0;
        let totalPopularity = 0;
        let numArtists = new Set();

        for(let item of playlist) {
            numTracks++;
            totalPopularity += item.track.popularity;
            if(!numArtists.has(item.track.artists[0].name)) {
                numArtists.add(item.track.artists[0].name); 
            }
        }

        let avgPopularity = Math.floor(totalPopularity / numTracks)

        setStats({
            undergroundStatus: (avgPopularity > 80) ? "BAD" : (avgPopularity > 45) ? "AVERAGE" : "GREAT",
            numTracks,
            avgPopularity: avgPopularity,
            numArtists: numArtists.size
        });

        toggleDoneFetching(true);
    }

    if(!doneFetching) {
        return (
            <header className="track-view lightgray thicc">
                <i className="fas fa-spinner fa-spin fa-7x" /><span style={{marginLeft: "30px", fontSize: "30px"}}>Getting some info...</span>
            </header>
        );
    } else { 
        return (
            <ListGroup className="boxShadow">
                <TrackInfoItem label="Underground Status" value={stats.undergroundStatus}/>
                <TrackInfoItem label="Average Popularity" value={stats.avgPopularity ? stats.avgPopularity : "0"}/>
                <TrackInfoItem label="# Tracks" value={stats.numTracks}/>
                <TrackInfoItem label="# Artists" value={stats.numArtists}/>
            </ListGroup>
        );
        }
}