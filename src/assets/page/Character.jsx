import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Character = () => {
  const { characterId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [dataComics, setDataComics] = useState({});

  useEffect(() => {
    const fetchDataComics = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--yxbrqvg2lzlq.code.run/comics/${characterId}`
        );
        //console.log(response.data);
        setIsLoading(false);
        setDataComics(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchDataComics();
  }, [characterId]);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <>
      <div>
       <h2>Voici tous les Comics de:</h2> 
        <h2>{dataComics.name}</h2>
        {dataComics.comics.map((comic) => {
          //console.log(comic);
          return (
            <Link to={`/comic/${comic._id}`}>
            <div className="comic-selected">
              {" "}
              <article>
                <h2> {comic.description}</h2>
                <div className="comic-selected-details">
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt=""
                  />
                </div>
              </article>{" "}
            </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Character;
