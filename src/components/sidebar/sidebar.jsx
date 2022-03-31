import React from "react";
import { useNavigation } from "../../context/navigation-context";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { v4 } from "uuid";

const Sidebar = () => {
  const sideBarData = [
    {
      id: v4(),
      path: "/",
      name: "Notes",
      icon: `far fa-lightbulb`,
    },
    {
      id: v4(),
      path: "/label",
      name: "Label",
      icon: `fas fa-tag`,
    },
    {
      id: v4(),
      path: "/archive",
      name: "Archive",
      icon: `fas fa-archive`,
    },
    {
      id: v4(),
      path: "/trash",
      name: "Trash",
      icon: `fas fa-trash`,
    },
  ];

  const { initialDisplay, changeSideDisplay, optColor, setOptColor } =
    useNavigation();

  return (
    <aside className="side-bar-nav light-theme">
      {sideBarData.map((item) => (
        <Link onClick={() => setOptColor(item.name)} to={item.path}>
          <div
            className={`side-opt ${
              initialDisplay.displayByHover || initialDisplay.displayByHamburger
                ? "active-side-opt"
                : null
            } ${
              optColor === item.name &&
              (initialDisplay.displayByHover ||
                initialDisplay.displayByHamburger)
                ? "bg-change"
                : null
            }`}
            key={item.id}
            onMouseEnter={() =>
              changeSideDisplay((state) => ({ ...state, displayByHover: true }))
            }
            onMouseLeave={() =>
              changeSideDisplay((state) => ({
                ...state,
                displayByHover: false,
              }))
            }
          >
            <i
              className={`${item.icon} ${
                optColor === item.name ? "bg-change" : null
              }`}
              onClick={() => {
                setOptColor(item.name), console.log(item.name);
              }}
            ></i>
            <div
              className={`side-bar-name ${
                initialDisplay.displayByHover ||
                initialDisplay.displayByHamburger
                  ? "toggle-side-display-visible"
                  : null
              }`}
            >
              {item.name}
            </div>
          </div>
        </Link>
      ))}
    </aside>
  );
};

export { Sidebar };
