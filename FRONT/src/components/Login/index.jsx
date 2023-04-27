import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCredentialsValue } from '../../store/reducers/auth';
import { setIsOpenModalLogin, setIsOpenModalSignup } from '../../store/reducers/modals';
import { Eye, EyeOff, X } from 'react-feather';
import { login } from '../../api/auth';
import './styles.scss';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import EditModel from '../EditModel';

const Login = () => {

  const navigate = useNavigate();

  // logique pour l icon password donc je ne le stocke pas dans mes reducers
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // ----------------------------------- // 


  const dispatch = useDispatch();
  const isOpenModalLogin = useSelector((state) => state.modals.isOpenModalLogin);
  const loginError = useSelector((state) => state.auth.loginError);
  const isOpenModalSignup = useSelector((state) => state.modals.isOpenModalSignup);


  // authentification
  const { email, password } = useSelector((state) => state.auth.credentials);
  // console.log(email, password);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    dispatch(changeCredentialsValue({ name, value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
    // login est la fonction qui va faire la requête située dans api/auth.jsx
    dispatch(login(navigate));
  };

  // close modal
  const handleClose = () => {
    console.log('close');
    dispatch(setIsOpenModalLogin(!isOpenModalLogin))
    // navigate('/');
  }

  // erreur login


  useEffect(() => {
    if (isOpenModalLogin) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpenModalLogin]);


  const handleSignUp = () => {
    console.log('close');
    dispatch(setIsOpenModalSignup(!isOpenModalSignup))
    window.scrollTo(0, 0);

  }


  return (

    <dialog open={isOpenModalLogin} className={isOpenModalLogin ? 'dialog-active' : ''}>

      <div className="dialog-login">
        <form className="login-form" onSubmit={handleSubmit}>

          {/* <div className="header-modal">
            <h1 className='header-login-title'>Login</h1>
            <div className="close-btn" onClick={handleClose}>
              <span> <X /> </span>
            </div>
          </div> */}

          {/* Header */}
          <div className="header-modal">
            <h1 className="header-model-title">Log in</h1>
            <X onClick={handleClose} />
          </div>

          <div className="form">
            <div className="signup__field">
              <label>
                Email:
              </label>
              <input onChange={handleChangeInput}
                value={email}
                type="email"
                name="email"
                className="signup__input"
                placeholder="myEmail@mail.com"
              />
            </div>
            <div className="signup__field">
              <label>
                Password:
              </label>
              <div className="signup__input-password">
                <input onChange={handleChangeInput}
                  value={password}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="signup__input"
                  placeholder="8 characters minimum"
                />
                <span className="login-password-icon-wrapper" onClick={handleClickShowPassword}>
                  {showPassword ? <EyeOff className="signup__input-icon-on" /> : <Eye className="signup__input-icon-on" />}
                </span>
                <label className="input-hint" />
              </div>
            </div>
            {loginError &&
              <div className="error-notif">
                <p className="error-notif__msg">
                  {loginError}
                </p>

              </div>
            }

            {/* <button className="login-btn" type='submit'>
              Log in
            </button> */}

            {/* Buttons */}
            <div className="btns-wrapper">
              <button className="login-btn" type='submit' >
                Log in
              </button>
              New to Biblio 3D ?
              <button onClick={handleSignUp}
                className="login-btn-log">
                Create an account
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};
export default Login;
