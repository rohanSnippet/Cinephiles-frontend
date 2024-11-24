import React, { useCallback, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import RecomendedMovieCard from "../Home/RecomendedMovieCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAxiosSecure from "../Hooks/AxiosSecure";
import useCity from "../Hooks/useCity";
import regions from "../../assets/regions.json";
import regions2 from "../../assets/regions2.json";
import { Link } from "react-router-dom";

const RecentMovies = () => {
  const [movies, setMovies] = useState([]);
  const [cities, setCities] = useState([]);
  const city = useCity();

  const axiosSecure = useAxiosSecure();

  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = useCallback(async () => {
    try {
      const cityQuery = cities.join(",");

      const res = await axiosSecure.get(`/movie/by-city?cities=${cityQuery}`);
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, [axiosSecure, cities]);

  const fetchCities = useCallback(async () => {
    let foundCities = null;

    regions.forEach((r) => {
      if (r.region === city) {
        foundCities = r.cities;
      }
    });

    if (!foundCities) {
      regions2.forEach((r) => {
        if (r.region === city) {
          foundCities = r.cities; // Store the cities from the region
        }
      });
    }

    if (!foundCities) {
      setCities([city]);
    } else {
      setCities(foundCities);
    }
  }, [city]);

  useEffect(() => {
    fetchCities();
  }, [city]);

  useEffect(() => {
    if (cities.length > 0) {
      fetchMovies(); // Fetch movies only after cities are set
    }
  }, [cities, fetchMovies]);

  // console.log(cities);
  const sortedMovies = movies
    .slice()
    .sort((a, b) => {
      if (a.promoted !== b.promoted) return b.promoted - a.promoted;
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    })
    .filter((movie) => movie.bookingOpen);

  //console.log(cities);
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(sortedMovies.length, 5), // Adjust based on the number of movies
    slidesToScroll: Math.min(sortedMovies.length, 5), // Adjust based on the number of movies
    centerMode: false,
    arrows: false, // Disable default arrows
    responsive: [
      {
        breakpoint: 1480, // 2xl screens
        settings: {
          slidesToShow: Math.min(sortedMovies.length, 4),
          slidesToScroll: Math.min(sortedMovies.length, 4),
        },
      },
      {
        breakpoint: 1180, // xl screens
        settings: {
          slidesToShow: Math.min(sortedMovies.length, 3),
          slidesToScroll: Math.min(sortedMovies.length, 3),
        },
      },
      {
        breakpoint: 520, // Small screens
        settings: {
          slidesToShow: Math.min(sortedMovies.length, 2),
          slidesToScroll: Math.min(sortedMovies.length, 2),
        },
      },
    ],
  };
  const sliderStyle = {
    display: "flex",
    justifyContent: sortedMovies.length < 5 ? "center" : "flex-start", // Align items
    gap: "10px", // Add space between items
  };
  const loaderCount = [1, 2, 3, 4];
  return (
    <div className="relative overflow-hidden -mt-8 md:mt-20 bg-gradient-to-b from-black/70 via-gray-900">
      <div className="h-[30vh] w-[90%] mx-auto mb-12 md:mb-4">
        <h1 className="text-white pt-9 text-3xl md:text-6xl poppins-extrabold">
          GET YOUR TICKETS NOW
        </h1>
        <p className="text-white pt-5 roboto-light text-2xl md:text-lg">
          Don’t miss out on the action! Secure your tickets today and be among
        </p>
        <p className="text-white roboto-light text-2xl md:text-lg">
          the first to experience the excitement. Act fast and grab your spot
        </p>
      </div>
      <div className="relative">
        {!isLoading && sortedMovies.length > 0 ? (
          <Slider
            ref={sliderRef}
            {...settings}
            className="relative"
            style={sliderStyle}
          >
            {sortedMovies.map((item, i) => (
              <div key={i} className="flex justify-center items-center px-8">
                <RecomendedMovieCard item={item} />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="pl-[26vh] flex gap-10">
            {loaderCount.map((l) => (
              <div key={l} className="flex w-64 flex-col gap-4">
                <div className="skeleton h-64 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Next Arrow */}
        <button
          onClick={() => sliderRef.current.slickNext()}
          className="absolute top-2/3 right-4 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Custom Prev Arrow */}
        <button
          onClick={() => sliderRef.current.slickPrev()}
          className="absolute top-2/3 left-4 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <div className="mt-7 py-3">
        <Link
          to={`/All-Movies`}
          className="badge bg-transparent border-double border-white text-white hover:transition-transform hover:scale-105 hover:bg-gradient-to-br hover:from-white/10 hover:via-white/20 hover:to-white/35 hover:bg-opacity-15 poppins-regular text-2xl py-5 px-7"
        >
          Explore More
        </Link>
      </div>
    </div>
  );
};

export default RecentMovies;
