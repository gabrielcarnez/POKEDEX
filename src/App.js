import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import Pokemons from "./pages/Pokemons";
import About from "./pages/About";
import Favourites from "./pages/Favourites";
import Detail from "./pages/Detail";

function App() {
  const menuOptions = [
    { to: "/", text: "Pokemons", icon: "th-large" },
    {
      to: "/my-favourites",
      text: "My favourites",
      icon: "user",
      showBadge: true,
    },
    { to: "/about", text: "About", icon: "envelope" },
  ];

  const contact = [
    {
      link: "https://github.com/gabrielcarnez/POKEDEX",
      icon: "github",
    },
    {
      link: "https://www.linkedin.com/in/gabriel-david-carnez/",
      icon: "linkedin",
    },
    { link: "https://gabrielcarnez.com.ar/", icon: "globe" },
  ];

  const match = useLocation();
  const { pathname } = match;

  const section = menuOptions.find((m) => {
    const pathMatch = pathname.match(/^\/\d+$/) ? "/" : pathname;
    return m.to === pathMatch;
  });

  return (
    <div className="w3-light-grey w3-content" style={{ maxWidth: "900px" }}>
      <NavBar menuOptions={menuOptions} contact={contact} />
      <div className="w3-main" style={{ marginLeft: "300px" }}>
        <Header title={section ? section.text : ""} />
        <Routes>
          <Route path="/:generation?/" element={<Pokemons />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/my-favourites" element={<Favourites />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
