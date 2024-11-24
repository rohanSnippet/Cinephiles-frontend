import React, { useState } from "react";
import regions from "../../assets/regions.json";
import regions2 from "../../assets/regions2.json";
import { Link } from "react-router-dom";

const Location = () => {
  const [add, setAdd] = useState("");

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setAdd(data.address);
          console.log(data.address); // For debugging
        })
        .catch((err) => console.error("Error fetching address:", err));
    });
  };

  return (
    <div className="">
      {/* <p>road : {add.road}</p>
      <p>city : {add.city}</p>
      <p>country :{add.country}</p> */}

      <div className=" max-w-3xl  mt-4 mx-5">
        <h1 className="text-5xl poppins-semibold text-white pt-6 px-6">
          Set Location
        </h1>
      </div>
      <div className="text-center poppins-regular text-white">
        <h1>Address: {add ? JSON.stringify(add) : "No address yet"}</h1>
        <button onClick={fetchLocation}>Get Location</button>
      </div>
      <div className="flex grow justify-center roboto-light mt-9">
        <input
          className="md:flex hidden h-10 w-[500px] shadow-sm shadow-gray-600 rounded-2xl bg-transparent px-3 py-2 text-md placeholder:text-gray-200 text-white placeholder:text-center ring-1 ring-gray-200 hover:bg-black/20 ring-opacity-50 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Select Location"
        />
      </div>
      <div className="relative mx-64 gap-4 mt-12 flex">
        {regions.map((region, i) => (
          <div key={i}>
            <div className="relative card lhover:border-double hover:border-slate-800 rounded-xl hover:border-2 w-[30vh] h-[24vh] cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <Link to={`/location/cities1/${i}`}>
                <div
                  className="absolute h-full w-full text-center text-black rounded-xl bg-center bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url('${region.pic}')`,
                  }}
                ></div>
              </Link>
            </div>
            <div className="relative card rounded-xl w-[32vh] text-center mt-2">
              <h2 className="w-full poppins-regular text-xl text-white opacity-95 hover:opacity-100">
                {region.region}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <div className="relative mx-60 mt-4 gap-4 flex">
        {regions2.map((region, i) => (
          <div key={i}>
            <div className="relative card lhover:border-double hover:border-slate-800 rounded-xl hover:border-2 w-[30vh] h-[24vh] cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <Link to={`/location/cities2/${i}`}>
                <div
                  className="absolute h-full w-full text-center text-black rounded-xl bg-center bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url('${region.pic}')`,
                  }}
                ></div>
              </Link>
            </div>
            <div className="relative card rounded-xl w-[32vh] text-center mt-2">
              <h2 className="w-full poppins-regular text-xl text-white opacity-95 hover:opacity-100">
                {region.region}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
