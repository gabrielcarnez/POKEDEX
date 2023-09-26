import { React, useEffect, useContext, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { CardLink } from "../components/Card";
import Loading from "../components/Loading";
import Filter from "../components/Filter";
import PokedexContext from "../store/PokedexContext";
import { changeFavicon } from "../utils/helpers";
import Notification from "../components/Notification";

const Pokemons = () => {
  const { generation = "" } = useParams();
  const userContext = useContext(PokedexContext);
  const { pokemonsList, favourites } = userContext;
  const { list, isLoading, getPokemons } = pokemonsList;
  const { favourites: favouritesList, removeFronFavourites } = favourites;
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    changeFavicon("./img/icon-pokeball.png");
    getPokemons(generation);
  }, [generation]);

  return (
    <Fragment>
      {!isLoading && (
        <Filter
          filterText="Generations:"
          filters={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          itemSelected={generation || 1}
        />
      )}
      {isLoading && (
        <div className="w3-container">
          <div className="w3-display-container" style={{ height: "300px" }}>
            <div className="w3-display-middle">
              <Loading />
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="w3-row-padding">
          {list.map((p, index) => {
            const { img: imgs = [], name: text, id } = p;
            const link = `/detail/${id}`;
            const img = imgs[0];
            return (
              <CardLink
                key={`poke-${index}`}
                {...{ img, text, link }}
                action={
                  <span
                    className="card-link-action"
                    onClick={() => {
                      removeFronFavourites(p);
                      setShowNotification(true);
                    }}
                  >
                    {
                      <i
                        className={`${
                          favouritesList.find((p) => p.id === id)
                            ? "fa fa-heart"
                            : ""
                        }`}
                      ></i>
                    }
                  </span>
                }
              />
            );
          })}
        </div>
      )}
      {!isLoading && (
        <Filter
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
          filterText="Generations:"
          filters={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          itemSelected={generation || 1}
        />
      )}

      {showNotification && (
        <Notification color="red">
          <p>The pokemon was removed from favourites</p>
        </Notification>
      )}
    </Fragment>
  );
};

Pokemons.propTypes = {};

export default Pokemons;
