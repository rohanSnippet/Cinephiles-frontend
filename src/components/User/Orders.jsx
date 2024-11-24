import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/AxiosSecure";
import { PiFilmReelBold } from "react-icons/pi";

const Orders = () => {
  const axiosSecure = useAxiosSecure();
  const username = localStorage.getItem("username");
  const [orders, setOrders] = useState([]); // Initialize as an empty array

  const fetchOrder = async () => {
    try {
      const response = await axiosSecure.get(`/order/getOrder/${username}`);

      // If response.data is a single object, wrap it in an array
      setOrders(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (!orders.length) {
    return <div>...Loading</div>;
  }

  return (
    <div className="mx-5 mt-3">
      <div className="w-full h-16 bg-gradient-to-br from-black via-gray-900 to-black ring-2 ring-gray-900 ring-offset-2 rounded-xl">
        <h1 className="poppins-bold text-xl pl-6 pt-4 text-white flex">
          <PiFilmReelBold size={28} className="mr-3" /> ORDERS
        </h1>
      </div>

      <div className=" bg-gradient-to-br from-black/30 via-gray-900/30 to-slate-900/80 rounded-md relative mx-auto flex mt-4 py-2">
        {orders.map((order, i) => (
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <div className="card-body">
              <figure>
                <img alt=""/>
              </figure>
              <h2 className="card-title">New album is released!</h2>
              <p> Booking Date: {order.bookingDate}</p>
              <p> Booking Date: {order.bookingDate}</p>
              <p>Click the button to listen on Spotiwhy app.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">
                  Booking Date: {order.bookingDate}
                </button>
                <button className="btn btn-primary">
                  Booking Time: {order.bookingTime.substring(0, 5)}
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* <div key={i} className="mx-auto">
            <h2 className="font-bold text-lg">
              
            </h2>
            <h2 className="font-bold text-lg">
              Booking Time: {order.bookingTime.substring(0, 5)}
            </h2>
            <p>Seats: {order.seats}</p>
            <p>Total Amount: {order.totalAmount}</p>
            <p>Screen Name: {order.screenName}</p>
            <p>Status: {order.isCanceled ? "Canceled" : "Confirmed"}</p>
          </div> */}
      </div>
    </div>
  );
};

export default Orders;
