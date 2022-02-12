import React, { useEffect, useState } from 'react';
import PlaceService from "../../services/place-service"
// import { Field, reduxForm } from "redux-form";
import PlaceForm from "../../components/PlaceForm/PlaceForm";

const EditPlace = (props) => {
  const { id } = props.match.params;
  const [history, setHistory] = useState(props.history)
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState({
    name: '',
    description: '',
    location: '',
    nearestSubwayStation: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    (async function fetchData() {
      const res = await PlaceService.getPlaceById(id);
      await setData({ ...res.data, category: res.data.placeCategory.name })
      await setLoaded(true)
    })();
  }, []);
  
  return (
    <div>
      {loaded && <PlaceForm type="edit" history={history} changeHistory={setHistory} prop={data} id={id}/>}
    </div>
  )

};
export default EditPlace;
