import React, { useEffect, useState } from "react";

const Rough = () => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  return (
    <div className="text-white">
      <h1>Update title</h1>
      <input
        type="text"
        name="first"
        value={first}
        id=""
        onChange={(e) => setFirst(e.target.value)}
      />
      <input
        type="text"
        name="second"
        value={second}
        id=""
        onChange={(e) => setSecond(e.target.value)}
      />
      <div className="mt-64 ml-40 text-white">
        <h1>
          {first} {second}
        </h1>
      </div>
    </div>
  );
};

export default Rough;
