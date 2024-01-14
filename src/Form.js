import { ErrorMessage, Formik, Form, Field, useField } from "formik";
import * as Yup from 'yup'

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )
}

const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <>
            <label className='checkbox'>
                <input type='checkbox' {...props} {...field} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )
}

const CustomForm = () => {

    const initialValues = {
        name: '',
        email: '',
        amount: 0,
        currency: '',
        text: '',
        terms: false,
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, 'Minimum 2 characters')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        amount: Yup.number()
            .min(5, 'Minimum 5')
            .required('Required'),
        currency: Yup.string().required('Required'),
        text: Yup.string()
            .min(10, 'Minimum 10 characters'),
        terms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'Required')
    });

    const onSubmit = values => console.log(values);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form className="form">
                <h2>Отправить пожертвование</h2>
                {/* <label htmlFor="name">Ваше имя</label>
                <Field
                    id="name"
                    name="name"
                    type="text"
                />
                <ErrorMessage className="error" name="name" component="div" /> */}
                {/* <ErrorMessage className="error" name="name" >{msg => <div>{msg}</div>}</ErrorMessage> */}
                <MyTextInput
                    label="Ваше имя"
                    id="name"
                    name="name"
                    type="text"
                />
                <MyTextInput
                    label="Ваша почта"
                    id="email"
                    name="email"
                    type="email"
                />
                <MyTextInput
                    label="Количество"
                    id="amount"
                    name="amount"
                    type="number"
                />
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select"
                >
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className="error" name="currency" component="div" />
                <label htmlFor="text">Ваше сообщение</label>
                <Field
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className="error" name="text" component="div" />
                {/* <label className="checkbox">
                    <Field name="terms" type="checkbox" />
                    Соглашаетесь с политикой конфиденциальности?
                </label>
                <ErrorMessage className="error" name="terms" component="div" /> */}
                <MyCheckbox name="terms">
                    Соглашаетесь с политикой конфиденциальности?
                </MyCheckbox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;