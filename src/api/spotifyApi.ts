import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

export const setAccessToken = (token: string) => {
  spotifyApi.setAccessToken(token);
};

export const getCurrentUser =
  async (): Promise<SpotifyApi.CurrentUsersProfileResponse | null> => {
    return await spotifyApi.getMe();
  };

export const getPlaylistTracks = async (playlistId: string) => {
  const data = await spotifyApi.getPlaylistTracks(playlistId);
  return data.items ?? [];
};

export const getUserPlaylists = async () => {
  const data = await spotifyApi.getUserPlaylists();
  return data.items ?? [];
};

export const getPlaylistById = async (playlistId: string) => {
  return spotifyApi.getPlaylist(playlistId);
};
