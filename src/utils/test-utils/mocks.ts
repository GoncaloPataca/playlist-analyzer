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
      total: 1625,
    },
    href: "https://api.spotify.com/v1/users/owner1",
    id: "owner1",
    type: "user",
    uri: "spotify:user:owner1",
  },
  public: true,
  snapshot_id: "123456789",
  type: "playlist",
  uri: "spotify:playlist:1",
};

const singlePlaylistMock: SpotifyApi.SinglePlaylistResponse = {
  collaborative: false,
  description: "A test playlist",
  external_urls: { spotify: "https://open.spotify.com/playlist/1" },
  followers: {
    href: "https://api.spotify.com/v1/playlists/1/followers",
    total: 1625,
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
      total: 1625,
    },
    href: "https://api.spotify.com/v1/users/owner1",
    id: "owner1",
    type: "user",
    uri: "spotify:user:owner1",
  },
  public: true,
  snapshot_id: "123456789",
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

const trackObjectFullMock: SpotifyApi.TrackObjectFull = {
  album: {
    album_type: "album",
    available_markets: ["US"],
    external_urls: { spotify: "https://open.spotify.com/album/album1" },
    href: "https://api.spotify.com/v1/albums/album1",
    id: "album1",
    images: [
      {
        url: "https://i.scdn.co/image/testimage",
        height: 300,
        width: 300,
      },
    ],
    name: "Test Album",
    type: "album",
    uri: "spotify:album:album1",
  },
  artists: [
    {
      external_urls: {
        spotify: "https://open.spotify.com/artist/artist1",
      },
      href: "https://api.spotify.com/v1/artists/artist1",
      id: "artist1",
      name: "Test Artist",
      type: "artist",
      uri: "spotify:artist:artist1",
    },
  ],
  available_markets: ["US"],
  disc_number: 1,
  duration_ms: 180000,
  explicit: false,
  external_ids: { isrc: "USRC17607839" },
  external_urls: { spotify: "https://open.spotify.com/track/track1" },
  href: "https://api.spotify.com/v1/tracks/track1",
  id: "track1",
  name: "Test Track",
  popularity: 50,
  preview_url: "https://p.scdn.co/mp3-preview/testpreview",
  track_number: 1,
  type: "track",
  uri: "spotify:track:track1",
};

export const createTrackObjectFullMock = (
  overrides?: Partial<SpotifyApi.TrackObjectFull>
): SpotifyApi.TrackObjectFull => {
  return merge(cloneDeep(trackObjectFullMock), overrides);
};

const playlistTrackMock: SpotifyApi.PlaylistTrackObject = {
  added_at: "2023-01-01T00:00:00Z",
  added_by: {
    external_urls: { spotify: "https://open.spotify.com/user/user1" },
    href: "https://api.spotify.com/v1/users/user1",
    id: "user1",
    type: "user",
    uri: "spotify:user:user1",
  },
  is_local: false,
  track: createTrackObjectFullMock(),
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

export const createPlaylistTrackMock = (
  overrides?: Partial<SpotifyApi.PlaylistTrackObject>
): SpotifyApi.PlaylistTrackObject => {
  return merge(cloneDeep(playlistTrackMock), overrides);
};
