import React, { useState } from 'react';
import { Link } from "react-router-dom";
import PlaceService from "../../services/place-service.js";
import authService from "../../services/auth-service";

const PlaceCard = ({ place }) => {
  const [showPhoto, setShowPhoto] = useState(true)
  let currentUser = authService.getCurrentUser();
  const deleteThisPlace = async (id) => {
    await PlaceService.deletePlaceById(id);
    window.location.reload();
  }
  const handleImageError = () => {
    setShowPhoto(false)
  }

  return (
    <div style={{
      display: "flex", flexWrap: "wrap"
    }}>
      <div className="card" style={{
        width: "270px", margin: "15px",
      }}>
        {showPhoto && <img onError={handleImageError} src={place.image} className="card-img-top" alt={place.name}
                           style={{ maxHeight: "150px" }}/>}
        <div className="card-body">
          <h5 className="card-title">{place.name}</h5>
          <p className="card-text">{`${place.description.substr(0, 50)} ...`}</p>
          <Link to={`/place/${place.id}`} className="btn btn-primary">Докладніше</Link>
          <button disabled={!currentUser} className={"btn btn-danger"}
                  onClick={() => deleteThisPlace(place.id)}>Видалити
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
