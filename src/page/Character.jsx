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
      <div className="selected-character">
      
        <h2>{dataComics.name}</h2>
        <main>
        {dataComics.comics.map((comic) => {
          //console.log(comic);
          return (
            <Link key={comic._id} to={`/comic/${comic._id}`}>
            <div className="comic-selected">
              {" "}
              <article>
                <div className="container-img">
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt=""
                    />
                </div>
                    <h2> {comic.description}</h2>
              </article>{" "}
            </div>
            </Link>
          );
        })}
        </main>
      </div>
    </>
  );
};

export default Character;
