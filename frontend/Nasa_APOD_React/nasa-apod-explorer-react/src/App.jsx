import { useState } from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./pages/Home.jsx";
import GalleryPage from "./pages/GalleryPages.jsx";
import FavoritesPage from "./pages/FavoritesPages.jsx";
import NotFound from "./pages/NotFound.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <FavoritesProvider>
      <div className={darkMode ? "app dark-mode" : "app"}>
        <Router>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </FavoritesProvider>
  );
}

export default App;
