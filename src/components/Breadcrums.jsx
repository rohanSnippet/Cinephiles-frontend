import React from "react";

const Breadcrums = () => {
  return (
    <div>
      {" "}
      <div className=" flex h-[10vh] w-[97%] mx-auto bg-gradient-to-tr from-stone-300/30 to-slate-300/30 glass rounded-sm text-white roboto-regular my-2">
        {/* <div>
    <IoIosArrowBack className="w-12 h-16 pt-1" />{" "}
  </div> */}
        <div className="my-auto ml-6">
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a>Documents</a>
              </li>
              <li>Add Document</li>
            </ul>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Breadcrums;
