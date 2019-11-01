import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function LoginForm(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid,
  } = props;
  return (
    <Form inline onSubmit={handleSubmit}>
      <FormControl
        name="email"
        placeholder="Email"
        value={values.email}
        error={touched.email && errors.email}
        isInvalid={touched.email && !!errors.email}
        onChange={handleChange}
        onBlur={handleBlur}
        type="email"
        className="mr-sm-2"
      />
      <FormControl
        name="password"
        placeholder="Password"
        value={values.password}
        error={touched.password && errors.password}
        isInvalid={touched.password && !!errors.password}
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        className="mr-sm-2"
      />
      <Button
        type="submit"
        disabled={isSubmitting || !isValid}
        variant="outline-success"
      >
        Log in
      </Button>
    </Form>
  );
}

const inputShape = PropTypes.shape({
  email: PropTypes.string,
  password: PropTypes.string,
});

LoginForm.propTypes = {
  values: inputShape.isRequired,
  touched: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
  }).isRequired,
  errors: inputShape.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),
  validationSchema: Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
  }),
  handleSubmit: (values, { props, setSubmitting }) => props.onLogin(values)
    .catch(() => setSubmitting(false)),
})(LoginForm);
