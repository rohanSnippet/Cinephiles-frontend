import React from "react";
import EnGCard from "./EnGCard";
import generes from "../../assets/generes.json";

const ExploreGeneres = () => {
  return (
    <div className=" py-12 bg-gradient-to-bl from-black/80 via-slate-800/40 to-black/70">
      <h2 className="text-6xl poppins-bold text-center text-white ">GENRES</h2>
      <h4 className="text-xl roboto-light text-center text-white my-4 pb-4">
        Endless Stories Await: Find the Perfect Genre for You
      </h4>
      <div className="text-lg flex-wrap flex mx-auto">
        {" "}
        {generes.map((g, i) => (
          <div key={i} className="mt-5 w-1/4 rounded-xl ">
            <EnGCard genere={g} />
          </div>
        ))}
      </div>
      <div className=" mt-7 py-3 text-center">
        <button className="badge bg-transparent border-double border-white text-white hover:transition-transform hover:scale-105 hover:bg-gradient-to-br hover:from-white/10 hover:via-white/20 hover:to-white/35 hover:bg-opacity-15 poppins-regular text-2xl py-5 px-7">
          More Genres
        </button>
      </div>
    </div>
  );
};

export default ExploreGeneres;
