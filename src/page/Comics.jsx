import { useEffect, useState } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farfaHeart } from "@fortawesome/free-regular-svg-icons";

library.add(faHeart, farfaHeart);

const Comics = ({ search, skip, setSkip, token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  const [likeComics, setLikeComics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--yxbrqvg2lzlq.code.run/comics?title=${search}&skip=${skip}`
        );
        //console.log(response.data);
        setIsLoading(false);
        setData(response.data);
      } catch (error) {
        console.log(error);
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
      setLikeComics(response.data.likesComics);
    };
    if(token){
      fetchData();

    }
  }, [token]);

  const handleLike = async (event, comicId) => {
    event.preventDefault();
 
    
      const response = await axios.post(
        `https://site--marvel-backend--yxbrqvg2lzlq.code.run/favorites/${likeComics.includes(comicId) ? "un" : ""}like`,
        {
          token,
          likesComics: comicId,
        }
      );

    
    setLikeComics(response.data.user.likesComics);
  };



  return isLoading ? (
    <span>Loading... </span>
  ) : (
    <>
     <div className="container-buttons-pagination">
   {skip > 0 && (
                <div>
                  <button
                    onClick={() => {
                      setSkip(skip - data.limit);
                      navigate("/comics");
                    }}
                  >
                    Previous Page
                  </button>
                </div>
              )}
      {skip < data.count - data.limit && (
                <div>
                  <button
                    onClick={() => {
                      setSkip(skip + data.limit);
                      navigate("/comics");
                    }}
                  >
                   Next Page
                  </button>
                </div>
              )}
              </div>
      <main >
      <h2 className="title">COMICS</h2>
        <div className="container-cards">
        {data.results.map((comics) => {
          const url = comics.thumbnail.path + "." + comics.thumbnail.extension;
          //console.log(comics._id);
          return (
            <div key={comics._id}>
              <Link to={`/comic/${comics._id}`}>
                <article className="comics-article">
                <div
                 className="container-likes"
                    onClick={(event) => {
                      handleLike(event, comics._id);
                    }}>
                    {/* [{id: 1, like: false}, {id: 2, like:true}] */}
                    {[...likeComics].includes(comics._id) ? (
                      <FontAwesomeIcon  icon={faHeart} />
                    ) : (
                      <FontAwesomeIcon className="fa-beat" icon={farfaHeart} />
                    )}
                  </div>
                  <div className="container-img">
                    <img src={url} alt="" />
                  </div>
                  <div className="content-text">
                  <h2>{comics.title}</h2>
                  <p>{comics.description}</p>
                  </div>
                </article>
              </Link>
            </div>
          );
        })}
        </div>
      </main>
    </>
  );
};

export default Comics;
