import React, { useEffect, useState } from 'react';
import PlaceService from "../../services/place-service";
import styles from "./PlacePage.module.css"
import authService from "../../services/auth-service";

const PlacePage = (props) => {
  const { id } = props.match.params;
  const [place, setPlace] = useState("");
  const [showPhoto, setShowPhoto] = useState(true)
  const handleImageError = () => {
    setShowPhoto(false)
  }
  let currentUser = authService.getCurrentUser();

  useEffect(() => {
    (async function fetchData() {
      const res = await PlaceService.getPlaceById(id);
      await setPlace(res.data);

    })();
  }, []);
  const getBack = () => {
    props.history.push("")
  }
  const routeChange = () => {
    props.history.push(`edit/${place.id}`);
  }
  return (
    <>
      <div className={styles.backButton}>
        <button className="btn btn-secondary" onClick={getBack}>Назад</button>
        <button disabled={!currentUser} className="btn btn-info" onClick={routeChange}>Редагувати</button>
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>{place.name}</h1>
        {showPhoto && <img src={place.image} className={styles.image} onError={handleImageError}/>}
      </div>
      <div className={styles.description}>
        <p><b>Опис: </b>{place.description}</p>
        <p><b>Адреса: </b>{place.location}</p>
        <p><b>Найближча станція метро: </b>{place.nearestSubwayStation}</p>
        <p><b>Категорія: </b>{place?.placeCategory?.name}</p>
      </div>
    </>
  )
};

export default PlacePage;
