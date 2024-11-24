import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/AxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdMovieEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { PiFilmReelBold } from "react-icons/pi";
import Swal from "sweetalert2";
import { IoTicketOutline } from "react-icons/io5";

const AdminMovieDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  // Fetch movies from the backend
  const fetchMovies = async () => {
    try {
      const res = await axiosSecure.get(`/movie/all-movies`);
      setMovies(res.data); // Store fetched movies in the state
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, [axiosSecure]);

  const handleDeleteMovie = (id) => {
    Swal.fire({
      title: "Delete Movie",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D22B2B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/movie/delete-movie/${id}`);
          console.log(res.data);
          if (res) {
            Swal.fire({
              title: "Done!",
              text: "Movie has been deleted.",
              icon: "success",
            });
          }
          fetchMovies();
        } catch (error) {
          console.error("Error saving movie:", error);
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the movie.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className=" relative">
      <div className="w-full h-16 bg-gradient-to-br from-black via-gray-900 to-black ring-2 ring-gray-900 ring-offset-2 rounded-xl">
        <h1 className="poppins-bold text-xl pl-6 pt-4 text-white flex">
          <PiFilmReelBold size={28} className="mr-3" /> Movie Panel
        </h1>
      </div>
      <div className="flex col-span-2">
        <div className="top-3 relative bg-slate-900 w-9/12 m-4 py-6 rounded-ss-lg rounded-se-lg ">
          <h1 className="text-center text-lg poppins-semibold text-white">
            All Movies
          </h1>
          <div className="bg-base-300 text-center w-[94%] rounded-xl h-14 mx-4 my-4 shadow-sm ring-2 ring-offset-1 ring-gray-500 shadow-gray-700">
            <div role="tablist" className="tabs tabs-lifted">
              <a role="tab" className="tab">
                Normal
              </a>
              <a role="tab" className="tab tab-active">
                Normal
              </a>
              <a role="tab" className="tab">
                Normal
              </a>
            </div>
          </div>
          <div className="w-full">
            <div className="overflow-x-auto">
              <table className="table table-pin-rows text-center">
                {/* head */}
                <thead>
                  <tr className="text-white roboto-semibold text-lg">
                    <th className="text-center">Movie</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Languages</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody className="text-white poppins-semibold">
                  {/* Loop through the movies and display them */}
                  {movies.length > 0 ? (
                    movies.map((movie) => (
                      <tr
                        key={movie.id}
                        className="hover rounded-lg table-row "
                      >
                        <th
                          className={`relative w-20 bg-transparent ${
                            movie.bookingOpen
                              ? `tooltip tooltip-right tooltip-success`
                              : ``
                          }`}
                          data-tip={movie.bookingOpen ? "Booking Open" : ""}
                        >
                          <img
                            src={
                              movie.poster ||
                              `https://m.media-amazon.com/images/I/3120m+SwqYL._AC_UF1000,1000_QL80_.jpg`
                            }
                            className="w-[8vh] h-[10vh] object-cover bg-cover rounded-md"
                          />
                          {movie.bookingOpen && (
                            <IoTicketOutline
                              size={24}
                              className=" z-20 absolute right-2 top-1 bg-green-500/80 text-white rounded-full"
                            />
                          )}
                        </th>
                        <td>
                          <Link to={`/movie-details/${movie.id}`}>
                            {movie.title}
                          </Link>
                        </td>
                        <td>{movie.genre.join(", ")}</td>
                        <td>{movie.languages.join(", ")}</td>
                        <td>
                          <button className="text-center">
                            {" "}
                            <MdMovieEdit
                              size={24}
                              onClick={() =>
                                navigate(`/admin/Edit-Movie`, {
                                  state: { selectedMovie: movie },
                                })
                              }
                              className="rounded-ss-md  rounded-ee-md hover:bg-teal-600/70 hover:text-white text-teal-500"
                            />
                          </button>
                        </td>
                        <td>
                          <button
                            className="text-center"
                            onClick={() => handleDeleteMovie(movie.id)}
                          >
                            <MdOutlineDelete
                              size={24}
                              className="rounded-ss-md  rounded-ee-md hover:bg-red-500/70 hover:text-white text-red-400"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-white">
                        No movies found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div></div>
            </div>
          </div>
        </div>
        <Link to={`/admin/save-movie`} className="top-3  w-3/12 h-52 m-4">
          <div className="card bg-gradient-to-br  border-double border-slate-800  border-2 cursor-pointer from-slate-900 via-gray-900 to-slate-900 w-[35vh] h-[31vh] shadow-md text-slate-100 hover:shadow-md hover:shadow-slate-300/20 mt-3">
            <figure className="px-10 pt-10">
              <IoIosAddCircleOutline className="h-28 w-28" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title roboto-semibold text-2xl">
                Add New Movie
              </h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminMovieDashboard;
