import React, { useEffect, useState } from "react";
import axios, { imageBaseURL } from "../API/axios";
import NetflixCollection from "../API/requests";
import "./Banner.css";
function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const NetflixOriginalCollection = NetflixCollection.find(
        (movie) => movie.isOriginal === true
      );
      const { data } = await axios.get(NetflixOriginalCollection.path);
      const result =
        data.results[Math.floor(Math.random() * data.results.length - 1)];
      setMovie(result);
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${imageBaseURL}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
}

export default Banner;
