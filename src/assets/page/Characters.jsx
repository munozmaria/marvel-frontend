import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Characters = ({search}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--yxbrqvg2lzlq.code.run/characters?name=${search}`
        );
        //console.log(response.data)
        setIsLoading(false);
        setData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [search]);
  return isLoading ? (
    <p>Loading....</p>
  ) : (
    <>
      <main className="container">
        {data.results.map((character) => {
          //console.log(character);
          const url =
            character.thumbnail.path + "." + character.thumbnail.extension;
          return (
            <div key={character._id}>
              <Link to={`/character/${character._id}`} >
                <article>
                  <div className="container-img">
                    <img src={url} alt="" />
                  </div>

                  <h2>{character.name}</h2>
                  <p>{character.description}</p>
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
