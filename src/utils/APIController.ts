import axios from "axios";

// Get the current user
export async function getCurrentUser(token: string, setUser: Function) {
    await axios("https://api.spotify.com/v1/me", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + token
        },
        data: "grant_type=client_credentials",
        method: "GET"
    })
    .then(response => {
        // console.log(response);
        setUser({fn: response.data.display_name.split(" ")[0], id: response.data.id});
    });
};

// Get the Underground Market playlist
export async function getCurrentUsersPlaylists(token: string, setUnderGroundPlaylist: Function, setUndergroundPlaylistID: Function) {
    await axios("https://api.spotify.com/v1/me/playlists", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + token
        },
        data: "grant_type=client_credentials",
        method: "GET"
    })
    .then(response => {
        let found = false;

        for(let playlist of response.data.items) {
            if(playlist.name === "Underground Market") {
                found = true;
                axios("https://api.spotify.com/v1/playlists/" + playlist.id, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Bearer " + token
                    },
                    data: "grant_type=client_credentials",
                    method: "GET"
                })
                .then(response => {
                    response.data.tracks.items.sort((a: any, b: any) => (a.track.popularity < b.track.popularity) ? 1 : -1);
                    console.log(response.data);
                    // setPopularDailyPlaylist(response.data.tracks.items);
                    setUnderGroundPlaylist(response.data.tracks.items);
                    setUndergroundPlaylistID(playlist.id);
                });
            }
        }

        if(!found) {
            setUndergroundPlaylistID("-1");
        }
    });
};

// Gets the Top 50 Global playlist
export async function getPopularDailyPlaylist(token: string, setPopularDailyPlaylist: Function) {
    await axios("https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + token
        },
        data: "grant_type=client_credentials",
        method: "GET"
    })
    .then(response => {
        response.data.tracks.items.sort((a: any, b: any) => (a.track.popularity < b.track.popularity) ? 1 : -1);

        setPopularDailyPlaylist(response.data.tracks.items);
    });
}

// Create the Underground Market playlist
export async function createUndergroundMarketPlaylist(token: string, userID: string ,setUnderGroundPlaylist: Function, setUndergroundPlaylistID: Function) {
    await axios("https://api.spotify.com/v1/users/" + userID + "/playlists", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + token
        },
        data: {
            name: "Underground Market",
            description: "Investing in underground music!"
        },
        method: "POST"
    })
    .then(() => {
        getCurrentUsersPlaylists(token, setUnderGroundPlaylist, setUndergroundPlaylistID);
    });
}

// This needs to be .. better.
export async function checkTokenValidity() {
    let currentToken = localStorage.getItem("TOKEN");

    await axios("https://api.spotify.com/v1/me/player", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + currentToken
        },
        data: "grant_type=client_credentials",
        method: "GET"
    })
    .catch((err) => {
        console.log(err);
        if(err.response.status === 401) {
            localStorage.removeItem("TOKEN");
        }
    })
}