import React from "react";

import { ListGroup, Row, Col, Container } from "react-bootstrap";

import { Link } from "react-router-dom";

interface PlaylistListItemProps {
    track: any,
}

export const PlaylistListItem: React.FC<PlaylistListItemProps> = ({track}) => {
    return (
        <Link to={"/track/" + track.id}>
            <ListGroup.Item>
                <Container>
                    <Row style={{color: "black"}}>
                        <Col className="text-left" md={10}>
                            <span className="thicc gray" style={{fontSize: "20px", display: "block" }}>{track.name}</span>
                            <span className="bold lightgray" style={{fontSize: "12px", display: "block"}}>{track.album.artists[0].name}</span>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-end" md={2}>
                            <span className="bold blue" style={{fontSize: "16px"}}>{track.popularity}</span>
                        </Col>
                    </Row>
                </Container>
            </ListGroup.Item>
        </Link>
    );
}