import { Fragment, React, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Slider from "../components/Slider";
import Loading from "../components/Loading";
import Collapse from "../components/Collapse";
import { List, Li } from "../components/List";
import { Card } from "../components/Card";
import Button from "../components/Button";
import SimpleTable from "../components/SimpleTable";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import PokedexContext from "../store/PokedexContext";
import HorizontalList from "../components/HorizontalList";
import { changeFavicon } from "../utils/helpers";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userContext = useContext(PokedexContext);

  const { pokemonSelected, favourites } = userContext;
  const { pokemonData, isLoading, getPokemonData } = pokemonSelected;
  const {
    favourites: favouritesList,
    addToFavourites,
    removeFronFavourites,
  } = favourites;

  const pokeIndex =
    favouritesList.findIndex((p) => p["id"] === parseInt(id)) !== -1;

  const [isFavourite, setIsFavourite] = useState(pokeIndex);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    getPokemonData(id);
  }, [id]);

  const {
    img = [],
    name,
    order,
    height,
    weight,
    types = [],
    moves = [],
  } = pokemonData || {};

  if (img && img[0]) {
    changeFavicon(img[0]);
  }

  return (
    <Fragment>
      <button onClick={() => navigate(-1)}>Go back</button>

      <div className="w3-cell-row">
        {isLoading && (
          <div className="w3-container">
            <div className="w3-display-container loading-content">
              <div className="w3-display-middle">
                <Loading />
              </div>
            </div>
          </div>
        )}
        {!isLoading && (
          <Fragment>
            <div className="w3-half w3-container w3-cell">
              <Slider images={img.filter((i, index) => index !== 0)}></Slider>
            </div>
            <div className="w3-half w3-container w3-cell">
              <Card headerText={`#${order} - ${name}`}>
                <SimpleTable
                  header={["height", "weight"]}
                  body={[[height, weight]]}
                ></SimpleTable>

                <HorizontalList text="Types: " list={types} />

                <Collapse title={"moves"} contentWithScroll={true}>
                  <List>
                    {moves.map((t, index) => (
                      <Li key={`li-${index}`}>{t}</Li>
                    ))}
                  </List>
                </Collapse>

                <Button
                  onClick={() => {
                    if (isFavourite) {
                      removeFronFavourites(pokemonData);
                    } else {
                      addToFavourites(pokemonData);
                    }
                    setShowNotification(true);
                    setIsFavourite(!isFavourite);
                  }}
                  text={`${isFavourite ? "Remove" : "Add"} to favourites`}
                  color={isFavourite ? "red" : "green"}
                />
              </Card>
            </div>
          </Fragment>
        )}
      </div>
      {showNotification && (
        <Notification
          color={`${isFavourite ? "teal" : "red"}`}
          callback={() => setShowNotification(false)}
        >
          <p>
            {isFavourite
              ? `The pokemon was added to favourites`
              : `The pokemon was removed from favourites`}
          </p>
        </Notification>
      )}
    </Fragment>
  );
};

Detail.propTypes = {};

export default Detail;
