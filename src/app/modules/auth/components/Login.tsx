import clsx from 'clsx';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../redux/AuthCRUD';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de email inválido')
    .min(6, 'Mínimo 6 caracteres')
    .max(100, 'Máximo de 100 caracteres')
    .required('O email é obrigatório'),
  // .test('valid-inatel-email', 'Email do Inatel inválido', async (email) => {
  //   const teacherPattern = RegExp('^[\\w\\.]+(@)inatel\\.br$');
  //   const studentPattern = RegExp('^[\\w\\.]+(@)[a-z]{3}\\.inatel\\.br$');

  //   return (
  //     teacherPattern.test(email ?? '') || studentPattern.test(email ?? '')
  //   );
  // }),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .max(100, 'Máximo de 100 caracteres')
    .required('A senha é obrigatória'),
});

const initialValues = {
  email: '',
  password: '',
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setTimeout(() => {
        login(values.email, values.password)
          .then(({ data }) => {
            setLoading(false);
            sessionStorage.setItem('rankme-auth', JSON.stringify(data));
            window.location.href = '/#/home';
            sessionStorage.setItem('rankme-reload', 'true');
          })
          .catch(() => {
            setLoading(false);
            setSubmitting(false);
            setStatus('Email ou senha inválidos');
          });
      }, 1000);
    },
  });

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_login_signin_form"
    >
      {/* begin::Title */}
      <div className="pb-lg-15">
        <h3 className="fw-bolder text-dark display-6">Bem-vindo</h3>
        <div className="text-muted fw-bold fs-3">
          Novo por aqui?{' '}
          <Link
            to="/auth/registration"
            className="text-primary fw-bolder"
            id="kt_login_signin_form_singup_button"
          >
            Criar conta
          </Link>
        </div>
      </div>
      {/* begin::Title */}

      {formik.status && (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      )}

      {/* begin::Form group */}
      <div className="v-row mb-10 fv-plugins-icon-container">
        <label className="form-label fs-6 fw-bolder text-dark">Email</label>
        <input
          placeholder="Email"
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.email && formik.errors.email },
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type="email"
          name="email"
          autoComplete="off"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.email}</div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="fv-row mb-10 fv-plugins-icon-container">
        <div className="d-flex justify-content-between mt-n5">
          <label className="form-label fs-6 fw-bolder text-dark pt-5">
            Senha
          </label>

          {/* <Link
            to="/auth/forgot-password"
            className="text-primary fs-6 fw-bolder text-hover-primary pt-5"
            id="kt_login_signin_form_password_reset_button"
          >
            Forgot Password ?
          </Link> */}
        </div>
        <input
          type="password"
          autoComplete="off"
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.password}</div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className="pb-lg-0 pb-5">
        <button
          type="submit"
          id="kt_login_signin_form_submit_button"
          className="btn btn-primary fw-bolder fs-6 px-8 py-4 my-3 me-3"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className="indicator-label">Entrar</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: 'block' }}>
              Please wait...{' '}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
