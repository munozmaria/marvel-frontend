import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./page/Home";
import "./App.css";
import { useState } from "react";


//Pages
import Comics from "./page/Comics";
import Comic from "./page/Comic";
import Characters from "./page/Characters";
import Character from "./page/Character";

const App = () => {


  const [search, setSearch] = useState("")
  const [skip, setSkip] = useState(0)

  return (
    <Router>
      <Header setSearch={setSearch} search={search} />
      <Routes>
        <Route path="/" element={<Characters search={search} skip={skip} setSkip={setSkip} />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/comics" element={<Comics search={search} skip={skip} setSkip={setSkip} />} />
        <Route path="/comic/:comicId" element={<Comic />} />
        <Route path="/character/:characterId" element={<Character />} />
      </Routes>
    </Router>
  );
};

export default App;
