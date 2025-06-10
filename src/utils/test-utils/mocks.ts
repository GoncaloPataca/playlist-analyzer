import { merge, cloneDeep } from "lodash";

const userMock: SpotifyApi.CurrentUsersProfileResponse = {
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

const simplifiedPlaylistMock: SpotifyApi.PlaylistObjectSimplified = {
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

const singlePlaylistMock: SpotifyApi.SinglePlaylistResponse = {
  collaborative: false,
  description: "A test playlist",
  external_urls: { spotify: "https://open.spotify.com/playlist/1" },
  followers: {
    href: "https://api.spotify.com/v1/playlists/1/followers",
    total: 100,
  },
  href: "https://api.spotify.com/v1/playlists/1",
  id: "1",
  images: [
    {
      url: "https://i.scdn.co/image/testimage",
      height: 300,
      width: 300,
    },
  ],
  name: "Playlist 1",
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
  tracks: {
    href: "https://api.spotify.com/v1/playlists/1/tracks",
    total: 10,
    items: [],
    limit: 100,
    next: "https://api.spotify.com/v1/playlists/1/tracks?offset=100",
    offset: 0,
    previous: "https://api.spotify.com/v1/playlists/1/tracks?offset=0",
  },
  type: "playlist",
  uri: "spotify:playlist:1",
};

export const createUserMock = (
  overrides?: Partial<SpotifyApi.CurrentUsersProfileResponse>
): SpotifyApi.CurrentUsersProfileResponse => {
  return merge(cloneDeep(userMock), overrides);
};

export const createSimplifiedPlaylistMock = (
  overrides?: Partial<SpotifyApi.PlaylistObjectSimplified>
): SpotifyApi.PlaylistObjectSimplified => {
  return merge(cloneDeep(simplifiedPlaylistMock), overrides);
};

export const createSinglePlaylistMock = (
  overrides?: Partial<SpotifyApi.SinglePlaylistResponse>
): SpotifyApi.SinglePlaylistResponse => {
  return merge(cloneDeep(singlePlaylistMock), overrides);
};
