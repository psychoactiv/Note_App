import React, { useEffect } from "react";
import { useNavigation } from "../../context/navigation-context";
import { useLabel } from "../../context/label-context";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const { sideBarData, setSideBarData, labelInitial } = useLabel();

  useEffect(() => {
    labelInitial.label.length
      ? setSideBarData((state) => {
          const newState = state.filter((item) => !item.singleLabel);
          const newItems = labelInitial.label
            .filter((item) =>
              state.some(
                (item2) =>
                  item.toLowerCase() !== item2.name.toLowerCase() &&
                  !item2.singleLabel
              )
            )
            .map((item) => ({
              id: v4(),
              path: `/${item}`,
              name: item,
              singleLabel: true,
              icon: `fas fa-tag`,
            }));
          newState.splice(2, 0, ...newItems);
          return newState;
        })
      : null;
  }, [labelInitial.label]);

  const { initialDisplay, changeSideDisplay, optColor, setOptColor } =
    useNavigation();

  return (
    <aside
      className={`side-bar-nav  color-default light-theme ${
        initialDisplay.displayByHover ? "side-width" : null
      }`}
    >
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
              onClick={() => setOptColor(item.name)}
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
