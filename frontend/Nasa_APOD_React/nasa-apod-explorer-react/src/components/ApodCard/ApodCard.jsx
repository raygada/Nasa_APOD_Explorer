import { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext.jsx";
import Swal from "sweetalert2";
import "./ApodCard.css";

function ApodCard({ apod }) {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  const isFav = favorites.some(f => f.date === apod.date);

 const handleFav = () => {
    if (isFav) {
      removeFavorite(apod.date);
      Swal.fire({
        title: "Removed!",
        text: `${apod.title} has been removed from favorites.`,
        icon: "info",
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      addFavorite(apod);
      Swal.fire({
        title: "Added to Favorites!",
        text: `${apod.title} is added to your favorite collection.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  return (
   <div className="apod-card shadow">
      <div className="apod-header">
        <h3 className="apod-title">{apod.title}</h3>
        <button className="fav-btn" onClick={handleFav}>
          {isFav ? "★" : "☆"}
        </button>
      </div>

      <div className="apod-img-wrapper">
        <img className="apod-image" src={apod.url} alt={apod.title} />
      </div>

      <p className="apod-date"><strong>Date:</strong> {apod.date}</p>

      <p className="apod-explanation"><strong>Description:</strong>{apod.explanation}</p>

      {apod.copyright && (
        <p className="apod-copyright"><strong>Copyright:</strong>© {apod.copyright}</p>
      )}
    </div>
  );
}

export default ApodCard;



