import { merge, cloneDeep } from "lodash";

export const userMock: SpotifyApi.CurrentUsersProfileResponse = {
  id: "user1",
  display_name: "Test User",
  birthdate: "1990-01-01",
  country: "US",
  email: "testuser@example.com",
  product: "premium",
  external_urls: { spotify: "https://open.spotify.com/user/user1" },
  href: "https://api.spotify.com/v1/users/user1",
  type: "user",
  uri: "spotify:user:user1",
  images: [
    {
      url: "https://i.scdn.co/image/testimage",
      height: 300,
      width: 300,
    },
  ],
};

export const playlistMock: SpotifyApi.PlaylistObjectSimplified = {
  id: "1",
  name: "Playlist 1",
  tracks: {
    href: "https://api.spotify.com/v1/playlists/1/tracks",
    total: 10,
  },
  collaborative: false,
  description: "A test playlist",
  external_urls: { spotify: "https://open.spotify.com/playlist/1" },
  href: "https://api.spotify.com/v1/playlists/1",
  images: [
    {
      url: "https://i.scdn.co/image/testimage",
      height: 300,
      width: 300,
    },
  ],
  owner: {
    display_name: "Test Owner",
    external_urls: { spotify: "https://open.spotify.com/user/owner1" },
    followers: {
      href: "https://api.spotify.com/v1/users/owner1/followers",
      total: 100,
    },
    href: "https://api.spotify.com/v1/users/owner1",
    id: "owner1",
    type: "user",
    uri: "spotify:user:owner1",
  },
  public: true,
  snapshot_id: "snapshot123",
  type: "playlist",
  uri: "spotify:playlist:1",
};

export const createPlaylistMock = (
  overrides: Partial<SpotifyApi.PlaylistObjectSimplified>
): SpotifyApi.PlaylistObjectSimplified => {
  return merge(cloneDeep(playlistMock), overrides);
};
