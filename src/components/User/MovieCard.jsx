import React from "react";
import noPoster from "../../assets/noPoster.png";
import like from "../../assets/like.png";
import { Link } from "react-router-dom";

const MovieCard = ({ item }) => {
  const { likes } = item;
  return (
    <Link
      to={`/movie-details`}
      state={{ item: item, previousPath: "/All-Movies" }}
      className="my-6 w-1/3 "
    >
      {" "}
      <div className="carousel-item rounded-2xl relative group h-[33vh] md:w-[33vh] md:h-[53vh] hover:ring-4 hover:ring-white/10 hover:translate-y-[-2px] hover:scale-[1.001] transition-transform duration-200">
        <img
          src={item.poster || noPoster}
          alt="Burger"
          loading="lazy"
          srcSet=""
          className="object-cover w-full h-full rounded-2xl"
        />
        <div className="absolute bg-black bg-opacity-50 h-8 w-full rounded-b-xl bottom-0"></div>
        <div className=" btn-ghost h-[10vh] rounded-xl inset-0 opacity-100  ">
          {" "}
          <p className="absolute bottom-1 poppins-regular text-md left-[24%]">
            {likes >= 1000000
              ? (likes / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
              : likes >= 1000
              ? (likes / 1000).toFixed(1).replace(/\.0$/, "") + "k"
              : likes}
          </p>
          <img
            src={like}
            className=" bottom-1 left-[6%] absolute h-[31px] w-[31px]"
          />
          <div className="absolute right-5 bottom-1 poppins-regular text-md">
            {item.releaseDate.replaceAll("-", ".")}
          </div>
        </div>
      </div>
      <div className="poppins-light text-xl w-[35vh] mt-2 text-center word-class">
        {item.title.toUpperCase()}
      </div>
    </Link>
  );
};

export default MovieCard;
