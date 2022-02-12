import React, { useState } from 'react';
import PlaceForm from "../../components/PlaceForm/PlaceForm";

const CreatePlace = (props) => {
  const [history, setHistory] = useState(props.history)
  return (<PlaceForm type="create" history={history} changeHistory={setHistory}/>)
};
export default CreatePlace;
