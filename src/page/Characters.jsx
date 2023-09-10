import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farfaHeart } from "@fortawesome/free-regular-svg-icons";

import {
  faMagnifyingGlass,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faBars, faX);

library.add(faHeart, farfaHeart);

const Characters = ({
  search,
  setSkip,
  skip,
  token,
  setLoginModal,
  setSearch,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [likesCharacters, setLikesCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  //console.log(likesCharacters)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--yxbrqvg2lzlq.code.run/characters?name=${search}&limit=6&skip=${
            (currentPage - 1) * 12
          }`
        );

        setIsLoading(false);
        setData(response.data);
        setTotalPages(Math.ceil(response.data.count / 12));
      } catch (error) {
        console.error(error.message);
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
      setLikesCharacters(response.data.likesCharacters);
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleLike = async (event, characterId) => {
    event.preventDefault();

    const response = await axios.post(
      `https://site--marvel-backend--yxbrqvg2lzlq.code.run/favorites/${
        likesCharacters.includes(characterId) ? "un" : ""
      }like`,
      {
        token,
        likesCharacters: characterId,
      }
    );

    setLikesCharacters(response.data.user.likesCharacters);
  };

  return isLoading ? (
    <div className="container-loading ">
      <div className="loading"></div>
    </div>
  ) : (
    <>
      <main>
        <h2 className="title">CHARACTERS</h2>
        <div className="search">
          <input
            type="text"
            placeholder="Recherche"
            value={search}
            className="searchInput"
            onChange={(event) => {
              //console.log(event.target.value)
              setSearch(event.target.value);
            }}
          />
          <button className="searchButton">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className="container-cards">
          {data.results.map((character) => {
            //console.log(character);
            const url =
              character.thumbnail.path + "." + character.thumbnail.extension;
            return (
              <div key={character._id}>
                <Link to={`/character/${character._id}`}>
                  <article>
                    <div
                      className="container-likes"
                      onClick={(event) => {
                        handleLike(event, character._id);
                      }}>
                      {/* [{id: 1, like: false}, {id: 2, like:true}] */}
                      {[...likesCharacters].includes(character._id) ? (
                        <FontAwesomeIcon icon={faHeart} />
                      ) : (
                        <FontAwesomeIcon
                          className="fa-beat"
                          icon={farfaHeart}
                        />
                      )}
                    </div>
                    <div className="container-img">
                      <img className="characters-img" src={url} alt="" />
                    </div>
                    <div className="content-text">
                      <h2>{character.name}</h2>
                      <p>{character.description}</p>
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

export default Characters;
