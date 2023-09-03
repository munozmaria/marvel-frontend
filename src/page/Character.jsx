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
          console.log(comic);
          return (
            <Link key={comic._id} to={`/comic/${comic._id}`}>
            <div className="comic-selected">
              {" "}
              <article  className="comics-article">
                <div  className={!comic.thumbnail.path.endsWith('image_not_available') ? "container-img not-available" : "container-img"} >
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt=""
                    />
                </div> 
                
                {comic.title ? <div className="content-text">
                <h2>{comic.title}</h2>
                   <p>{comic.description}</p>

                </div> : "" }
                
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
