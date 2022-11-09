import React, {useEffect, useState} from "react";
import moon from "../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-sun.svg";
import bgDark from "../assets/images/bg-desktop-dark.jpg";
import bgLight from "../assets/images/bg-desktop-light.jpg";

const Header = () => {
  // state
  const [isDark, setisDark] = useState(
    localStorage.getItem("isDark")
      ? JSON.parse(localStorage.getItem("isDark"))
      : window.matchMedia("(prefers-color-scheme : dark)").matches
  );

  useEffect(() => {
    let currentMode = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", currentMode);
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  return (
    <>
      <img src={isDark ? bgDark : bgLight} className="bg-image" alt="" />
      <div className="header">
        <h1>TODO</h1>
        <img
          src={isDark ? sun : moon}
          className="darkmode-icon"
          onClick={() => setisDark(!isDark)}
          alt=""
        />
      </div>
    </>
  );
};

export default Header;
