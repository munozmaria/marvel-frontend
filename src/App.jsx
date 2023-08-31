import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";


//Pages
import Comics from "./assets/page/Comics";
import Comic from "./assets/page/Comic";
import Characters from "./assets/page/Characters";
import Character from "./assets/page/Character";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/comics" element={<Comics />} />
        <Route path="/comic/:comicId" element={<Comic />} />
        <Route path="/" element={<Characters />} />
        <Route path="/character/:characterId" element={<Character />} />
      </Routes>
    </Router>
  );
};

export default App;
