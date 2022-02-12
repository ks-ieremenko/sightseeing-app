import React, { useEffect, useState } from 'react';
import PlaceService from "../../services/place-service"
import styles from "./PlaceForm.module.css"
import Form from '../../material-ui/Form/Form';
import Input from '../../material-ui/Input/Input';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { placeValidationSchema } from "../../services/validation-schemas";
import { MenuItem } from "@material-ui/core";

const PlaceForm = (props) => {
  const { type, history, changeHistory, id } = props;
  const [content, setContent] = useState([]);
  const [prop, setProp] = useState({
    name: '',
    description: '',
    location: '',
    nearestSubwayStation: '',
    category: '',
    image: ''
  });
  useEffect(() => {
    console.log(props.prop)
    if (props.prop) {
      setProp(props.prop)
    }
  }, [])

  const { register, handleSubmit, errors, invalid } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(placeValidationSchema),
  });
  useEffect(() => {
    (async function fetchData() {
      const res = await PlaceService.getCategories();
      await setContent(res.data);
    })()
  }, []);
  const changeProp = (e) => {
    setProp({ ...prop, [e.target.name]: e.target.value });
  };
  const [result, setResult] = useState({ loading: false, message: '' });

  const changeResult = (loading, message) => {
    setResult({
      ...result,
      loading,
      message,
    });
  };
  const getBack = () => {
    history.push("/");
    changeHistory(history);
  }
  const getTitle = () => {
    if (type === "edit") {
      return "Редагувати пост";
    } else if (type === "create") {
      return "Створити пост";
    }
  }
  const submitForm = async () => {
    try {
      changeResult(true, '');
      if (type === "edit") {
        await PlaceService.editPlace(id, prop.name, prop.description, prop.location, prop.nearestSubwayStation, prop.category, prop.image);
        history.push(`/place/${id}`);
        changeHistory(history);
      } else if (type === "create") {
        await PlaceService.createPlace(prop.name, prop.description, prop.location, prop.nearestSubwayStation, prop.category, prop.image);
        history.push("");
        changeHistory(history);
      }
    } catch (error) {
      console.log(error)
      changeResult(false, error?.response?.data);
    }
  };

  return (
    <div className="col-md-12">
      <div className={styles.backButton}>
        <button className="btn btn-secondary" onClick={getBack}>Назад</button>
      </div>
      <div className={`card card-container mx-auto my-5 ${styles.card}`}>
        <p>{getTitle()}</p>

        <Form onSubmit={handleSubmit(submitForm)}>
          <Input
            ref={register}
            value={prop.name}
            onChange={changeProp}
            type="text"
            name="name"
            className="form-group"
            label="Назва"
            error={!!errors.name}
            helperText={errors?.name?.message}
          />

          <Input
            ref={register}
            value={prop.description}
            onChange={changeProp}
            type="text"
            multiline
            name="description"
            label="Опис"
            className="form-group"
            error={!!errors.description}
            helperText={errors?.description?.message}
          />
          <Input
            ref={register}
            value={prop.location}
            onChange={changeProp}
            type="text"
            name="location"
            label="Адреса"
            className="form-group"
            error={!!errors.location}
            helperText={errors?.location?.message}
          />
          <Input
            ref={register}
            value={prop.nearestSubwayStation}
            onChange={changeProp}
            type="text"
            name="nearestSubwayStation"
            label="Найближча станція метро"
            className="form-group"
            error={!!errors.nearestSubwayStation}
            helperText={errors?.nearestSubwayStation?.message}
          />
          <Input
            ref={register}
            select
            onChange={changeProp}
            label="Категорія"
            name="category"
            value={prop.category}
            className="form-group"
          >
            {content.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Input>
          <Input
            ref={register}
            value={prop.image}
            onChange={changeProp}
            type="text"
            name="image"
            label="Посилання на фото"
            className="form-group"
            error={!!errors.image}
            helperText={errors?.image?.message}
          />
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary btn-block mt-3"
              disabled={result.loading}
              type="submit"
            >
              {result.loading && (
                <span className="spinner-border spinner-border-sm"/>
              )}
              <span>Зберегти</span>
            </button>
          </div>
          {result.message && (
            <div
              className="alert alert-danger mt-4 text-center"
              role="alert"
            >
              {result.message}
            </div>
          )}
        </Form>
      </div>
    </div>
  )

};
export default PlaceForm;
