import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Favourite = () => {
  let token = Cookies.get("token", null);
  const [like, setLike] = useState([]);
  const [data, setData] = useState([]);
  const [dataComics, setDataComics] = useState([]);
  const [likeComic, setLikeComic] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (event) => {
      const response = await axios.get(
        `https://site--marvel-backend--yxbrqvg2lzlq.code.run/likesUsers/${token}`
      );
      //console.log(response);
      setLike([...response.data.likesCharacters]);
      setLikeComic([...response.data.likesComics]);
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCharactersWithCookies = like.map((cookie) => {
          // console.log(cookie)
          return axios.get(
            `https://site--marvel-backend--yxbrqvg2lzlq.code.run/character/${cookie}`
          );
        });
        axios.all(allCharactersWithCookies).then((favorites) => {
          //console.log(favorites)
          setData(favorites);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [like]);

  useEffect(() => {
    const fetchDataComics = async () => {
      try {
        const allComicsWithCookies = likeComic.map((cookie) => {
          // console.log(cookie)
          return axios.get(
            `https://site--marvel-backend--yxbrqvg2lzlq.code.run/comic/${cookie}`
          );
        });
        axios.all(allComicsWithCookies).then((favorites) => {
          //console.log(favorites)
          setDataComics(favorites);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataComics();
  }, [likeComic]);

  return (
    <div>
      <div className="container-buttons-pagination">
        <div>
          <button onClick={() => navigate(-1)}> Previous Page</button>
        </div>
      </div>
      <main className="main ">
        <h2 className="title favorites-class">FAVORITES</h2>
        <div className="container-cards">
          {data.map((character) => {
            console.log(character)
            return (
              <div key={character.data._id}>
                <Link to={`/character/${character.data._id}`}>
                  <article>
                    <div className="container-img">
                      <img
                        className="characters-img"
                        src={
                          character.data.thumbnail.path +
                          "." +
                          character.data.thumbnail.extension
                        }
                        alt=""
                      />
                    </div>
                    <div className="content-text">
                      <h2>{character.data.name}</h2>
                      <p>{character.data.description}</p>
                    </div>
                  </article>
                </Link>
              </div>
            );
          })}
          {dataComics.map((comic) => {
            //console.log(comic)
            return (
              <div key={comic.data._id}>
                <Link to={`/comic/${comic.data._id}`}>
                  <article className="comics-article">
                    <div className="container-img">
                      <img
                        className="comics-img"
                        src={
                          comic.data.thumbnail.path +
                          "." +
                          comic.data.thumbnail.extension
                        }
                        alt=""
                      />
                    </div>
                    <div className="content-text">
                      <h2>{comic.data.name}</h2>
                      <p>{comic.data.description}</p>
                    </div>
                  </article>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Favourite;
