import React, { useState, useEffect } from "react";
import videobg1 from "../assets/carousal1.mp4";
import videobg2 from "../assets/carousal2.mp4";
import videobg3 from "../assets/carousal3.mp4";
import videobg4 from "../assets/carousal4.mp4";
import img1 from "../assets/carousal1.png";
import img2 from "../assets/carousal2.png";
import img3 from "../assets/carousal3.png";
import img4 from "../assets/carousal4.png";
import Header from "./Header";

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videos = [
    {
      name: `Kalki 2898 AD`,
      clip: videobg1,
      poster: img1,
      desc: "A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to earth to protect the world from evil forces.",
    },
    {
      name: `Pushpa 2: The Rule`,
      clip: videobg2,
      poster: img2,
      desc: "A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to earth to protect the world from evil forces.",
    },
    {
      name: `Devra Part-I`,
      clip: videobg3,
      poster: img3,
      desc: "A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to earth to protect the world from evil forces.",
    },
    {
      name: `Kantara Chapter 1`,
      clip: videobg4,
      poster: img4,
      desc: "A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to earth to protect the world from evil forces.",
    },
  ];
  // Logic for carousal starts //
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 20000); // Change video every 20 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [videos.length]);

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrevious = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
  };
  // Logic for carousal ends //***************

  // Logic for vedio content start //

  //Logic for video content ends /*************
  return (
    <div className="bg-gradient-to-b from-black via-gray-950 to-black w-full h-[100vh] pt-3">
      <div
        id="cor"
        className="m-auto w-[95%] h-[85%] rounded-xl overflow-hidden relative"
      >
        {/* Header Component */}
        <div id="header" className="absolute top-0 left-0 w-full z-10">
          <Header />
        </div>
        <div
          id="content"
          className="absolute flex text-white justify-center h-[70%]  bottom-[0%] w-full z-10"
        >
          <div id="name" className="pt-16 pl-8 w-[60%]">
            <span className=" text-7xl roboto-semibold ml-12 opacity-70">
              {" "}
              {videos[currentVideoIndex].name}
            </span>
            <div className=" pt-4 ml-12 text-xl text-justify w-[60%] roboto-thin ">
              <p className="mb-12 text-base poppins-regular opacity-70">
                U/A{" "}
                <span className="ml-4 py-2 badge badge-ghost border-none text-white bg-opacity-50">
                  {" "}
                  Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali
                </span>
              </p>
              <p></p> {videos[currentVideoIndex].desc}
            </div>
          </div>
          <div id="poster" className=" justify-start">
            <img
              className="object-cover h-full rounded-3xl opacity-50"
              src={videos[currentVideoIndex].poster}
              alt=""
            />
          </div>
          <button className="absolute border-solid border-gray-500 rounded-2xl py-1 px-5 left-[15%] bottom-[15%] text-white text-lg">
            Book
          </button>
        </div>
        {/* Video Background */}
        <video
          id="top"
          src={videos[currentVideoIndex].clip}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10"></div>

        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="absolute  left-4 top-1/2 transform -translate-y-1/2  text-white px-3 py-2 rounded-full focus:outline-none z-40"
        >
          &#8249;
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2  text-white px-3 py-2 rounded-full focus:outline-none z-30"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Home;
