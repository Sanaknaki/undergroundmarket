import React, { useState, useEffect } from "react";

import { TrackInfoItem } from "./TrackInfoItem";

import { Jumbotron, Col, Row, ListGroup, Container } from "react-bootstrap";

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
            <header className="App-header">
                <Jumbotron className='text-left' style={{fontSize: `calc(10px + 2vmin)`, width: "100%", backgroundColor: "transparent", paddingLeft: "0px"}}>
                    <Row>
                        <Col md={1} />
                        <Col className="text-left" md={11}>
                            <span className="bold"><span className="gray">Here's some <span className="blue">insight</span> on your playlist. </span></span>
                        </Col>
                    </Row>
                </Jumbotron>
                
                <Container>
                    <Row>
                        <Col md={12} style={{marginBottom: "50px"}}>
                            <Row>
                                <Col className="text-left" md={{span: 6, offset: 3}}>
                                    <span className="bold gray" style={{fontSize: "16px"}}>Insight</span>
                                    <ListGroup className="boxShadow">
                                        <TrackInfoItem label="Underground Status" value={stats.undergroundStatus}/>
                                        <TrackInfoItem label="Average Popularity" value={stats.avgPopularity ? stats.avgPopularity : "0"}/>
                                        <TrackInfoItem label="# Tracks" value={stats.numTracks}/>
                                        <TrackInfoItem label="# Artists" value={stats.numArtists}/>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </header>
        );
        }
}