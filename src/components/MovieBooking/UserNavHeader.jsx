import React, { useContext } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowDown, MdOutlineAddLocationAlt } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Profile from "../Home/Profile";
import useCity from "../Hooks/useCity";
import { AuthContext } from "../Context/AuthProvider";

const UserNavHeader = ({ navLocation, item }) => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const city = useCity();
  const handleSignIn = () => {
    navigate("/login", { state: { nextPath: location.pathname } });
  };

  const navigateTo = () => {
    navigate(navLocation, { state: { item: item } });
  };
  return (
    <div className="relative w-full">
      <div className="absolute left-10 top-0">
        <IoChevronBackSharp
          className="w-8 h-12 pt-2 text-white"
          onClick={navigateTo}
        />
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>{/* place your logo here */}</span>
          <span className="font-bold roboto-bold text-2xl hidden md:block text-white">
            Cinephiles
          </span>
          <span className="font-bold roboto-bold text-2xl sm:hidden text-white">
            CP
          </span>
        </div>
        <div className="flex grow justify-center roboto-light">
          <input
            className="md:flex hidden h-10 w-[250px] shadow-sm shadow-gray-600 rounded-3xl bg-transparent px-3 py-2 text-md placeholder:text-gray-200 text-white placeholder:text-center ring-1 ring-gray-200 hover:bg-black/20 ring-opacity-50 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Search"
          />
          <IoSearchOutline className="md:hidden text-white" size={24} />
        </div>
        {/* <MdMyLocation size={28} className="mr-2  text-gray-100 opacity-90" /> */}
        {city ? (
          <span className="flex mr-4">
            <Link
              to="/location"
              className=" rounded-3xl roboto-light ring-opacity-50 hover:bg-black/20 text-sm font-semibold text-white "
            >
              {city}
            </Link>
            <MdKeyboardArrowDown className="mt-0 text-white" size={20} />
          </span>
        ) : (
          <Link to="/location">
            <MdOutlineAddLocationAlt
              size={32}
              className="text-gray-100 opacity-85 mr-5"
            />
          </Link>
        )}
        <div className="lg:block">
          {userData && userData.username ? (
            <Profile />
          ) : (
            <button
              type="button"
              onClick={handleSignIn}
              className="rounded-3xl shadow-sm shadow-gray-600  roboto-regular ring-1 ring-gray-400 ring-opacity-50 hover:bg-black/20 px-5 py-2 text-sm font-semibold text-white  focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNavHeader;
