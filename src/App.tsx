import { HashRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "@/pages/MainPage";
import { CallbackPage } from "@/pages/CallbackPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="%2Fcallback" element={<CallbackPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
