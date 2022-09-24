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
        <Route
          path={process.env.PUBLIC_URL + "/search"}
          element={<Search />}
        ></Route>
        <Route path={process.env.PUBLIC_URL + "/"} element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

// .nav_list:hover {
//   color: rgba(255, 255, 255, 0.5);
// }
