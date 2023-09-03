import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comic = () => {
  const { comicId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [img, setImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--yxbrqvg2lzlq.code.run/comic/${comicId}`
        );
        //console.log(response.data);
        const url =
          response.data.thumbnail.path +
          "." +
          response.data.thumbnail.extension;
        setImage(url);
        setIsLoading(false);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [comicId]);

  return isLoading ? (
    <div className="container-loading ">
    <div className="loading"></div>
  </div>
  ) : (
    <main>
       <div className="container-cards">
      <div className="id-comic">
        <div className="container-img">
          <img className="characters-img" src={img} alt="" />
        </div>

        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
      </div>
    </main>
  );
};

export default Comic;
