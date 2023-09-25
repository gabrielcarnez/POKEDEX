import { Fragment, React, useContext, useState, useEffect } from "react";
import { CardLink } from "../components/Card";
import PokedexContext from "../store/PokedexContext";
import { changeFavicon } from "../utils/helpers";
import Notification from "../components/Notification";

const Favourites = () => {
  const userContext = useContext(PokedexContext);
  const { favourites } = userContext;
  const { favourites: favouritesList, removeFronFavourites } = favourites;
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    changeFavicon("/img/icon-pokeball.png");
  }, []);

  return (
    <Fragment>
      <div className="w3-row-padding">
        {favouritesList.map((p, index) => {
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
                  <i className="fa fa-heart"></i>
                </span>
              }
            />
          );
        })}
      </div>
      {showNotification && (
        <Notification color="red">
          <p>The pokemon was removed from favourites</p>
        </Notification>
      )}
    </Fragment>
  );
};

Favourites.propTypes = {};

export default Favourites;
