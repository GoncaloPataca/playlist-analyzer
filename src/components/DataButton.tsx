export const DataButton = () => (
  <button
    onClick={async () => {
      await getUserProfile();
    }}
  >
    Get User Data
  </button>
);

async function getUserProfile() {
  const token = localStorage.getItem("access_token");
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  console.log(data);
}
