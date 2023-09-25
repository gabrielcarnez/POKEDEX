import React, { useEffect } from "react";
import { changeFavicon } from "../utils/helpers";

const About = () => {
  useEffect(() => {
    changeFavicon("/img/icon-pokeball.png");
  }, []);

  return (
    <div className="w3-container w3-padding-large about-content">
      <p>
        The following application had the sole purpose of doing something in
        React, with the intention of practicing the technology, playing for a
        while, and nothing more.
      </p>
      For this, the following was used:
      <ul>
        <li>
          Pokemon API:{" "}
          <a rel="noreferrer" target="_blank" href="https://pokeapi.co/">
            pokeapi.co/
          </a>
        </li>
        <li>
          {" "}
          W3Schools CSS:{" "}
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.w3schools.com/w3css/default.asp"
          >
            w3schools.com/
          </a>
        </li>
      </ul>
      <p>
        {" "}
        You can find the code{" "}
        <a
          rel="noreferrer"
          target="_blank"
          href="https://github.com/gabrielcarnez/POKEDEX"
        >
          here
        </a>
      </p>
      <p>
        Special tanks to{" "}
        <a
          rel="noreferrer"
          target="_blank"
          href="https://open.spotify.com/playlist/6iiE5LHPytSPZqoOtzFYq9?si=797bd824343a4c9f"
        >
          Programming at nigth
        </a>
      </p>
    </div>
  );
};

About.propTypes = {};

export default About;
