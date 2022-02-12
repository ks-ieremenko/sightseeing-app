import React, { useEffect, useState } from 'react';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import placeService from "../../services/place-service";
import Form from "../../material-ui/Form/Form";
import Input from "../../material-ui/Input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { categoryValidationSchema, placeValidationSchema } from "../../services/validation-schemas";
import PlaceService from "../../services/place-service";

const CategoryPage = (props) => {
  const [content, setContent] = useState([]);
  const [modalParams, setModalParams] = useState({ class: '', id: null });
  useEffect(() => {
    (async function fetchData() {
      const categories = await placeService.getCategories();
      setContent(categories.data);
    })();
  }, []);

  const changeModalParams = (className = '', id = null) => {
    setModalParams({ ...modalParams, class: className, id });
  };
  const [result, setResult] = useState({ loading: false, message: '' });

  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(categoryValidationSchema),
  });
  const changeResult = (loading, message) => {
    setResult({
      ...result,
      loading,
      message,
    });
  };
  const submitForm = async () => {
    try {
      changeResult(true, '');
      await PlaceService.addCategory(name);
      const categories = await placeService.getCategories();
      await setContent(categories.data);
    } catch (error) {
      changeResult(false, error?.response?.data);
    }
  };
  const [name, setName] = useState("");
  return (
    <div className="container">
      <ModalWindow {...{ setContent, modalParams, changeModalParams }} />
      <Form onSubmit={handleSubmit(submitForm)}>
        <div style={{ display: "flex" }}>
          <Input
            ref={register}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            className="form-group"
            label="Назва"
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          <button className="btn btn-info" style={{ margin: "15px 0 7px 25px" }}>Додати</button>
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
      {content && (
        <table className="table table-light align-middle caption-top table-bordered mt-1 caption-top">
          <caption>Список категорій</caption>
          <thead className="">
          <tr>
            <th scope="col">
              Id
            </th>
            <th scope="col">Назва</th>
          </tr>
          </thead>
          <tbody>
          {content.map(({ id, name }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoryPage;
