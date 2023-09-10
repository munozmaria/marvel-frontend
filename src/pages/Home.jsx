import { useEffect, useState } from "react";
import mini from '../assets/img/mini.png'
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return isLoading ? (
    <div className="container-loading ">
      <div className="loading"></div>
    </div>
  ) : (
    <>
    <div className="container-home"></div>
    <div className="box">
      <div className="content">
      <img src={mini} alt="" />
            <h2>Make a choice</h2>
            <div>
            <Link to='/characters'>Characters</Link>
            <Link to="/comics">Comics</Link>

            </div>
        </div>
    </div>
    </>
  );
};

export default Home;
