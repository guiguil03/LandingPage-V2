import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Map from "./components/map";
import Grille from "./components/Grille";
import Avis from "./components/avis";
import Footer from "./components/footer";
import Abonnements from "./components/Abonnements";
import MentionsLegales from "./pages/MentionsLegales";
import CGU from "./pages/CGU";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ScrollToTop from "./components/ScrollToTop";

function HomePage() {
  return (
    <div className="min-h-screen bg-[#353331]">
      <Header />
      <Map />
      <Grille />
      <Abonnements />
      <Avis />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/conditions-generales" element={<CGU />} />
        <Route
          path="/politique-de-confidentialite"
          element={<PolitiqueConfidentialite />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
