import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll";
import Header from "./components/Header";
import PourquoiUnify from "./components/PourquoiUnify";
import BentoGrid from "./components/BentoGrid";
import Avis from "./components/avis";
import Footer from "./components/footer";
import Abonnements from "./components/Abonnements";
import MentionsLegales from "./pages/MentionsLegales";
import CGU from "./pages/CGU";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
function HomePage() {
  return (
    <div className="min-h-screen bg-[#353331]">
      <Header />
      <PourquoiUnify />
      <BentoGrid />
      <Abonnements />
      <Avis />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/conditions-generales" element={<CGU />} />
        <Route
          path="/politique-de-confidentialite"
          element={<PolitiqueConfidentialite />}
        />
      </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
