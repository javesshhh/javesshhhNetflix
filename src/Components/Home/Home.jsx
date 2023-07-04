import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import {Link} from "react-router-dom"
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"


const apikey = "83e77bd5bc99f1354c6edb49f958fbb8";
const url = "https://api.themoviedb.org/3";
const imgurl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const popular = "popular";
const toprated = "top_rated";
const nowplaying = "now_playing";
const movie = "movie";
const Card = ({ img }) => <img className="card" src={img} alt="cover"></img>;
// const imgUrl="https://m.media-amazon.com/images/I/71niXI3lxlL._AC_UF894,1000_QL80_.jpg";

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgurl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);
function Home() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowplayingMovies, setNowplayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topratedMovies, setTopratedMovies] = useState([]);
  const [allGenre, setAllGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${movie}/${upcoming}?api_key=${apikey}`);
      setUpcomingMovies(results);
    };
    const fetchNowplaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${movie}/${nowplaying}?api_key=${apikey}`);
      setNowplayingMovies(results);
    };
    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${movie}/${popular}?api_key=${apikey}`);
      setPopularMovies(results);
    };
    const fetchToprated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${movie}/${toprated}?api_key=${apikey}`);
      setTopratedMovies(results);
    };
    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);
      setAllGenre(genres);
    };
    fetchUpcoming();
    fetchNowplaying();
    fetchPopular();
    fetchToprated();
    getAllGenre();
  });

  return (
    <section className="home">
      <div
                className="banner"
                style={{
                    backgroundImage: popularMovies[0]
                        ? `url(${`${imgurl}/${popularMovies[0].poster_path}`})`
                        : "rgb(16, 16, 16)",
                }}
            >
              {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
                {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

                <div>
                    <button><BiPlay /> Play  </button>
                    <button>My List<AiOutlinePlus /> </button>
                </div>
      </div>
      <Row title={"Upcoming"} arr={upcomingMovies} />
      <Row title={"Now playing"} arr={nowplayingMovies} />
      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Top-rated"} arr={topratedMovies} />
      <div className="genreBox">
      {
        allGenre.map((item)=>(
            <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))
      }
      </div>
    </section>
  );
}

export default Home;
