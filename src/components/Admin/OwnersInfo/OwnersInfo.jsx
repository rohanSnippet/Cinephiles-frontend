import React, { useEffect, useState } from "react";
import { PiFilmReelBold } from "react-icons/pi";
import useAxiosSecure from "../../Hooks/AxiosSecure";
import { IoIosMail } from "react-icons/io";

const OwnersInfo = () => {
  const [allOwners, setAllOwners] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const getAllOwners = async () => {
    try {
      const res = await axiosSecure.get(`/owner/get-owners`);
      if (res) {
        setAllOwners(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allOwners);
  useEffect(() => {
    getAllOwners();
  }, []);

  return (
    <div className="relative mx-auto">
      {" "}
      <div className="w-full h-16 bg-gradient-to-br from-black via-gray-900 to-black ring-2 ring-gray-900 ring-offset-2 rounded-xl">
        <h1 className="poppins-bold text-xl pl-6 pt-4 text-white flex">
          <PiFilmReelBold size={28} className="mr-3" /> MANAGE OWNERS & THEATRES
        </h1>
      </div>
      {/* filter & sort options */}
      <div></div>
      {/* all theatres with owners */}
      {allOwners.map((owner, i) => {
        return (
          <div className="collapse mt-4 collapse-arrow bg-gradient-to-br from-black/50 via-gray-900/40 to-slate-900  rounded-lg mx-auto w-[95%]">
            <input type="checkbox" />
            <div
              key={i}
              className="collapse-title relative mx-auto flex ring-white/30 ring-1"
            >
              <div className="text-lg poppins-bold pl-8 pt-1 text-white">
                {i + 1}
              </div>
              <div className="absolute left-[7%] justify-around pt-1 flex gap-x-1">
                {" "}
                <div className=" poppins-bold text-xl text-white ">
                  {owner.user.firstName}
                </div>
                <div className=" poppins-bold text-xl  text-white ">
                  {owner.user.lastName}
                </div>
              </div>
              <div className="flex justify-evenly gap-x-2 absolute poppins-light text-md  left-[35%] pt-1  text-white/90 ">
                <IoIosMail size={24} /> {owner.user.username}
              </div>
              <div className="absolute poppins-light text-md  left-[55%] pt-1  text-white/90 ">
                {owner.user.phone || "Contact Not Provided"}
              </div>
              <div className="absolute flex poppins-semibold text-lg  left-[75%] pt-1  text-white ">
                {owner.theatres.length} Theatre(s)
              </div>
            </div>
            <div className="collapse-content">
              {owner.theatres.map((theatre, i) => {
                return (
                  <div className="text-md gap-x-52 px-auto mt-4 border-e-white/20 flex roboto-bold text-white/70 ">
                    <div>{i + 1}</div>
                    <div className="flex gap-x-2">
                      {" "}
                      <div> {theatre.name}</div>{" "}
                      <div className="roboto-light"> {theatre.city}</div>
                    </div>
                    <div className=""> {theatre.tscreens} Screen(s)</div>
                    <div className="roboto-regular"> {theatre.contact}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OwnersInfo;
