export const Credentials = () => {
    const client_id = "d7a4392f350d493090f11dea6a95f1ce"; // Your client id
    const client_secret = "f55d28528eeb4e55a385f4dedb7b502b"; // Your secret
    const redirect_uri = "https://sanaknaki.github.io/undergroundmarket"; // Your redirect uri
    const scopes = [
        "user-read-email",
        "user-read-currently-playing",
        "user-read-playback-state",
        "playlist-modify-public"
    ];

    return {
        client_id,
        client_secret,
        redirect_uri,
        scopes
    }
}

export const authEndpoint = "https://accounts.spotify.com/authorize?";