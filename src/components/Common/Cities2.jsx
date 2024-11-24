import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import regions2 from "../../assets/regions2.json";
import useAxiosSecure from "../Hooks/AxiosSecure";
import useAuth from "../Hooks/useAuth";

const Cities2 = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const user = useAuth();
  const { id } = useParams();
  const region = regions2[id];
  const handleLocation = async (e) => {
    console.log(e.target.value);
    const res = await axiosSecure.put(`/user/update-location/${user.id}`, {
      currLocation: e.target.value,
    });
    console.log("User updated successfully", res.data);
    navigate("/");
  };
  if (!region) {
    return <div>Region not found</div>;
  }

  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold">{region?.region}</h1>{" "}
      {/* Display region */}
      <ul className="mt-6">
        {region?.cities.map((city, index) => (
          <li key={index} className="text-2xl">
            <button value={city} onClick={handleLocation}>
              {" "}
              {city}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cities2;
