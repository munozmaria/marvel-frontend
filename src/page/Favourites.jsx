import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favourite = () => {
  let token = Cookies.get("token", null);
  const [like, setLike] = useState([]);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    const fetchData = async (event) => {
      const response = await axios.get(
        `https://site--marvel-backend--yxbrqvg2lzlq.code.run/likesUsers/${token}`
      );
      //console.log(response)
      setLike(response.data.likesCharacters);
    };
    fetchData();
  }, [token]);


  useEffect(() => {
    fetchData();
  }, [like]);

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

                  <h2>{character.data.name}</h2>
                  <p>{character.data.description}</p>
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
