import React from "react";

const EnGCard = ({ genere, experiences }) => {
  return (
    <div className=" ml-6 relative card rounded-xl w-[42vh] h-[30vh]">
      {genere ? (
        <div
          className="z-10 text-white/80  hover:transform hover:translate-y-[-15px] hover:scale-[1.05] transition-all duration-300 ease-in-out absolute object-contain bg-bottom h-full w-full text-center hover:text-white rounded-xl"
          style={{
            backgroundImage: `url('${genere.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Remove the img tag and display only the genre text */}
          <h2 className="z-30 absolute poppins-bold text-3xl w-full bottom-10 left-0 opacity-100">
            {genere.genre}
          </h2>
          <div className="z-20 rounded-xl bg-gradient-to-r from-black/80 via-black/50 to-transparent h-[100%] w-[100%] absolute opacity-0 hover:opacity-100"></div>
        </div>
      ) : (
        <div
          className=" ml-16 z-10 text-white/80  hover:transform hover:translate-y-[-15px] hover:scale-[1.05] transition-all duration-300 ease-in-out absolute object-contain bg-bottom h-full w-full text-center hover:text-white rounded-xl"
          style={{
            backgroundImage: `url('${experiences.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Remove the img tag and display only the genre text */}
          <h2 className="z-30 absolute poppins-bold  text-3xl w-full bottom-10 left-0 opacity-100">
            {experiences.experiences}
          </h2>
          <div className="z-20 rounded-xl bg-gradient-to-r from-black/80 via-black/50 to-transparent h-[100%] w-[100%] absolute opacity-0 hover:opacity-100"></div>
        </div>
      )}
    </div>
  );
};

export default EnGCard;
