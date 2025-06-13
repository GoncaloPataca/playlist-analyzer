import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "@/pages/MainPage";
import { CallbackPage } from "@/pages/CallbackPage";

function App() {
  return (
    <BrowserRouter basename="/spotify-playlist-analyser">
      <Routes>
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
