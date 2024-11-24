import React from "react";
import experiences from "../../assets/experiences.json";
import EnGCard from "./EnGCard";

const Experiences = () => {
  return (
    <div className=" py-12 bg-gradient-to-br from-black via-slate-800/30 to-black">
      <h2 className="text-6xl poppins-bold text-center text-white ">
        EXPERIENCES
      </h2>
      <h4 className="text-xl roboto-light text-center text-white my-4 pb-4">
        Get the best cinema viewing experiences
      </h4>
      <div className="text-lg flex-wrap flex mx-auto">
        {" "}
        {experiences.map((e, i) => (
          <div key={i} className="mt-5 w-1/3 rounded-xl ">
            <EnGCard experiences={e} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;
