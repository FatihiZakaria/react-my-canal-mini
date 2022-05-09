import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

const Header: FunctionComponent = () => (
  <>
    <div className="bg-cover clearfix pt-3">
      <div className="frame">
        <Link to="/react-my-canal-mini">
          <img src={logo} height="90" alt="logo" />
        </Link>
      </div>
      <input
        type="text"
        id="nav-search"
        className="nav-search mx-auto form-control"
        name=""
      />
      <div className="ml-0 mr-0 pb-1 mt-5">
        <nav className="navbar navbar-expand-md">
          <button
            className="navbar-toggler ml-auto"
            data-target="#my-nav"
            data-toggle="collapse"
            aria-controls="my-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="bar1"></span> <span className="bar2"></span>{" "}
            <span className="bar3"></span>
          </button>
          <div id="my-nav" className="collapse navbar-collapse mb-5">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Nos créations
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Cinéma
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Séries
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Sport
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Docs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Jeunesse
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Chaînes
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </>
);

export default Header;
