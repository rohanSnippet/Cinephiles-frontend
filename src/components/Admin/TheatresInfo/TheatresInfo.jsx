import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/AxiosSecure";
import { GiCheckMark } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { MdMovieEdit } from "react-icons/md";

const TheatresInfo = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axiosSecure.get(`/get-requests`);
      const data = res.data;
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };
  useEffect(() => {
    fetchData(); // Call the async function
  }, [axiosSecure]);
  // console.log(requests);

  const handleMakeOwner = async (request) => {
    try {
      const res1 = await axiosSecure.put(
        `/admin/make-owner?username=${request.username}&&id=${request.id}`
      );
      if (res1) alert("success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="ring-2 ring-gray-900 ring-offset-2 rounded-xl flex items-center bg-gradient-to-br from-black via-gray-900 to-black mb-2 shadow-2xl text-white shadow-slate-600 p-4 text-xl poppins-semibold gap-x-8">
        <MdMovieEdit size={32} className="ml-8" /> MANAGE THEATRE REQUESTS
      </div>
      <div className="overflow-x-auto">
        <table className="table table-pin-rows">
          {/* head */}
          <thead>
            <tr>
              <th>Theatre</th>
              <th>User</th>
              <th>Screens Request</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>
          {requests && requests.length > 0 ? (
            <tbody>
              {/* row 1 */}
              {requests.map(
                (request, index) =>
                  request.status == `PENDING` && (
                    <tr key={index} className="roboto-regular text-white">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{request.tname}</div>
                            <div className="text-sm opacity-50 ">
                              {request.tlocation}
                              {request.status}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {request.username}
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          {request.contact}
                        </span>
                      </td>
                      <td>{request.tscreens}</td>
                      <td>
                        <button
                          className="btn btn-ghost btn-xs text-green-300"
                          onClick={() => handleMakeOwner(request)}
                        >
                          {" "}
                          <GiCheckMark size={24} />
                        </button>
                      </td>
                      <td>
                        {" "}
                        <button className="btn btn-ghost btn-xs text-red-300">
                          <ImCross size={20} />
                        </button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td className="text-center">No requests found.</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default TheatresInfo;
