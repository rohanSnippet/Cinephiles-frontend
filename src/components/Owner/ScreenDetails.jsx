import React, { useEffect, useState } from "react";
import ScreenCard from "./ScreenCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from "../Common/Modal";
import useAxiosSecure from "../Hooks/AxiosSecure";

const ScreenDetails = () => {
  const axiosSecure = useAxiosSecure();
  const [screen, setScreen] = useState([]); // Use empty array as initial state
  const [theatreData, setTheatreData] = useState([]); // Initialize as an empty array
  const username = localStorage.getItem("username");
  useEffect(() => {
    fetchTheatres();
    getAllScreens();
  }, []);
  const fetchTheatres = async () => {
    try {
      const res = await axiosSecure.get(`/theatre/get-theatres/${username}`);
      setTheatreData(res.data); // Set theatre data fetched from API
    } catch (error) {
      console.error("Error fetching theatres:", error);
    }
  };

  let theatreId;
  if (theatreData.length > 0) {
    theatreId = theatreData[0].id;
  }
  const getAllScreens = async () => {
    try {
      const res = await axiosSecure.get(`/screens/all/${username}`);
      setScreen(res.data); // Set screens fetched from API
    } catch (error) {
      console.error("Error fetching screens:", error);
    }
  };

  const openModal = () => {
    document.getElementById("my_modal_2").showModal(); // Open modal by ID
  };

  return (
    <div className="">
      <div className="flex space-x-4 justify-center">
        {/* Modal */}
        <Modal path="screenDetails" theatreId={theatreId} />

        <div
          onClick={openModal}
          className="card bg-gradient-to-br hover:border-gray-700 border-double border-slate-800 border-2 cursor-pointer from-gray-800 via-base-100 to-slate-900 w-[40vh] h-[36vh] shadow-xl text-slate-300 hover:bg-gradient-to-br hover:from-slate-900 hover:via-slate-800 hover:to-slate-700 hover:shadow-xl shadow-slate-900"
        >
          <figure className="px-10 pt-10">
            <IoIosAddCircleOutline className="h-28 w-28" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title roboto-bold text-2xl">Add Screen</h2>
          </div>
        </div>
        <div className="flex">
          <div className="text-white poppins-semibold text-xl"></div>
          {screen.length > 0 ? ( // Use length check to see if there are screens
            <div className="flex gap-4">
              {screen.map(
                (
                  screenItem,
                  i // Avoid reusing the same name
                ) => (
                  <div key={i}>
                    <ScreenCard screen={screenItem} />
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="text-white">No screens available.</div> // Optional: Message if no screens
          )}
        </div>
      </div>
    </div>
  );
};

export default ScreenDetails;
