import React, { useState } from "react";

import { PlaylistListItem } from "./PlaylistListItem";

import { searchForTrack } from "../utils/APIController";

import { Col, Container, FormControl, InputGroup, ListGroup, Row } from "react-bootstrap";

interface SearchProps {
    token: string,
}

export const Search: React.FC<SearchProps> = ({token}) => {

    const [searching = false, toggleSearching] = useState(Boolean);
    const [searchValues, setValues] = useState({
        query: "",
        results: {} as any
    });

    async function onSearchUpdate(e: any) {
        if (e.target.value && /\S/.test(e.target.value)) {
            toggleSearching(true);
            await searchForTrack(token, e.target.value, setValues);
        } else {
            setValues({
                query: "",
                results: {}
            });
        }

        toggleSearching(false);
    }

    function renderResults() {
        if(Object.keys(searchValues.results).length === 0 && !/\S/.test(searchValues.query)) {
            return (
                <ListGroup.Item>
                    <Container>
                        <Row className="black">
                            <Col className="text-left" md={12}>
                                <span className="medium lightgray">🎵 &nbsp;&nbsp;&nbsp; Search for a track!</span>
                            </Col>
                        </Row>
                    </Container>
                </ListGroup.Item>
            );
        } else if(searchValues.results.items.length !== 0) {
            let list = [];

            for(let track in searchValues.results.items) {
                list.push(
                    <PlaylistListItem 
                        key={track}
                        track={searchValues.results.items[track]}
                    />
                );
            }

            return list;
        } else {
            return (
                <ListGroup.Item>
                    <Container>
                        <Row className="black">
                            <Col className="text-left" md={12}>
                                <span className="medium lightgray">🤕 &nbsp;&nbsp;&nbsp; No results!</span>
                            </Col>
                        </Row>
                    </Container>
                </ListGroup.Item>
            );
        }
    }

    return (
        <React.Fragment>
            <InputGroup className="mb-3">
                <FormControl onChange={(e) => onSearchUpdate(e)} placeholder={"Hotline Bling..."} aria-describedby="track-search" />
            </InputGroup>
            {
                (searching) ? 
                    <span className="lightgray">
                        <i className="fas fa-spinner fa-spin" />
                    </span>
                :
                    <React.Fragment>
                    {(searchValues.results.items && searchValues.results.items.length !== 0) ? 
                        <div className="text-left" style={{width: "100%"}}>
                            <span className="gray">Showing {searchValues.results.items.length} of <span className="bold blue">{searchValues.results.total}</span></span> 
                        </div>
                    : 
                        null
                    }
                    <ListGroup className="boxShadow">
                        {renderResults()}
                    </ListGroup>
                    </ React.Fragment>
            }
        </React.Fragment>
    );
}