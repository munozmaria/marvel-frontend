import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farfaHeart } from "@fortawesome/free-regular-svg-icons";

library.add(faHeart, farfaHeart);

const Characters = ({ search, setSkip, skip, token, setLoginModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [likesCharacters, setLikesCharacters] = useState([]);

  const navigate = useNavigate();

  //console.log(likesCharacters)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--yxbrqvg2lzlq.code.run/characters?name=${search}&skip=${skip}`
        );

        setIsLoading(false);
        setData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [search, skip]);

  useEffect(() => {
    const fetchData = async (event) => {
      const response = await axios.get(
        `https://site--marvel-backend--yxbrqvg2lzlq.code.run/likesUsers/${token}`
      );
      //console.log(response)
      setLikesCharacters(response.data.likesCharacters);
    };
    if(token){
      fetchData();

    }
  }, [token]);

  const handleLike = async (event, characterId) => {
    event.preventDefault();

    const response = await axios.post(
      `https://site--marvel-backend--yxbrqvg2lzlq.code.run/favorites/${
        likesCharacters.includes(characterId) ? "un" : ""
      }like`,
      {
        token,
        likesCharacters: characterId,
      }
    );

    setLikesCharacters(response.data.user.likesCharacters);
  };

  return isLoading ? (
    <p>Loading....</p>
  ) : (
    <>
      <div className="container-buttons-pagination">
        {skip > 0 && (
          <div>
            <button
              onClick={() => {
                setSkip(skip - data.limit);
                navigate("/");
              }}>
              Previous Page
            </button>
          </div>
        )}
        {skip < data.count - data.limit && (
          <div>
            <button
              onClick={() => {
                setSkip(skip + data.limit);
                navigate("/");
              }}>
              Next Page
            </button>
          </div>
        )}
      </div>
      <main>
        {data.results.map((character) => {
          //console.log(character);
          const url =
            character.thumbnail.path + "." + character.thumbnail.extension;
          return (
            <div key={character._id}>
              <Link to={`/character/${character._id}`}>
                <article>
                  <div
                    className="container-likes"
                    onClick={(event) => {
                      handleLike(event, character._id);
                    }}>
                    {/* [{id: 1, like: false}, {id: 2, like:true}] */}
                    {[...likesCharacters].includes(character._id) ? (
                      <FontAwesomeIcon icon={faHeart} />
                    ) : (
                      <FontAwesomeIcon className="fa-beat" icon={farfaHeart} />
                    )}
                  </div>
                  <div className="container-img">
                    <img className="characters-img" src={url} alt="" />
                  </div>
                  <div className="content-text">
                    <h2>{character.name}</h2>
                    <p>{character.description}</p>
                  </div>
                </article>
              </Link>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default Characters;
