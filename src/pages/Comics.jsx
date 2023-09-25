import { useEffect, useState } from "react";

import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farfaHeart } from "@fortawesome/free-regular-svg-icons";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import {
  faMagnifyingGlass,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faBars, faX);

library.add(faHeart, farfaHeart);

const Comics = ({ search, token, setSearch }) => {
  const [dataResponse, setDataResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [likeComics, setLikeComics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const titleToSearch = search.replaceAll(" ", "+");
        const response = await axios.get(
          `https://site--marvel-backend--yxbrqvg2lzlq.code.run/comics?title=${titleToSearch}&limit=30&skip=${
            (currentPage - 1) * 12
          }`
        );
        //console.log(response.data);
        setDataResponse(response.data);
        setIsLoading(false);
        setTotalPages(Math.ceil(response.data.count / 12));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [search, currentPage]);

  useEffect(() => {
    const fetchData = async (event) => {
      const response = await axios.get(
        `https://site--marvel-backend--yxbrqvg2lzlq.code.run/likesUsers/${token}`
      );
      //console.log(response)
      setLikeComics(response.data.likesComics);
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleLike = async (event, comicId) => {
    event.preventDefault();

    const response = await axios.post(
      `https://site--marvel-backend--yxbrqvg2lzlq.code.run/favorites/${
        likeComics.includes(comicId) ? "un" : ""
      }like`,
      {
        token,
        likesComics: comicId,
      }
    );

    setLikeComics(response.data.user.likesComics);
  };

  const handleOnSearch = (string) => {
    //console.log(string)
    setSearch(string);
  };

  const handleOnSelect = (item) => {
    console.log(item);
    setSearch(item);
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {item.title}
        </span>
      </>
    );
  };

  return isLoading ? (
    <div className="container-loading ">
      <div className="loading"></div>
    </div>
  ) : (
    <>
      <div className="hero"></div>
        <div className="searchContainer">
          <ReactSearchAutocomplete
            items={dataResponse.results}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
            styling={{
              backgroundColor: "black",
              color: "red",
              border: "1px solid white",
              margin: "20px auto",
             
              
            }}
          />
        </div>
      <main>
        <h2 className="title">COMICS</h2>
        <div className="container-cards">
          {dataResponse.results.map((comics) => {
            const url =
              comics.thumbnail.path + "." + comics.thumbnail.extension;
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
                        <FontAwesomeIcon icon={faHeart} />
                      ) : (
                        <FontAwesomeIcon
                          className="fa-beat"
                          icon={farfaHeart}
                        />
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
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={5}
        onPageChange={(selectedPage) => {
          setCurrentPage(selectedPage.selected + 1);
        }}
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
};

export default Comics;
