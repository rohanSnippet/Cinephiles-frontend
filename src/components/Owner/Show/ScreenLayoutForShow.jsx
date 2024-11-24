import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/AxiosSecure";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoWarningOutline } from "react-icons/io5";

const ScreenLayoutForShow = () => {
  const location = useLocation();
  const { state } = location;
  const screen = state?.screen;
  const { movie } = location.state;
  const { values } = location.state;
  const { showData } = location.state;
  const { end } = location.state;

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [updatedScreen, setUpdatedScreen] = useState(screen);
  const [blocking, setBlocking] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showAvailableButton, setShowAvailableButton] = useState(false);
  const [noAction, setNoAction] = useState(false);
  const [show, setShow] = useState(showData);
  const [movieDetails, setMovieDetails] = useState(movie);
  const [blockedSeats, setBlockedSeats] = useState([]);

  useEffect(() => {
    // Check if any selected seats are "BLOCKED" or "noSeat"
    const anySelectedBlockedOrNoSeat = selectedSeats.some((seatId) => {
      const [tierIndex, seatIndex] = seatId.split("-").map(Number);
      const seat = updatedScreen.tiers[tierIndex].seats[seatIndex];
      return seat.status === "BLOCKED" || seat.status === "NO_SEAT";
    });

    setShowAvailableButton(anySelectedBlockedOrNoSeat);
  }, [selectedSeats, updatedScreen]);

  useEffect(() => {
    setShow((prev) => ({ ...prev, price: values.prices, end: end }));
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let curIdx = 0;
  if (!screen) {
    return <p>Error: Screen data not found.</p>;
  }

  const layout = {
    left: "from-left",
    right: "from-right",
    center: "in-center",
  };

  const handleBlocking = () => {
    setBlocking(!blocking);
    setNoAction(false);

    blocking
      ? Toast.fire({
          icon: "warning",
          title: "Seat Blocking is OFF",
        })
      : Toast.fire({
          icon: "success",
          title: "Seat Blocking is ON",
        });
    setSelectedSeats([]); // Reset selection when mode changes
  };

  const handleAvailable = () => {
    const newScreen = { ...updatedScreen };

    selectedSeats.forEach((seatId) => {
      const [tierIndex, seatIndex] = seatId.split("-").map(Number);
      const seat = newScreen.tiers[tierIndex].seats[seatIndex];

      seat.status = "AVAILABLE";
    });

    setUpdatedScreen(newScreen);
    setSelectedSeats([]);

    let blockedSeats = updatedScreen.tiers.flatMap((tier) =>
      tier.seats
        .filter((seat) => seat.status == "BLOCKED")
        .map((seat) => seat.seatId)
    );

    setShow((prev) => ({ ...prev, blocked: blockedSeats }));
  };

  const handleSeatClick = (tierIndex, seatIndex) => {
    if (blocking == false) {
      setNoAction(true);
    } else {
      setNoAction(false);
      const seatId = `${tierIndex}-${seatIndex}`;
      if (selectedSeats.includes(seatId)) {
        setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
      } else {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };

  const handleSaveLayout = () => {
    const newScreen = { ...updatedScreen };

    selectedSeats.forEach((seatId) => {
      const [tierIndex, seatIndex] = seatId.split("-").map(Number);
      const seat = newScreen.tiers[tierIndex].seats[seatIndex];

      if (blocking) {
        seat.status = "BLOCKED";
      } else if (seatEraser) {
        seat.status = "NO_SEAT";
      }
    });

    setUpdatedScreen(newScreen);
    setSelectedSeats([]); // Reset selection after saving

    let seatNums = [];
    let blockedSeats = updatedScreen.tiers.flatMap((tier) =>
      tier.seats.filter((seat) => seat.status == "BLOCKED")
    );

    blockedSeats.map((seat) => {
      seatNums.push(seat.seatId);
    });

    setShow((prev) => ({ ...prev, blocked: seatNums }));

    Toast.fire({
      icon: "success",
      title: "Changes made",
    });
  };

  const handleSaveScreen = async () => {
    Swal.fire({
      title: `Save Show for ${movieDetails.title}`,
      text: `${screen.sname.toUpperCase()}`,
      imageUrl: `${movieDetails.banner}`,
      imageWidth: 400,
      imageHeight: 200,
      background: "rgba(27, 25, 49, 0.407)",
      color: "white",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Keep Updating",
      confirmButtonText: "Yes, Add Show!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.post(`/show/create`, show); // Assuming saveMovie is an async function
          console.log(res);
          if (res) {
            Swal.fire({
              title: "Done!",
              text: `Show for ${movieDetails.title} has been Added.`,
              html: `
              <div class="text-center text-white><p class="poppins-bold">${screen.sname}</p> ${show.start}</div>`,
              icon: "success",
            });
          }
          navigate("/owner/show-details");
        } catch (error) {
          console.error("Error adding show:", error);
          Swal.fire({
            title: "Error!",
            text: "There was an error adding the show.",
            icon: "error",
          });
        }
      }
    });
  };
  console.log(show);
  return (
    <div className="flex relative gap-2 overflow-y-hidden">
      {/* left-section */}
      <div
        className={`text-white bg-gradient-to-b ${
          blocking
            ? `blocking-gradient`
            : `from-black/90 via-slate-900 to-black/90`
        } w-[130vh] poppins-regular rounded-lg overflow-y-scroll overflow-x-scroll`}
      >
        {noAction && (
          <p className="text-center justify-center mt-2 flex items-center text-red-500 poppins-extralight">
            <IoWarningOutline size={16} /> Choose Action to perform in Edit
            Panel
          </p>
        )}
        {blocking && selectedSeats == 0 && (
          <h2
            className={` text-center poppins-light px-3 py-1 text-sky-200  text-opacity-70`}
          >
            Select Seats & Click On <span className="">APPLY CHANGES </span>
            to Block Seats
          </h2>
        )}
        {updatedScreen.tiers.map((tier, index) => {
          // Reset index for each tier
          return (
            <div key={index} className={`mt-4 ${layout.center} z-90`}>
              {Object.entries(values).map(([tierName, tprice], idx) => (
                <h2 key={idx}>
                  {tier.tiername == tierName && (
                    <span>
                      {tierName} (₹{tprice})
                    </span>
                  )}
                </h2>
              ))}
              <hr className="border-gray-600 border-double" />
              <div id="seatArr" className="mb-8">
                {tier.seats.map((seat, seatIndex) => {
                  const isFirstInRow = seatIndex % tier.columns === 0;
                  const isLastInRow = (seatIndex + 1) % tier.columns === 0;
                  const useatId = `${index}-${seatIndex}`;
                  const isSelected = selectedSeats.includes(useatId);

                  return (
                    <React.Fragment key={useatId}>
                      {isFirstInRow && (
                        <span className="text-sm font-semibold mr-2 z-30">
                          {alphabet[curIdx++]}
                        </span>
                      )}
                      <span
                        onClick={() => handleSeatClick(index, seatIndex)}
                        className={`seat ${
                          seat.status
                        } text-sm cursor-pointer z-30 relative ${
                          isSelected ? "selected-seat" : ""
                        }`}
                      >
                        {seat.seatId.replace(/\D/g, "")}
                      </span>
                      {isLastInRow && <br />}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}

        <h1 className="absolute poppins-bold text-[20vh] top-[20%] left-[12%] opacity-40">
          {screen.sname}
        </h1>
        <h1 className="absolute roboto-regular text-lg bottom-[8%] left-[36%] ">
          Screen here
        </h1>
        <div className="relative ml-16 mt-4">
          <span className="absolute bottom-[-40vh] left-[18vh] w-full">
            <svg
              width="60%"
              height="100%"
              viewBox="0 0 200 100"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M 10 10 C 80 40, 120 40, 190 10"
                stroke="white"
                strokeWidth="1"
                fill="transparent"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* right-section */}
      <div className="text-black rounded-md bg-slate-700 border-left border-solid border-gray-700 h-[97vh] w-[30vh] ">
        <div className="text-center mt-1 mx-1 rounded-md py-2 bg-base-200 text-white roboto-regular">
          <h2>EDIT PANEL</h2>
        </div>
        <div
          className="relative text-center h-[82vh] mt-1 mx-1 rounded-md py-2 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('${movieDetails.poster}')`,
          }}
        >
          {/* Overlay for background opacity */}
          <div
            className="absolute inset-0 rounded-md"
            style={{
              backgroundColor: "#51515191", // Change color and opacity as needed
            }}
          />

          <button
            onClick={handleBlocking}
            id="blockSeat"
            className={`absolute left-[20%] poppins-regular rounded-md px-3 py-1 transition-colors bg-opacity-10 text-sky-100 ${
              blocking
                ? "bg-gradient-to-tr from-teal-400 via-sky-600 to-indigo-300"
                : "bg-gradient-to-r from-gray-600 to-gray-700 text-opacity-55"
            }`}
          >
            BLOCK SEATS
          </button>

          {showAvailableButton && (
            <button
              onClick={handleAvailable}
              id="available"
              className={`absolute left-[16%] top-[7vh] poppins-regular bg-gradient-to-r from-gray-600 to-gray-700 rounded-md px-3 py-1 bg-opacity-10 text-sky-100`}
            >
              MAKE AVAILABLE
            </button>
          )}

          <div className="absolute top-0 mt-24 left-0 w-full text-center">
            <div className="absolute w-[20vh] ml-8 rounded-xl h-[36vh] bg-gradient-to-t from-slate-950 via-transparent to-indigo-700/10 shadow-xl shadow-black"></div>
            <img
              src={movieDetails.poster}
              className="w-[20vh] h-[35vh] ml-8 rounded-xl"
            />
            <h2 className="poppins-bold text-lg text-white mt-4">
              {movieDetails.title.toUpperCase()}
            </h2>
          </div>
          <button
            onClick={handleSaveLayout}
            className={`absolute bottom-[16vh] left-[22%] poppins-regular text-sm bg-gradient-to-r text-white ${
              selectedSeats.length <= 0
                ? `btn-disabled from-gray-600 to-gray-700 cursor-no-drop text-opacity-50`
                : `from-orange-600 to-orange-400`
            } rounded-md px-1 py-1 bg-opacity-10`}
          >
            APPLY CHANGES
          </button>
          <button
            onClick={handleSaveScreen}
            className="absolute bottom-[10vh] left-[28%] poppins-regular bg-gradient-to-r from-green-600 to-green-700 rounded-md px-3 py-1 bg-opacity-10 text-white"
          >
            PROCEED
          </button>
          {/*  <button
            onClick={handleDeleteScreen}
            className="absolute flex bottom-[4vh] left-[20%] items-center gap-1 poppins-regular bg-gradient-to-r from-red-600 via-orange-600 to-red-600 rounded-md px-5 py-1 bg-opacity-10 text-white"
          >
            <RiDeleteBin6Line size={20} /> {screen.sname}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ScreenLayoutForShow;
