import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Characters = ({search, setSkip, skip}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--yxbrqvg2lzlq.code.run/characters?name=${search}&skip=${skip}`
        );
        //console.log(response.data)
        setIsLoading(false);
        setData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [search, skip]);
  return isLoading ? (
    <p>Loading....</p>
  ) : (
    <>
    <button onClick={()=>{
      setSkip(skip - 100)
      navigate("/")
    }}>PREVIOUS PAGE</button>
    <button onClick={()=>{
      setSkip(skip + 100)
      navigate("/")
    }}>NEXT PAGE</button>
      <main>
        {data.results.map((character) => {
          //console.log(character);
          const url =
            character.thumbnail.path + "." + character.thumbnail.extension;
          return (
            <div key={character._id}>
              <Link to={`/character/${character._id}`} >
                <article>
                  <div className="container-img">
                    <img className="characters-img" src={url} alt="" />
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




