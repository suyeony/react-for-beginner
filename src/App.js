import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Search from "./routes/Search";

//render the router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movie/:id" element={<Detail />}></Route>
        <Route path={process.env.PUBLIC_URL + "/"} element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
