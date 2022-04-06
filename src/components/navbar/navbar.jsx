import { React, Fragment, useState } from "react";
import { useNavigation } from "../../context/navigation-context";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/Theme-context";
import "./navbar.css";

const Navbar = () => {
  const {
    theme: { decideTheme },
    setTheme,
  } = useTheme();
  const { changeSideDisplay, updatedListStyle, listStyle } = useNavigation();
  return (
    <Fragment>
      <header className="header-nav-bar icon-head">
        <button
          className="side-bar-butn"
          onClick={() =>
            changeSideDisplay((state) => ({
              ...state,
              displayByHamburger: !state.displayByHamburger,
            }))
          }
        >
          <i className="fas fa-bars"></i>
        </button>

        <h2 className="brand-title">NoteBox</h2>
        <nav className="Navigation-nav-bar">
          <div className="button r center" id="button-3">
            <input
              type="checkbox"
              checked={decideTheme === "dark" ? true : false}
              onChange={() =>
                setTheme((theme) => ({
                  ...theme,
                  decideTheme: theme.decideTheme === "dark" ? "light" : "dark",
                }))
              }
              className="theme-changer"
            />
            <div className="knobs"></div>
            <div className="layer"></div>
          </div>
          <div className="nav-link-container">
            <i
              class={`fas ${listStyle ? `fa-border-all` : `fa-list-ul`}`}
              onClick={() => updatedListStyle((state) => !state)}
            ></i>
          </div>
          <Link to="/" className="nav-link-container">
            <i className="far fa-user"></i>
          </Link>
        </nav>
      </header>
    </Fragment>
  );
};

export { Navbar };
