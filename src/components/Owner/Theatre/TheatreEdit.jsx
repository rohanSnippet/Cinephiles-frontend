import React from "react";
import { useLocation, useParams } from "react-router-dom";

const TheatreEdit = () => {
  const { id } = useParams();
  const location = useLocation();
  const { theatreData } = location.state || "";
  console.log(theatreData);

  return (
    <div>
      Theatre ID is : {id || "No Theatre"}
      <div className="text-white">Theatre Name is:{theatreData.name} </div>
      <div className="text-white">Screens Limit is:{theatreData.tscreens} </div>
      <div className="text-white">
        Address:{theatreData.tscreens},{theatreData.city},{theatreData.state}{" "}
      </div>
    </div>
  );
};

export default TheatreEdit;
