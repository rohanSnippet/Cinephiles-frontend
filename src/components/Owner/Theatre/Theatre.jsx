import Modal from "../../Common/Modal";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import TheatreDetails from "./TheatreDetails";
import useAxiosSecure from "../../Hooks/AxiosSecure";

const Theatre = () => {
  const axiosSecure = useAxiosSecure();
  const [theatreData, setTheatreData] = useState([]);

  const username = localStorage.getItem("username");

  const fetchTheatres = async () => {
    const res = await axiosSecure.get(`/theatre/get-theatres/${username}`);
    setTheatreData(res.data);
  };

  useEffect(() => {
    fetchTheatres();
  }, [axiosSecure]);

  const openModal = () => {
    document.getElementById("my_modal_4").showModal();
  };

  return (
    <div>
      <div className="flex space-x-4">
        {/* Modal */}
        <Modal path="add-Theatre" />

        <div
          onClick={openModal}
          className="card bg-gradient-to-br hover:border-gray-700 border-double border-slate-800  border-2 cursor-pointer from-gray-800 via-base-100 to-slate-900 w-[40vh] h-[36vh] shadow-xl text-slate-300 hover:bg-gradient-to-br hover:from-slate-900 hover:via-slate-800 hover:to-slate-700  hover:shadow-xl shadow-slate-900"
        >
          <figure className="px-10 pt-10">
            <IoIosAddCircleOutline className="h-28 w-28" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title roboto-bold text-2xl">
              Add Theatre[TBA]
            </h2>
          </div>
        </div>
        {theatreData.length > 0 ? (
          <div>
            {theatreData.map((theatre, i) => (
              <div key={i}>
                <TheatreDetails theatreData={theatre} />
              </div>
            ))}
          </div>
        ) : (
          <div>NO THEATRES</div>
        )}
      </div>
    </div>
  );
};

export default Theatre;
