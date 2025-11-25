import { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext.jsx";
import ApodCard from "../ApodCard/ApodCard";
import "./Favorites.css";

function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  if (!favorites.length) return <div>No favorites yet!</div>;

  return (
    <div className="favorites-container">
      {favorites.map(apod => <ApodCard key={apod.date} apod={apod} />)}
    </div>
  );
}

export default Favorites;
