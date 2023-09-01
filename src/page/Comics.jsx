import { useEffect, useState } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Comics = ({ search, skip, setSkip }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

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

  return isLoading ? (
    <span>Loading... </span>
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
      <main >
        {data.results.map((comics) => {
          const url = comics.thumbnail.path + "." + comics.thumbnail.extension;
          //console.log(comics._id);
          return (
            <div key={comics._id}>
              <Link to={`/comic/${comics._id}`}>
                <article>
                  <div className="container-img">
                    <img src={url} alt="" />
                  </div>
                  <h2>{comics.title}</h2>
                  <p>{comics.description}</p>
                </article>
              </Link>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default Comics;
