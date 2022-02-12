import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  username: yup.string().required('Ім\'я користувача є обов\'язковим'),
  password: yup.string().required('Пароль є обов\'язковим'),
});
export const placeValidationSchema = yup.object().shape({
  name: yup.string().required('Назва є обов\'язковою'),
  description: yup.string().required('Опис є обов\'язковим'),
  location: yup.string().required('Адреса є обов\'язковою'),
  // category: yup.string().required({ name: yup.string().required('Category is required') }),
  nearestSubwayStation: yup.string().required('Найближча станція метро є обов\'язковою'),
  image: yup.string().required('Посилання на фото є обов\'язковим'),

});
export const categoryValidationSchema = yup.object().shape({
  name: yup.string().required('Назва є обов\'язковою')

});
export const registrationValidationSchema = yup.object().shape({
  username: yup.string().required('Ім\'я користувача є обов\'язковим'),
  email: yup
    .string()
    .email('Пошта є невалідною')
    .required('Пошта є обов\'язковою'),
  password: yup
    .string()
    .required('Пароль є обов\'язковим')
    .min(6, 'Пароль повинен бути довше за 6 символів'),
});
