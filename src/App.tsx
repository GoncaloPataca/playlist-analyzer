import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSpotifyAuth } from "./hooks/useAuth";
import { MainPage } from "./pages/MainPage";
import { Callback } from "./pages/Callback";

function App() {
  useSpotifyAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
