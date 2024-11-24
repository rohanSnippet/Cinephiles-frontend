import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { MdDashboard, MdOutlineMovieFilter } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { GiTheater } from "react-icons/gi";
import { RiMovie2Line } from "react-icons/ri";
import useAxiosSecure from "../Hooks/AxiosSecure";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard />
        Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <BiCategory />
        Tours
      </Link>
    </li>
    {/*  <li>
      <Link to="/menu">
        <FaLocationArrow />
        Orders Tracking
      </Link>
    </li> */}
    <li>
      <Link to="/menu">
        <FaQuestionCircle />
        Customer support
      </Link>
    </li>
  </>
);
const DashboardLayout = () => {
  const [isAdmin, isAdminLoading] = useState(true);
  return (
    <div>
      {isAdmin ? (
        <div className="drawer sm:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-srart sm:justify-start my-2 shadow-xl shadow-slate-500 rounded-lg bg-gradient-to-tl  mx-2  from-base-100  to-base-200">
            {/* Page content here */}
            <div className="flex items-center justify-between mx-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button md:hidden lg:hidden"
              >
                <MdDashboardCustomize />
              </label>
              <button className="btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden">
                <FaRegUser />
                Logout
              </button>
            </div>
            <div className="mt-5  md:mt-2 mx-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <Link to="/owner" className="flex justify-start mb-3">
                  <img src="" alt="" className="w-26 h-10" />
                  <span className="badge badge-primary">Theatre Manager</span>
                </Link>
              </li>
              <hr />
              <li className="mt-3">
                <Link to="/owner">
                  <MdDashboard size={25} />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/owner/manage-theatres">
                  <RiMovie2Line size={25} />
                  Manage Theatres
                </Link>
              </li>
              <li className="mt-3">
                <Link to={`/owner/screen-details`}>
                  <GiTheater size={22} />
                  Screen Details
                </Link>
              </li>
              <li className="mt-3">
                <Link to="/owner/Show-details">
                  <MdOutlineMovieFilter size={25} />
                  Show Details
                </Link>
              </li>

              {/*
              <li>
                <Link to="/dashboard/manage-tour">
                  <MdManageSearch />
                  Manage Tours
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-tour">
                  <FaPlusCircle />
                  Add Tour
                </Link>
              </li>
              <li>
                <Link to="/dashboard/users">
                  <FaUsers />
                  All Users
                </Link>
              </li> */}

              <hr />

              {/* shared nav links */}
              {sharedLinks}
            </ul>
          </div>
        </div>
      ) : (
        <p>Login</p>
      )}
    </div>
  );
};

export default DashboardLayout;
