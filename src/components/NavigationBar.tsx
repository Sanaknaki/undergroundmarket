import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { Nav, Navbar } from "react-bootstrap";

import logo from "../img/logo.png";

interface NavigationBarProps {
    token: String
    authEndpoint: String
    spotify: {client_id: String, redirect_uri: String, scopes: string[]}
}

export const NavigationBar: React.FC<NavigationBarProps> = ({token, spotify, authEndpoint}) => {

    return (
        <Router forceRefresh>
            <Navbar sticky={"top"} style={{paddingTop: "25px", paddingBottom: "25px"}} bg="transparent">
                <Navbar.Brand><Link to="/undergroundmarket/"><img src={logo} className="App-logo" alt="logo" /></Link></Navbar.Brand>
                        <Nav className="mr-auto" />
                        {
                        (token === "") ? 
                            <Nav.Link href={`${authEndpoint}client_id=${spotify.client_id}&redirect_uri=${spotify.redirect_uri}&scope=${spotify.scopes.join("%20")}&response_type=token&show_dialog=true`}>Login</Nav.Link> 
                            :
                            <React.Fragment>
                                {/* <Nav.Link href="/track/1"><i className="fas fa-search gray"></i></Nav.Link> */}
                                {
                                    window.location.pathname.includes("me") ? 
                                    <Nav.Link href="/undergroundmarket/"><i className="fas fa-home gray"></i></Nav.Link> 
                                    :
                                    <Nav.Link href="/undergroundmarket/me"><i className="fas fa-eye gray"></i></Nav.Link> 
                                }
                            </React.Fragment>
                        }
                </Navbar>
        </Router>
    );
}