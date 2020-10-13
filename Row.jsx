import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import axios, { imageBaseURL } from "../API/axios";
import "./Row.css";
function Row({ title, fetchURL, isOriginal }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const options = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(fetchURL);
      setMovies(data.results);
    }
    fetchData();
  }, [fetchURL]);

  const handleClick = (movie) => {
    console.log();
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.original_title || movie.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => {
          console.log("error is ", err);
        });
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => {
              handleClick(movie);
            }}
            className={`row_poster ${isOriginal && "row_posterOriginal"}`}
            src={`${imageBaseURL}${
              isOriginal ? movie.poster_path : movie.backdrop_path
            }`}
            alt={`${imageBaseURL}${movie.name}`}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={options} />}
    </div>
  );
}

export default Row;
