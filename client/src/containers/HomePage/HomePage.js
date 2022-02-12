import React, { useEffect, useState } from 'react';
import PlaceService from "../../services/place-service"
import PlaceCard from "../../components/PlaceCard/PlaceCard";
import styles from "./HomePage.module.css"
import authService from "../../services/auth-service";
import { useHistory } from "react-router-dom";
import { MenuItem, TextField } from "@material-ui/core";

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("Всі");

  let currentUser = authService.getCurrentUser();
  const history = useHistory();

  const routeChange = () => {
    history.push("add");
  }
  useEffect(() => {
    (async function fetchData() {
      const categories = await PlaceService.getCategories();
      const names = await categories.data.map(cat => cat.name);
      await setCategories(["Всі", ...names])
    })()
  }, []);
  useEffect(() => {
    (async function fetchData() {
      const places = currentCategory === "Всі"
        ? await PlaceService.getPlaces()
        : await PlaceService.getPlacesByCategory(currentCategory);
      setPlaces(places.data);
    })()
  }, [currentCategory]);

  return (<>
    <div className={styles.button}>
      <TextField
        variant="outlined"
        margin="none"
        size="small"
        select
        onChange={(e) => {
          setCurrentCategory(e.target.value)
        }}
        label="Категорія"
        name="category"
        value={currentCategory}
        className="form-group"
      >
        {categories.map((category, index) => (
          <MenuItem key={index} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <button className="btn btn-dark" disabled={!currentUser} onClick={routeChange}>Додати пост</button>
    </div>
    <div style={{
      display: "flex", flexWrap: "wrap"
    }}>
      {places && places.map(place => (
        <PlaceCard key={place.id} place={place}/>
      ))}
    </div>
  </>)
};

export default HomePage;
