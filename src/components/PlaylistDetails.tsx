export function PlaylistDetails() {
  const playlist = {
    title: "Chill Vibes",
    description: "A collection of laid-back tracks to help you relax.",
    creator: "DJ Relaxo",
    trackCount: 42,
    coverUrl: "https://via.placeholder.com/200",
  };

  return (
    <section className="flex gap-6 items-start">
      <img
        src={playlist.coverUrl}
        alt={playlist.title}
        className="w-48 h-48 rounded shadow-md object-cover"
      />
      <div>
        <h2 className="text-xl font-bold">{playlist.title}</h2>
        <p className="text-gray-600 mt-2">{playlist.description}</p>
        <p className="text-sm text-gray-500 mt-4">By {playlist.creator}</p>
        <p className="text-sm text-gray-500">{playlist.trackCount} tracks</p>
      </div>
    </section>
  );
}
