import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/AxiosSecure";

const BookingReview = () => {
  const [time, setTime] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedData, movie } = location.state || {}; // Safely destructure selectedData
  const axiosSecure = useAxiosSecure();

  const handleTimeout = async () => {
    try {
      const response = await axiosSecure.delete(
        `/bookings/unlock-seats?showId=${selectedData.showId}&user=${selectedData.user}`
      );
      if (response.status === 200) {
        console.log("success :", response);
      }
      return response; // Return the entire response if needed
    } catch (error) {
      console.error("Error hitting API on timeout:", error);
      return { error: true, message: error.message }; // Or return null/error object
    }
  };

  // Fetch the remaining time when the component mounts
  useEffect(() => {
    const fetchRemainingTime = async () => {
      if (!selectedData) return; // Ensure selectedData is present
      try {
        const response = await axiosSecure.get(
          `/bookings/remaining-time?showId=${selectedData.showId}&user=${selectedData.user}`
        );
        const remainingTime = response.data;
        setTime(remainingTime);
      } catch (error) {
        console.error("Error fetching remaining time:", error);
      }
    };

    fetchRemainingTime();

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(interval); // Clear the interval when time is up
          handleTimeout(); // Call the function to hit the API
          return 0; // Ensure time is set to 0
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedData, axiosSecure]);

  const handleBackNavigation = async () => {
    const response = await handleTimeout(); // Wait for API response
    if (response?.status === 200) {
      // navigate("/all-shows", { state: { item: movie } });
    }
  };

  /* (function (window, location) {
    history.replaceState(
      null,
      document.title,
      location.pathname + "#!/stealingyourhistory"
    );
    history.pushState(null, document.title, location.pathname);

    window.addEventListener(
      "popstate",
      function () {
        if (location.hash === "#!/stealingyourhistory") {
          history.replaceState(null, document.title, location.pathname);
          setTimeout(function () {
            location.replace("http://www.programadoresweb.net/");
          }, 0);
        }
      },
      false
    );
  })(window, location);
   */
  window.addEventListener("popstate", handleBackNavigation);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { minutes, secs };
  };

  const { minutes, secs } = formatTime(time);

  // Redirect if selectedData is not present
  if (!selectedData) {
    navigate(`/all-shows`, { state: { item: movie } });
    return null; // Prevent rendering
  }

  const handleBooking = async () => {
    try {
      const response = await axiosSecure.post(
        `/bookings/book-seats`,
        selectedData
      );
      if (response.status === 200) {
        console.log("Seats Booked successfully:", response.data);
        navigate("/");
      }
    } catch (error) {
      console.error("Error hitting API on timeout:", error);
    }
  };

  return (
    <div className="flex w-[100%] h-screen">
      <div className="w-3/5 overflow-y-auto h-[100vh]">
        <div className="bg-fuchsia-800 h-1/5">Snacks Banner</div>
        <div className="bg-stone-500 h-4/5">Snacks</div>
      </div>
      <div className="relative w-2/5 bg-gradient-to-tr from-stone-400 via-amber-50 to-orange-100/80 h-full overflow-y-scroll overflow-x-hidden">
        <div className="px-6 bg-gradient-to-tr from-base-100/90 via-base-100/90 to-slate-800/90 max-h-max py-3 mx-4 my-1 space-y-20 rounded-sm w-[95%]">
          <div
            className={`grid grid-flow-col gap-5 ${
              minutes < 4 ? `text-red-500` : `text-white`
            } auto-cols-max text-start`}
          >
            <div className="flex flex-col">
              <span className="countdown font-mono text-3xl">
                <span style={{ "--value": minutes % 60 }}></span>
              </span>
              min
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-3xl">
                <span style={{ "--value": secs }}></span>
              </span>
              sec
            </div>
          </div>
          <div className="text-center">
            <button
              className="btn bg-green rounded-md text-white"
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingReview;
