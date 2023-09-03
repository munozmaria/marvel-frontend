import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favourite = () => {
  let token = Cookies.get("token", null);
  const [like, setLike] = useState([]);
  const [data, setData] = useState([]);
  const [dataComics, setDataComics] = useState([]);
  const [likeComic, setLikeComic] = useState([]);

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

  useEffect(() => {
    const fetchData = async (event) => {
      const response = await axios.get(
        `https://site--marvel-backend--yxbrqvg2lzlq.code.run/likesUsers/${token}`
      );
      console.log(response);
      setLike([...response.data.likesCharacters]);
      setLikeComic([...response.data.likesComics]);
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [like]);

  useEffect(() => {
    fetchDataComics();
  }, [likeComic]);

  return (
    <div>
      <main>
        {data.map((character) => {
          //console.log(character)
          return (
            <div key={character.data._id}>
              <Link to={`/character/${character._id}`}>
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
              <Link to={`/comic/${comic._id}`}>
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
      </main>
    </div>
  );
};

export default Favourite;
