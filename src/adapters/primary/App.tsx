import { FunctionComponent } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import Header from "./Header/Header";
import MoviesDetails from "./MovieDetails/MoviesDetails";
import Movies from "./Movies/Movies";

const App: FunctionComponent = () => (
  <>
    <BrowserRouter>
      <div id="main" className="mt-0 pt-0">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/react-my-canal-mini" />} />
          <Route path="*" element={<Navigate to="/react-my-canal-mini" />} />
          <Route path="/react-my-canal-mini" element={<Movies />} />
          <Route path="/movie/:id" element={<MoviesDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  </>
);

export default App;
