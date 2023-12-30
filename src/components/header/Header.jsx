import ContentWrapper from "../contentwrapper/ContentWrapper";
import "./style.scss";
import logo from "../../assets/movix-logo.svg";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [show, setShow] = useState("top");
  const [query, setQuery] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = function () {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = function () {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const naviagtionHandler = function (type) {
    if (type === "movie") {
      navigate("/explore/movie");
    }
    if (type === "tv") {
      navigate("/explore/tv");
    }
  };

  useEffect(
    function () {
      window.scrollTo(0, 0);
    },
    [location]
  );
  const controlNavbar = function () {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(
    function () {
      window.addEventListener("scroll", controlNavbar);
    },
    [controlNavbar]
  );
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" onClick={() => navigate(`/`)} />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => naviagtionHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => naviagtionHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={() => openSearch()} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={() => openSearch()} />
          {!mobileMenu ? (
            <SlMenu onClick={() => openMobileMenu()} />
          ) : (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                onKeyUp={(e) => searchQueryHandler(e)}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search for movie or tv show..."
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
}

export default Header;
