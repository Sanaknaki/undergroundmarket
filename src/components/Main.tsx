import React from "react";

import { PlaylistListItem } from './PlaylistListItem';

import { Jumbotron, Col, Row, ListGroup } from "react-bootstrap";

interface MainProps {
    token: string,
    undergroundPlaylist: any[],
    undergroundPlaylistID: string,
    popularDailyPlaylist: any[],
    name: string,

    createUndergroundMarketPlaylist: Function
}

export const Main: React.FC<MainProps> = ({token, name, undergroundPlaylist, undergroundPlaylistID, popularDailyPlaylist, createUndergroundMarketPlaylist}) => {
    
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
                    <Col md={1} />
                    <Col className="text-left" md={3}>
                    <span className="bold gray" style={{fontSize: "16px"}}>Playlist</span>
                    <ListGroup className="boxShadow">
                                    {
                                        (undergroundPlaylist && undergroundPlaylistID !== "-1") ?
                                            renderPlaylist()
                                        :
                                            <Col className="text-center" md={12}>
                                                <span onClick={() => createUndergroundMarketPlaylist(token)} className="bold lightgray" style={{fontSize: "16px", display: "block", cursor: "pointer"}}>
                                                    Create a playlist named "Underground Market" to start.
                                                </span>
                                            </Col>
                                    }
                    </ListGroup>
                    </Col>
                    <Col sm={4} />
                    <Col className="text-left" md={3}>
                        <span className="bold gray" style={{fontSize: "16px"}}>Popular Tracks Today</span>
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
                    </Col>
                    <Col md={1} />
                </Row>
            </header>
        </div>
    );
}