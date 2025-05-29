export function extractPlaylistId(input: string): string | null {
  const match = RegExp(/playlists\/([^/?]+)/).exec(input);
  const playlistId = match ? match[1] : null;

  return playlistId;
}
