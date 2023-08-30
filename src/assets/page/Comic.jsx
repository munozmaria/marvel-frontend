import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comic = () => {
  const { comicId } = useParams();

  const [data, setData] = useState({});
  const [img, setImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--yxbrqvg2lzlq.code.run/comic/${comicId}`
        );
        console.log(response.data);
        const url =
          response.data.thumbnail.path +
          "." +
          response.data.thumbnail.extension;
        setImage(url);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [comicId]);

  return (
    <>
      <div className="comic-selected">
      <img src={img} alt="" />
        <div className="comic-selected-details">
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
      </div>
    </>
  );
};

export default Comic;


