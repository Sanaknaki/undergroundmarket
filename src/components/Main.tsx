import React, { useState } from "react";

import { PlaylistListItem } from "./PlaylistListItem";
import { Search } from "./Search";

import { Jumbotron, Col, Row, ListGroup, Container } from "react-bootstrap";

interface MainProps {
    token: string,
    undergroundPlaylist: any[],
    undergroundPlaylistID: string,
    popularDailyPlaylist: any[],
    name: string,

    createUndergroundMarketPlaylist: Function,
}

export const Main: React.FC<MainProps> = ({token, name, undergroundPlaylist, undergroundPlaylistID, popularDailyPlaylist, createUndergroundMarketPlaylist}) => {
    
    const [searching = false, toggleSearching] = useState(Boolean);

    function renderPlaylist() {
        let list = [];
        if(undergroundPlaylist.length === 0) {
            return (
                <ListGroup.Item>
                    <Col className="text-center" md={12}>
                        <span className="bold lightgray" style={{fontSize: "16px", display: "block"}}>
                            Add music to your playlist to view them in your playlist portfolio!
                        </span>
                    </Col>
                </ListGroup.Item>
            );
        }

        list = undergroundPlaylist.map((item, idx) => {
            return (
                <PlaylistListItem 
                    key={idx}
                    track={item.track}
                />
            )
        });

        return list;
    }

    return (
        <div className="App">
            <header className="App-header">
                <Jumbotron className='text-left' style={{width: "100%", backgroundColor: "transparent", paddingLeft: "0px"}}>
                    <Row style={{fontSize: `calc(10px + 2vmin)`, width: "100%", marginLeft: "auto", marginRight: "auto"}}>
                        <Col md={1} />
                        <Col className="text-left" md={11}>
                            <span className="bold"><span className="gray">Good morning,</span> <span className="blue">{name}!</span></span>
                        </Col>
                    </Row>
                </Jumbotron>

                <Row style={{width: "100%", marginLeft: "auto", marginRight: "auto"}}>
                    <Col className="text-left" md={{span: 3, offset: 1}}>
                    <span className="bold gray" style={{fontSize: "16px"}}>Playlist</span>
                    <ListGroup className="boxShadow">
                                    {
                                        (undergroundPlaylist && undergroundPlaylistID !== "-1") ?
                                            renderPlaylist()
                                        :
                                            <ListGroup.Item onClick={() => createUndergroundMarketPlaylist(token)} style={{fontSize: "16px", display: "block", cursor: "pointer"}}>
                                                <Container>
                                                    <Row>
                                                        <Col className="text-left" md={12}>
                                                            <span className="medium gray">👆🏽 &nbsp;&nbsp;&nbsp; Click here to create your <span className="bold blue">"Underground Market"</span> playlist!</span>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </ListGroup.Item>
                                    }
                    </ListGroup>
                    </Col>

                    <Col md={{span: 3, offset: 4}}>
                        <Row>
                        <Col className="text-left" md={6}>
                            <span onClick={() => toggleSearching(false)} className={(searching ? "medium" : "bold") + " " + (searching ? "gray" : "blue")} style={{fontSize: "16px", cursor: "pointer"}}>Popular Tracks Today</span>
                        </Col>
                        <Col className="text-right" md={6}>
                            <span onClick={() => toggleSearching(true)} className={(searching ? "bold" : "medium") + " " + (searching ? "blue" : "gray")} style={{fontSize: "16px", cursor: "pointer"}}>Search</span>
                        </Col>
                        </Row>
                        {
                            (searching) ?
                                <Search token={token}/>
                            :
                            <ListGroup className="boxShadow">
                                {
                                    popularDailyPlaylist.map((item, idx) => {
                                        return <PlaylistListItem 
                                                    key={idx}
                                                    track={item.track}
                                                />;
                                    })
                                }
                            </ListGroup>
                        }
                    </Col>
                </Row>
            </header>
        </div>
    );
}