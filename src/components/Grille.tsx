import genre from "../assets/Genre.png";
import map from "../assets/Background.svg";
import record from "../assets/Group 55.svg";
import mapInter from "../assets/mapIntera.png";
export default function Grille() {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 flex flex-col items-center sm:12">
      <h1 className="text-2xl font-bold mb-6">
        Pourquoi choisir Unify et pas les autres ?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 w-full max-w-5xl auto-rows-min">
        <div className="bg-gradient-to-b from-[#716d6d] to-[#D9D9D9] p-4 pb-0 rounded-2xl shadow-md flex flex-col items-start sm:col-span-1 lg:col-span-1 lg:row-span-2 overflow-hidden">
          <p className="text-2xl font-extrabold uppercase mb-4">
            Modes de
            <br />
            connexion
          </p>
          <img
            src={genre}
            alt="Sélection du genre"
            className="w-full mx-auto mt-auto object-contain"
          />
        </div>

        <div className="bg-gradient-to-b from-[#716d6d] to-[#D9D9D9] p-4 rounded-2xl shadow-md text-center flex flex-col justify-center sm:col-span-1 lg:col-span-1">
          <p className="text-lg font-semibold">Battez vos records</p>
          <img src={record} alt="Visibilité" className="w-full h-full" />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300">
          <p className="font-semibold text-center mb-2">
            🇪🇺 Application disponible dans toute l'Europe
          </p>
        </div>

        <div className="  p-2 rounded-2xl shadow-md flex items-center justify-center sm:col-span-1">
          <img src={map} alt="Application" className="" />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
          <img
            src={mapInter}
            alt="Carte interactive"
            className="w-auto h-auto"
          />
        </div>
      </div>
    </div>
  );
}
