import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";


//Pages
import Comics from "./assets/page/Comics";
import Comic from "./assets/page/Comic";
import Characters from "./assets/page/Characters";
import Character from "./assets/page/Character";
import { useState } from "react";

const App = () => {


  const [search, setSearch] = useState("")

  return (
    <Router>
      <Header setSearch={setSearch} search={search} />
      <Routes>
        <Route path="/" element={<Characters search={search} />} />
        <Route path="/comics" element={<Comics search={search} />} />
        <Route path="/comic/:comicId" element={<Comic />} />
        <Route path="/character/:characterId" element={<Character />} />
      </Routes>
    </Router>
  );
};

export default App;
